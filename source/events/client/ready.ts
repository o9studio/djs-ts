import {
    Client,
    Events
} from 'discord.js';
import { Event } from '@typing/event';
export default {
    event: Events.ClientReady,
    once: true,
    action: (bot: Client) => {
        console.log(`\x1b[32mSUCCESS\x1b[0m Bot ${ bot.user.tag } is ready`);
    }
} as Event;