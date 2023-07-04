import {
    Interaction,
    SlashCommandBuilder
} from 'discord.js';
export type Command = {
    command: SlashCommandBuilder,
    action: (interaction?: Interaction) => void | Promise<void>
};