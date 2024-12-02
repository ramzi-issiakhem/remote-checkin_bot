import { GuildCreatedEvent } from './GuildCreatedEvent';
import { InteractionCreateEvent } from './InteractionCreateEvent';
import { ReadyEvent } from './ReadyEvent';

export const events = {
  readyEvent: new ReadyEvent(),
  interactionCreateEvent: new InteractionCreateEvent(),
  guildCreated: new GuildCreatedEvent(),
}
