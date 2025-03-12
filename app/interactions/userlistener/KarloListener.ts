import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, Logger, RateLimiterType } from "../../utils/index.js";
import { ResponsePattern } from "../../interfaces/index.js";



export class KarloListener {

    public userName: string = 'ork_olrak';
    public rateLimiter: CustomRateLimiter = new CustomRateLimiter(1, 1 * 5 * 1000, RateLimiterType.USER);

    private emojiList_weird = [
        EmojiResolver.CustomEmojis.weird01,
        EmojiResolver.CustomEmojis.weird02,
        EmojiResolver.CustomEmojis.weird03,
        EmojiResolver.CustomEmojis.weird04,
        EmojiResolver.CustomEmojis.weird05,
        EmojiResolver.CustomEmojis.weird06
    ];

    private emojiList_mad = [
        EmojiResolver.CustomEmojis.mad01,
        EmojiResolver.CustomEmojis.mad02,
        EmojiResolver.CustomEmojis.mad03,
        EmojiResolver.CustomEmojis.mad04
    ];

    
    private responsePattern: ResponsePattern[] = [
        {
            "pattern": new RegExp("weird", "i"),
            "reactEmojis": this.emojiList_weird,
            "responses": []
        },
        {
            "pattern": new RegExp("mad", "i"),
            "reactEmojis": this.emojiList_mad,
            "responses": []
        }
    ];


    public async execute(msg: Message, channel: TextChannel) {

        const pattern = this.findBestPattern(EmojiResolver.removeEmojiContext(msg.content));
        if(!pattern) { return; }

        if (this.rateLimiter.take(msg.author.id)) { return; }

        if (pattern.reactEmojis.length == 0) { return; } 
        await msg.react(EmojiResolver.resolveEmoji(pattern.reactEmojis[Math.floor(Math.random() * pattern.reactEmojis.length)]));

        if (pattern.responses.length == 0) { return; }
        const response = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        await msg.reply(EmojiResolver.replaceEmojisInMessage(response));
    }

    private findBestPattern(message: string): ResponsePattern | null {
        let bestMatch: ResponsePattern = null;
        for (const patternObj of this.responsePattern) {
            if (patternObj.pattern.test(message.toLocaleLowerCase())) {
                bestMatch = patternObj;
                break;
            }
        }
        return bestMatch;
    }

}