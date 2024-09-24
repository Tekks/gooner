import { Message, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, Logger, RateLimiterType } from "../../utils/index.js";


interface TekksResponsePattern {
    pattern: string[];
    response: string;
    react: string | null;
}

export class TekksListener {

    public userName: string = 'tekks';
    // public rateLimiter = new CustomRateLimiter(1, 120000, RateLimiterType.USER);


    private dogeResponsePattern: TekksResponsePattern[] = [
        {
            "pattern": ["hallo", "henlo", "huhu"],
            "react": EmojiResolver.CustomEmojis.nachoPopcat,
            "response": `Henloooo! :${EmojiResolver.CustomEmojis.nachoPopcat}:`
        },
        {
            "pattern": ["nachoZiii", "ziii", "nacho"],
            "react": `${EmojiResolver.CustomEmojis.nachoPopcat}`,
            "response": `:${EmojiResolver.CustomEmojis.nachoZiii}:`
        }
    ]
    public async execute(msg: Message, channel: TextChannel) {

        let pattern = this.findBestPattern(msg.content);
        if (!pattern) { return; }
        if (pattern.react) { await msg.react(pattern.react); }

        await msg.reply(pattern.response);
    }

    private findBestPattern(message: string): TekksResponsePattern | null {
        const words = message.toLocaleLowerCase().split(/\s+/);
        let bestMatch: TekksResponsePattern = null;

        let maxMatchCount = 0;
        for (const patternObj of this.dogeResponsePattern) {
            let matchCount = 0;

            for (const word of patternObj.pattern) {
                if (words.includes(word)) { maxMatchCount++; }
            }

            if (matchCount > maxMatchCount) {
                maxMatchCount = matchCount;
                bestMatch = patternObj;
            }
            return bestMatch;
        }
    }

}