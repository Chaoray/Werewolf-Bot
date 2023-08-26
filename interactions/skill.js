import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('skill')
    .setDescription('使用技能，詳情請使用\`/skill_help\`查看說明')
    .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('技能指定的玩家')
    ).addIntegerOption((option) =>
        option
            .setName('choice')
            .setDescription('技能的使用方式')
    );

/**
 * @param {Interaction} interaction
 */
async function execute(interaction) {
    if (!interaction.inGuild()) {
        await interaction.reply({
            content: `此指令只能在伺服器中使用`,
            ephemeral: true,
        });
        return;
    }

    const game = gameManager.getGameFromPlayerId(interaction.member.id);

    let target = interaction.options.getUser('target');
    const choice = interaction.options.getInteger('choice');


    if (game === null) {
        await interaction.reply({
            content: `你目前沒加入任意遊戲`,
            ephemeral: true,
        });
        return;
    }

    if (interaction.channelId !== game.channelId) {
        await interaction.reply({
            content: `請在遊戲創建頻道 ${interaction.channel.toString()} 使用指令`,
            ephemeral: true,
        });
        return;
    }

    if (!game.isGamePlaying()) {
        await interaction.reply({
            content: `所在的遊戲還沒開始`,
            ephemeral: true,
        });
        return;
    }

    const player = game.players.get(interaction.member.id);
    const character = player.character;

    if (character.isDead) {
        await interaction.reply({
            content: `你，已經死了`,
            ephemeral: true,
        });
        return;
    }

    if (target) {
        if (game.players.has(target.id)) {
            target = game.players.get(target.id);
        }
    } else {
        target = null;
    }

    let reply;
    try {
        reply = character.skill.use({
            game: game,
            target: target,
            choice: choice,
        });
    } catch (e) {
        await interaction.reply({
            content: e.message,
            ephemeral: true,
        });
        return;
    }

    if (reply || reply === '') {
        await interaction.reply({
            content: reply,
            ephemeral: true,
        });
    }
}

export {
    data,
    execute
};
