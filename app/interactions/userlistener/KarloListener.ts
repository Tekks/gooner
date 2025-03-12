import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, Logger, RateLimiterType } from "../../utils/index.js";
import { ResponsePattern } from "../../interfaces/index.js";



export class KarloListener {

    public userName: string = 'ork_olrak';
    public rateLimiter: CustomRateLimiter = new CustomRateLimiter(1, 1 * 10 * 1000, RateLimiterType.USER);

    private emojiList = [
        EmojiResolver.CustomEmojis.weird01,
        EmojiResolver.CustomEmojis.weird02,
        EmojiResolver.CustomEmojis.weird03,
        EmojiResolver.CustomEmojis.weird04,
        EmojiResolver.CustomEmojis.weird05,
        EmojiResolver.CustomEmojis.weird06
    ];
    
    private responsePattern: ResponsePattern[] = [
        {
            "pattern": ["weird", "weirdge", "pepeweird", "weirddude"],
            "reactEmojis": this.emojiList,
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
        const words = message.toLocaleLowerCase().split(/\s+/);
        let bestMatch: ResponsePattern = null;
        let maxMatchCount = 0;
        for (const patternObj of this.responsePattern) {
            let matchCount = 0;

            for (const pattern of patternObj.pattern) { if (words.includes(pattern)) { matchCount++; } }

            if (matchCount > maxMatchCount) {
                maxMatchCount = matchCount;
                bestMatch = patternObj;
            }
        }
        return bestMatch;
    }

}