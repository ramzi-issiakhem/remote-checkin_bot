import { CacheType, CommandInteraction, Events, SlashCommandBuilder } from "discord.js";


export type CommandParams = {
    name: string;
    description: string;
}

export abstract class Command {

    data: SlashCommandBuilder;
    constructor({name,description} : CommandParams) {

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
    }

    abstract execute(interaction: CommandInteraction<CacheType>) : Promise<void>;
}