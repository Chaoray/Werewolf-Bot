import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('create')
    .setDescription('創建遊戲, 遊戲ID可以讓朋友加入');

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

    const currentGame = gameManager.getGameFromPlayerId(interaction.member.id);

    if (currentGame !== null) {
        await interaction.reply({
            content: `先退出遊戲再創建`,
            ephemeral: true,
        });
        return;
    }

    const game = gameManager.create(interaction.channel, [interaction.member.id,]);

    await interaction.reply({
        content: `遊戲ID: ${game.id}`,
        ephemeral: true,
    });
}

export {
    data,
    execute
};
