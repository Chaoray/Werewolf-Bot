import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('ready')
    .setDescription('準備開始遊戲')
    .addBooleanOption(
        (option) =>
            option
                .setName('is_ready')
                .setDescription('是否準備開始遊戲')
                .setRequired(true));

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
    const isReady = interaction.options.getBoolean('is_ready');

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

    game.ready.setState(interaction.member.id, isReady);

    await interaction.reply({
        content: `準備開始遊戲(${game.ready.count}/${game.players.length})`,
    });
}

export {
    data,
    execute
};
