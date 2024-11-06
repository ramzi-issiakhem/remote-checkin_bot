import { commands } from './commands';
import { REST, Routes } from 'discord.js';
import { config } from './config';

//Retrieve the Data related to the commands in the "commands folder"
const commandsData = Object.values(commands).map(command => command.data.toJSON());
const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
	guildId: string|undefined;
};

export async function deployCommands({guildId}: DeployCommandsProps) {
		try {
		    console.log("Started refreshing application (/) commands.");	
			
			//Update discord servers with available commands and its data.
			const routes = guildId != null ?
				  Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId) : 
				  	Routes.applicationCommands(config.DISCORD_CLIENT_ID);
			await rest.put(
				routes,
				{
				  body: commandsData,
				}
			);
		  
			console.log("Successfully reloaded application (/) commands.");

		} catch (error) {
			console.error(error);
		}
}
