import { Events } from "discord.js";
import { BaseEvent } from "./BaseEvent";
import { deployCommands } from "../deploy-commands";
import { config } from "../config";
import { Employees } from "../database/models/Employees";
import { Activities } from "../database/models/Activities";
import { Companies } from "../database/models/Companies";



export class ReadyEvent extends BaseEvent {
    

    constructor() {
        super({
            name: Events.ClientReady,
            once: true
        })
    }

    async execute(data: any): Promise<any> {
		  console.log(`Ready! Logged in as ${data.user.tag}`);
		  await deployCommands({guildId: config.GUILD_ID})
          Employees.sync();
          Activities.sync();
          Companies.sync(); 
    }


}