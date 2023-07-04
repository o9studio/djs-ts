import {
    Events,
    Interaction
} from 'discord.js';
import { Event } from '@typing/event';
import * as data from '@commands/data';
export default {
    event: Events.InteractionCreate,
    once: false,
    action: async (interaction: Interaction) => {
        if(!interaction.isChatInputCommand())
            return;
        const commands = await data.commands()
        if(!(interaction.commandName in commands))
		    return console.log(`\x1b[33mWARNING\x1b[0m No command matching '${ interaction.commandName }' was found`);
	    try {
		    await commands[interaction.commandName](interaction);
	    } catch(error) {
		    console.error(error);
		    if(interaction.replied || interaction.deferred) {
			    await interaction.followUp({
                    content: 'There was an error while executing this command',
                    ephemeral: true
                });
		    } else {
			    await interaction.reply({
                    content: 'There was an error while executing this command',
                    ephemeral: true
                });
		    };
	    };
    }
} as Event;