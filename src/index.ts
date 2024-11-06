// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits }  from 'discord.js';
import { config } from './config'
import { events } from './events';
import { BaseEvent } from './events/BaseEvent';



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsObj = Object.values(events);


eventsObj.forEach((event: BaseEvent) => {
	
	if (event.once) {
		client.once(event.name,(args) => event.execute(args));
	} else {
		client.on(event.name,(args) => event.execute(args));
	}
});


// Log in to Discord with your client's token
client.login(config.DISCORD_TOKEN);
