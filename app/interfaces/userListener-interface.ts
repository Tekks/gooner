import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter } from "../utils/index.js";

export interface UserListener {
    userName: string;
    rateLimiter?: CustomRateLimiter;
    prechecks?(msg: Message): Promise<boolean>;
    execute(msg: Message, channel: TextChannel);
}

export interface ResponsePattern {
    pattern: RegExp;
    responses: string[];
    reactEmojis: string[];
}
