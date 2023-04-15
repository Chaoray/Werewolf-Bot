import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';
import { GameConfig } from '../werewolf/GameConfig.js';

const data = new SlashCommandBuilder()
    .setName('game_config')
    .setDescription('更改遊戲設定')
    .addIntegerOption((option) =>
        option
            .setName('wait_seconds')
            .setDescription(`等待玩家動作的秒數, 預設${GameConfig.Default.waitSeconds}秒`)
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
    const waitSeconds = interaction.options.getInteger('wait_seconds');

    if (game === null) {
        await interaction.reply({
            content: `你目前沒加入任意遊戲`,
            ephemeral: true,
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

    if (game.ready.get(interaction.member.id)) {
        await interaction.reply({
            content: `要先取消準備`,
            ephemeral: true,
        });
        return;
    }

    if (waitSeconds > 0) {
        game.config.waitSeconds = waitSeconds;
    } else {
        await interaction.reply({
            content: `wait_seconds參數設定錯誤`,
            ephemeral: true,
        });
        return;
    }
}
export {
    data,
    execute
};
