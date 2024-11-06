import { CacheType, CommandInteraction, Events, SlashCommandBuilder } from "discord.js";


export type EventParams = {
    name: string;
    once: boolean;
}

export abstract class BaseEvent {

    name: string;
    once: boolean;

    constructor({name,once = false} : EventParams) {
        this.name = name;
        this.once = once;
    }
    abstract execute(data: any) : Promise<any>;
}