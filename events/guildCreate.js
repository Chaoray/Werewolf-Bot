import { Events, Guild } from 'discord.js';

const name = Events.GuildCreate;

/**
 * @param {Guild} guild guild
 */
async function execute(guild) {
    guild.commands.set(guild.client.slashCommands.map((command) => command.data));
}

export {
    name,
    execute
};
