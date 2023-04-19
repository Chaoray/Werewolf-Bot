import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const skillInfo =
    JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../werewolf/information/skill_info.json')));

const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('幫幫你')
    .addSubcommand((subCommand) =>
        subCommand
            .setName('bot')
            .setDescription('關於機器人'))
    .addSubcommand((subcommand) =>
        subcommand
            .setName('skill')
            .setDescription('技能介紹')
            .addStringOption((option) => {
                option
                    .setName('character')
                    .setDescription('角色名稱')
                    .setRequired(true);

                for (const character in skillInfo) {
                    if (!skillInfo.hasOwnProperty(character)) continue;

                    option.addChoices({ name: character, value: character, });
                }

                return option;
            })
    );

/**
 * @param {Interaction} interaction
 */
async function execute(interaction) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
        case 'skill': {
            const character = interaction.options.getString('character');
            await interaction.reply({
                content: `${skillInfo[character]}`,
                ephemeral: true,
            });
            break;
        }

        case 'bot': {
            break;
        }
    }
}

export {
    data,
    execute
};
