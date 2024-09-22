import {  Message, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, RateLimiterType } from "../../utils/index.js";

export class TekksListener {

    public userName: string = 'tekks';
    public rateLimiter = new CustomRateLimiter(1, 120000, RateLimiterType.USER);

    public async execute(msg: Message, channel: TextChannel) {
        return;
    }

}