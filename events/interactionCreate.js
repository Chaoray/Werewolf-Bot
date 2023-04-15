import { Events } from 'discord.js';

const name = Events.InteractionCreate;

/**
 * @param {Interaction} interaction interaction
 */
async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.client.slashCommands.has(interaction.commandName)) {
        try {
            interaction.client.slashCommands.get(interaction.commandName).execute(interaction);
        } catch (err) {
            console.error(err);
        }
    }
}

export {
    name,
    execute
};
