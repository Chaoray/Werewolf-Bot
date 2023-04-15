import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('離開目前的遊戲');

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

    const success = game.players.remove(interaction.member.id);
    if (success) {
        await interaction.reply({
            content: `${interaction.member.toString()} 離開遊戲 ${game.id}`,
        });
    } else {
        await interaction.reply({
            content: `你不存在在遊戲中...? 等等...發生甚麼事...? \nGame: ${game.id}`,
            ephemeral: true,
        });
        // 基本上不可能發生以防萬一我還是寫了
    }
}
export {
    data,
    execute
};
