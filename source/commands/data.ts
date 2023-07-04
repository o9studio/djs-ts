import * as fs from 'node:fs';
import { Command } from '@typing/command';
export const commands = async (): Promise<{ [key: string]: Command['action'] }> => {
    let result: { [key: string]: Command['action'] } = {};
    const folders = fs.readdirSync('./source/commands').filter((folder) => folder !== 'data.ts');
    for(const folder of folders) {
        const files = fs.readdirSync(`./source/commands/${ folder }`);
        for(const file of files) {
            const command = await (await import(`./${ folder }/${ file }`)).default as Command;
            result[command.command.name] = command.action;
        };
    };
    return result;
};