import { CacheType, CommandInteraction, Events, SlashCommandBuilder } from "discord.js";


export type CommandOption =
  | { type: 'string', name: string, description: string, required?: boolean }
  | { type: 'boolean', name: string, description: string, required?: boolean }
  | { type: 'channel', name: string, description: string, required?: boolean }
  | { type: 'integer', name: string, description: string, required?: boolean };

export type CommandParams = {
  name: string;
  description: string;
  options?: CommandOption[]
}

export abstract class Command {

  data: SlashCommandBuilder;
  constructor({ name, description, options }: CommandParams) {



    this.data = new SlashCommandBuilder()
      .setName(name)
      .setDescription(description);


    if (options) {
      options.forEach(option => {
        switch (option.type) {
          case 'string':
            this.data.addStringOption(o =>
              o.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required ?? false)
            );
            break;
          case 'boolean':
            this.data.addBooleanOption(o =>
              o.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required ?? false)
            );
            break;
          case 'channel':
            this.data.addChannelOption(o =>
              o.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required ?? false)
            );
            break;
          case 'integer':
            this.data.addIntegerOption(o =>
              o.setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required ?? false)
            );
            break;
          default:
            throw new Error(`Unsupported option type: ${option}`);
        }
      });
    }
  }

  abstract execute(interaction: CommandInteraction<CacheType>): Promise<void>;
}
