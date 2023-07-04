import * as fs from 'node:fs';
import { Client } from 'discord.js';
import { Event } from '@typing/event';
import { Loader } from '@typing/loader';
export const event = async (bot: Client): Loader => {
    const folders = fs.readdirSync('./source/events');
    for(const folder of folders) {
        const files = fs.readdirSync(`./source/events/${ folder }`);
        for(const file of files) {
            const event = await (await import(`../events/${ folder }/${ file }`)).default as Event;
            if(event.once) {
                bot.once(event.event, event.action);
            } else {
                bot.on(event.event, event.action);
            };
        };
    };
};