import { log } from 'console';
import { Events } from 'discord.js';
import { commands } from '../commands';
import { submits } from '../submits';
import { BaseEvent } from './BaseEvent';



export class InteractionCreateEvent extends BaseEvent {

  constructor() {
    super({
      name: Events.InteractionCreate,
      once: false
    })
  }

  async execute(interaction: any): Promise<any> {

    if (interaction.isModalSubmit() || interaction.isButton() || interaction.isStringSelectMenu()) {



      const submitModel = submits[interaction.customId];
      try {
        await submitModel.execute(interaction);
      } catch (error) {
        console.log("Error", error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

      }

    };

			if (!interaction.isChatInputCommand()) return;
    const command = commands[interaction.commandName];

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
}
