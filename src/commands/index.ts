import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { CheckInCommand } from './CheckInCommand'
import { CheckOutCommand } from './CheckOutCommand'
import { CreateCompanyCommand } from './CreateCompanyCommand'
import { RemoteRegisterCommand } from './RemoteRegisterCommand'
import { ReportCommand } from './ReportCommand'
import { StatusCommand } from './StatusCommand'
import { TempCheckOutCommand } from './TempCheckOutCommand'



export type CommandType = {
  data: SlashCommandBuilder,
  execute: (interaction: CommandInteraction<CacheType>) => Promise<void>
}

export const commands: Record<string, CommandType> = {
  "check-in": new CheckInCommand(),
  "remote-register": new RemoteRegisterCommand(),
  "check-out": new CheckOutCommand(),
  "temp-check-out": new TempCheckOutCommand(),
  // "report": new ReportCommand(),
  "add-company": new CreateCompanyCommand(),
  "status": new StatusCommand()
}


