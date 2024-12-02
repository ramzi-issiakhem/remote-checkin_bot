import { log } from 'console';
import { Colors, Events, Guild, PermissionFlagsBits, PermissionsBitField } from 'discord.js';
import { commands } from '../commands';
import { deployCommands } from '../deploy-commands';
import { submits } from '../submits';
import { roleName } from '../utils/constants';
import { BaseEvent } from './BaseEvent';



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


      const role = await guild.roles.create({
        name: roleName,
        mentionable: false,
        color: Colors.Orange,    // Color of the role
        permissions: [PermissionFlagsBits.ViewChannel], // Permissions for the role
        reason: 'Role created automatically when the bot joined the server, it is the main role that can manage the bot',
      });

      console.log(`Role "${role.name}" created in server "${guild.name}"`);
    } catch (error) {
      console.error(`Failed to create role in server "${guild.name}":`, error);
    }
  }
}
