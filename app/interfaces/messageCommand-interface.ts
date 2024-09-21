import { TextChannel } from "discord.js";
import { DeferType } from ".";

export interface MessageCommand {
    triggerWords: string[];
    deferType: DeferType;
    execute(channel: TextChannel, ...args: String[]);
}
