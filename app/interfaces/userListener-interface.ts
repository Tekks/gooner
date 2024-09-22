import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter } from "../utils/index.js";

export interface UserListener {
    userName: string;
    rateLimiter?: CustomRateLimiter
    execute(msg: Message, channel: TextChannel);
}
