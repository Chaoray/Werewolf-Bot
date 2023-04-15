import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import url from 'url';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
    ],
});


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const eventPath = path.join(__dirname, '/events');
const eventFiles = fs.readdirSync(eventPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = await import(`file://${filePath}`);

    if (event.ignore) continue;
    if (event.name && event.execute) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        console.info(`[EVENT] load ${event.name}`);
    } else {
        console.error(`[EVENT] ${filePath} is missing a required property "name" or "execute"`);
    }
}

client.messageCommands = new Collection();
const commandPath = path.join(__dirname, '/commands');
const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = await import(`file://${filePath}`);

    if (command.ignore) continue;
    if (command.name && command.execute) {
        client.messageCommands.set(command.name, command);
        console.info(`[COMMAND] load ${command.name}`);
    } else {
        console.error(`[COMMAND] ${filePath} is missing a required property "name" or "execute"`);
    }
}

client.slashCommands = new Collection();
const interactionPath = path.join(__dirname, '/interactions');
const interactionFiles = fs.readdirSync(interactionPath).filter((file) => file.endsWith('.js'));

for (const file of interactionFiles) {
    const filePath = path.join(interactionPath, file);
    const interaction = await import(`file://${filePath}`);

    if (interaction.ignore) continue;
    if (interaction.data && interaction.execute) {
        client.slashCommands.set(interaction.data.name, interaction);
        console.info(`[INTERACTION] load ${interaction.data.name}`);
    } else {
        console.error(`[INTERACTION] ${filePath} is missing a required property "data" or "execute"`);
    }
}

client.login(process.env.TOKEN);
