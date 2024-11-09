import { ModalSubmitInteraction } from "discord.js";
import Employee from "../database/models/Employee";
import { BaseModalSubmit } from "./BaseModalSubmit";



export class RegisterModalSubmit extends BaseModalSubmit {

	constructor() {
		super({
			customId: "register-modal",
		})
	}

	async execute(interaction: ModalSubmitInteraction): Promise<void> {

		
			if (!interaction.isModalSubmit()) return;
      
      console.log(interaction);

      await interaction.reply("received");
	
      
  }
}
