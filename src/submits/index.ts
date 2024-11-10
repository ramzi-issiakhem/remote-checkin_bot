import { ModalSubmitInteraction } from "discord.js"
import { CheckInCommand } from "../commands/CheckInCommand"
import { RegisterCompanySelector } from "./RegisterCompanySelector"
import { RegisterModalSubmit } from "./RegisterModalSubmit"

export type SubmitType = {
  customId: string,
  execute: (interaction: ModalSubmitInteraction) => Promise<void>
}
export const submits: Record<string,SubmitType> = {
    "register-modal": new RegisterModalSubmit(),
    "register-company-selector": new RegisterCompanySelector()
}

    
