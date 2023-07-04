import { ClientEvents } from 'discord.js';
export type Event = {
    event: keyof ClientEvents,
    once: boolean,
    action: () => void | Promise<void>
};