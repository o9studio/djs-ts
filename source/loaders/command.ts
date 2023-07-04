import * as fs from 'node:fs';
import 'dotenv/config';
import {
    Client,
    REST,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    Routes
} from 'discord.js';
import { Command } from '@typing/command';
import { Loader } from '@typing/loader';
export const command = async (bot: Client): Loader => {
    let commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    const folders = fs.readdirSync('./source/commands').filter((folder) => folder !== 'data.ts');
    for(const folder of folders) {
        const files = fs.readdirSync(`./source/commands/${ folder }`);
        for(const file of files) {
            const command = await (await import(`../commands/${ folder }/${ file }`)).default as Command;
            if('command' in command && 'action' in command) {
                commands.push(command.command.toJSON());
                console.log(`\x1b[32mSUCCESS\x1b[0m Loaded the command '${ command.command.name }' successfully`);
	        } else {
		        console.log(`\x1b[32mERROR\x1b[0m The command at '@events/${ folder + '/' + file }' is missing a required 'command' or 'action' property`);
	        };
        };
    };
    const rest = new REST({ version: '10' }).setToken(process.env['BOT_TOKEN']);
	try {
		console.log(`\x1b[33mWARNING\x1b[0m Started refreshing ${ commands.length } application commands`);
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env['BOT_ID'], process.env['GUILD_ID']),
			{ body: commands },
		) as [];
		console.log(`\x1b[32mSUCCESS\x1b[0m Reloaded ${ data.length } application commands successfully`);
	} catch(error) {
		console.error(error);
	};
};