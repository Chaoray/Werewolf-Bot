import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('vote')
    .setDescription('票人')
    .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('技能指定的玩家')
            .setRequired(true)
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

    const target = interaction.options.getUser('target');

    if (game === null) {
        await interaction.reply({
            content: `你目前沒加入任意遊戲`,
            ephemeral: true,
        });
        return;
    }

    if (interaction.channelId !== game.channelId) {
        interaction.client.channels.fetch(game.channelId).then(async (channel) => {
            await interaction.reply({
                content: `請在遊戲創建頻道 ${channel.toString()} 使用指令`,
                ephemeral: true,
            });
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

    target = game.players.get(target.id);

    if (!target) {
        await interaction.reply({
            content: `對象不在遊戲中`,
            ephemeral: true,
        });
        return;
    }

    game.votes.setState(player, target);

    await interaction.reply({
        content: `投票人數: ${game.votes.count}/${game.players.length}`,
    });

    // TODO: 投票完成踢人+進入下一階段/判斷輸贏
}


export {
    data,
    execute
};
