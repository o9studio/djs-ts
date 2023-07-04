import 'dotenv/config';
import {
    Client,
    GatewayIntentBits
} from 'discord.js';
import * as loader from '@loaders/loaders';
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});
loader.event(bot);
loader.command(bot);
bot.login(process.env['BOT_TOKEN']);