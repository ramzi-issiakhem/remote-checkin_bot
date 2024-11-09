import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { CheckInCommand } from './CheckInCommand'
import { RemoteRegisterCommand } from './register/RemoteRegisterCommand'



export type CommandType = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction<CacheType>) => Promise<void>
} 

export const commands: Record<string,CommandType> = {
    "check-in": new CheckInCommand(),
    "remote-register": new RemoteRegisterCommand()
}

    
