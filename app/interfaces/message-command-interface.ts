import { TextChannel } from "discord.js";
import { DeferType } from "./index.js";
import { CustomRateLimiter } from "../utils/index.js";

export interface MessageCommand {
    triggerWords: string[];
    rateLimiter?: CustomRateLimiter;
    deferType: DeferType;
    execute(channel: TextChannel, ...args: String[]);
}
