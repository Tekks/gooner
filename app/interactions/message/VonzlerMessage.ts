import { TextChannel } from "discord.js";
import { DeferType } from "../../interfaces/index.js";
import { EmojiResolver } from "../../utils/index.js";
import { CustomRateLimiter, RateLimiterType } from "../../utils/index.js";


export class VonzlerMessage{
    public triggerWords = ['alpaka', 'vonzler'];
    public rateLimiter = new CustomRateLimiter(1, 120000, RateLimiterType.GUILD);
    public deferType = DeferType.PUBLIC;

    private emoteList = [
        "gooner_alpaka_01",
        "gooner_alpaka_02",
        "gooner_alpaka_03",
        "gooner_alpaka_04",
        "gooner_alpaka_05",
        "gooner_alpaka_06",
    ]

    public async execute(channel: TextChannel, ...args: String[]){
        const random = Math.floor(Math.random() * this.emoteList.length);
        channel.send(`${EmojiResolver.resolveEmoji(this.emoteList[random])}`);
    }
}