import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, RateLimiterType } from "../../utils/index.js";

export class DogeListener {

    public userName: string = 'doge55';
    public rateLimiter = new CustomRateLimiter(1, 120000, RateLimiterType.USER);

    public async execute(msg: Message, channel: TextChannel) {

        const content = msg.content.toLocaleLowerCase();
        const nacho_ziii_reaction = ["nachoZiii", "nacho", "ziii"];

        if (nacho_ziii_reaction.some((word) => content.includes(word))) {
            await msg.react(EmojiResolver.get('gooner_nachoZiii'));
            await msg.reply(`${EmojiResolver.get('gooner_nachoZiii')}`);
            return;
        }

        return;
    }

}