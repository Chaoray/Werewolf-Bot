import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('start')
    .setDescription('開始遊戲, 需要所有人都準備');

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

    if (game.isGamePlaying()) {
        await interaction.reply({
            content: `所在的遊戲正在進行中`,
            ephemeral: true,
        });
        return;
    }

    if (game.players.length !== game.ready.count) {
        await interaction.reply({
            content: `需要所有玩家都準備`,
            ephemeral: true,
        });
        return;
    }

    try {
        game.distributeCharacters();
        game.start();

        game.players.forEach((player) => {
            interaction.client.users.fetch(player.id).then((user) => {
                user.send(`你是 ${player.character.type.description}`);
            }).catch((error) => {
                console.error(error);
            });
        });
    } catch (e) {
        await interaction.reply({
            content: e.message,
            ephemeral: true,
        });
        return;
    }

    await interaction.reply({
        content: `遊戲開始`,
    });
}

export {
    data,
    execute
};
