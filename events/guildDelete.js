import { Events } from 'discord.js';

const name = Events.GuildCreate;

async function execute(guild) {
    guild.commands.set([]);
}

export {
    name,
    execute
};
