import { Events, Client } from 'discord.js';

const once = true;

const name = Events.ClientReady;

/**
 * 
 * @param {Client} client client
 */
async function execute(client) {
    console.info('[CLIENT] ready');
    client.guilds.fetch().then((guilds) => {
        guilds.forEach((OAuth2Guild) => {
            OAuth2Guild.fetch().then((guild) => {
                guild.commands.set(client.slashCommands.map((command) => command.data));
            });
        });
    });
}

export {
    once,
    name,
    execute
};
