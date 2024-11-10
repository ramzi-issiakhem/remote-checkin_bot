import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config'
import initDB from './database/initDb';
import Company from './database/models/Company';
import { events } from './events';
import { BaseEvent } from './events/BaseEvent';

//TODO MODIFY THE GLOBAL VARIABLE LOGIC
//TODO REFACTOR AND COMMENT:
initDB();

// Create a new client instance
  

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsObj = Object.values(events);


eventsObj.forEach((event: BaseEvent) => {

	if (event.once) {
		client.once(event.name, (args) => event.execute(args));
	} else {
		client.on(event.name, (args) => event.execute(args));
	}
});



// Log in to Discord with your client's token
client.login(config.DISCORD_TOKEN);
