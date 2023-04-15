import { SlashCommandBuilder } from 'discord.js';
import { gameManager } from '../handler/GameHandler.js';
import { CharacterDefinitions } from '../werewolf/CharacterDefinitions.js';

const data = new SlashCommandBuilder()
    .setName('set')
    .setDescription('更改目前遊戲角色設定, 數量為0或以下代表沒有');

for (const key in CharacterDefinitions) {
    if (!CharacterDefinitions.hasOwnProperty(key)) continue;

    const name = CharacterDefinitions[key].description;
    data.addIntegerOption(
        (option) =>
            option.setName(name.toLowerCase()).setDescription(`${name}的數量`));
}

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

    let reply = '';
    let setCount = 0;

    for (const key in CharacterDefinitions) {
        if (!CharacterDefinitions.hasOwnProperty(key)) continue;

        const count = interaction.options.getInteger(key.toLowerCase());
        if (count === null) continue;

        if (count <= 0) {
            game.config.set(CharacterDefinitions[key], 0);
            reply += `刪除 ${key}\n`;
        } else {
            game.config.set(CharacterDefinitions[key], count);
            reply += `${key} 設定為 ${count}\n`;
        }
        setCount++;
    }

    if (setCount == 0) {
        await interaction.reply({
            content: `說真的你到底在幹嘛`,
            ephemeral: true,
        });
    } else {
        await interaction.reply({
            content: reply,
        });
    }
}

export {
    data,
    execute
};
