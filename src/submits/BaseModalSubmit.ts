import { ModalSubmitInteraction } from "discord.js";


export type ModalSubmitParams = {
    customId: string;
}

export abstract class BaseModalSubmit {

    customId: string;
    constructor({customId} : ModalSubmitParams) {

        this.customId = customId;
    }

    abstract execute(interaction: ModalSubmitInteraction) : Promise<void>;
}
