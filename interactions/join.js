import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';

const data = new SlashCommandBuilder()
    .setName('join')
    .setDescription('加入一個已存在的遊戲')
    .addStringOption((option) =>
        option
            .setName('game_id')
            .setDescription('遊戲ID')
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

    const id = interaction.options.getString('game_id');
    const game = gameManager.get(id);
    const currentGame = gameManager.getGameFromPlayerId(interaction.member.id);

    if (!game) {
        await interaction.reply({
            content: `遊戲不存在`,
            ephemeral: true,
        });
        return;
    }

    if (currentGame !== null) {
        if (currentGame.isGamePlaying()) {
            await interaction.reply({
                content: `所在的遊戲正在進行中`,
                ephemeral: true,
            });
            return;
        }

        if (currentGame.id === id) {
            await interaction.reply({
                content: `先退出遊戲再加入其他的, 抓到你想加入同一個`,
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: `先退出遊戲再加入其他的`,
                ephemeral: true,
            });
        }
        return;
    }

    const player = game.players.add(interaction.member.id);

    if (player === null) {
        await interaction.reply({
            content: '你已經在裡面了',
            ephemeral: true,
        });
        return;
    }

    await interaction.reply({
        content: `<@${interaction.member.id}> 加入遊戲 ${id}`,
    });
}

export {
    data,
    execute
};
