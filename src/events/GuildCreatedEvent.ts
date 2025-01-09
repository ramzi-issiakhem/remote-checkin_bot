import { Colors, Events, Guild, PermissionFlagsBits, PermissionsBitField } from 'discord.js';
import { deployCommands } from '../deploy-commands';
import { BaseEvent } from './BaseEvent';
import { config } from '../config'



export class GuildCreatedEvent extends BaseEvent {

  constructor() {
    super({
      name: Events.GuildCreate,
      once: false
    })
  }

  async execute(guild: Guild): Promise<any> {


    try {
      await deployCommands({ guildId: guild.id })

      const existingRole = guild.roles.cache.find(
        (role) => role.name === config.CREATED_ROLE_NAME
      );

      if (existingRole) {
        console.log(`Role "${existingRole.name}" already exists in server "${guild.name}"`);
        return;  
      }

      const role = await guild.roles.create({
        name: config.CREATED_ROLE_NAME,
        mentionable: false,
        color: Colors.Orange,
        permissions: [PermissionFlagsBits.ViewChannel], // Permissions for the role
        reason: 'Role created automatically when the bot joined the server, it is the main role that can manage the bot',
      });

      console.log(`Role "${role.name}" created in server "${guild.name}"`);
    } catch (error) {
      console.error(`Failed to create role in server "${guild.name}":`, error);
    }
  }
}
