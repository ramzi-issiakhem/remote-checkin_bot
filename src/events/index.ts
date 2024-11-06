import { InteractionCreateEvent } from './InteractionCreateEvent';
import { ReadyEvent } from './ReadyEvent';

export const events = {
    readyEvent: new ReadyEvent(),
    interactionCreateEvent: new InteractionCreateEvent()
}