import {
    CommandInteraction,
    SlashCommandBuilder
} from 'discord.js';
import { Command } from '@typing/command';
export default {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get your ping'),
    action: async (interaction: CommandInteraction) => {
        await interaction.reply(`Your ping is about ${ Date.now() - interaction.createdTimestamp }ms.`);
    }
} as Command;