import { Message, PresenceUpdateStatus, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, Logger, RateLimiterType } from "../../utils/index.js";
import { ResponsePattern, UserListener } from "../../interfaces/index.js";


export class DogeListener {

    public userName: string = 'doge55';
    public rateLimiter: CustomRateLimiter = new CustomRateLimiter(1, 5 * 60 * 1000, RateLimiterType.USER);

    private responsePattern: ResponsePattern[] = [
        {
            "pattern": ["hallo", "henlo", "huhu"],
            "reactEmoji": EmojiResolver.CustomEmojis.nachoPopcat,
            "responses": [`Henloooo! :${EmojiResolver.CustomEmojis.nachoPopcat}:`]
        },
        {
            "pattern": ["nachoZiii", "ziii", "nacho", "nachoziiistatic"],
            "reactEmoji": `${EmojiResolver.CustomEmojis.nachoPopcat}`,
            "responses": [`:${EmojiResolver.CustomEmojis.nachoPopcat}:`]
        },
        {
            "pattern": ["tekks", "tekksi"],
            "reactEmoji": `${EmojiResolver.CustomEmojis.nachoZiii}`,
            "responses": [`Doge is n cutie :${EmojiResolver.CustomEmojis.nachoPopcat}:`]
        }
    ];

    public async execute(msg: Message, channel: TextChannel) {
        let pattern = this.findBestPattern(EmojiResolver.removeEmojiContext(msg.content));
        if (!pattern) { return; }

        if (this.rateLimiter.take(msg.author.id)) { return; }

        if (pattern.reactEmoji) { await msg.react(EmojiResolver.resolveEmoji(pattern.reactEmoji)); }
        let response = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];

        await msg.reply(EmojiResolver.replaceEmojisInMessage(response));
    }


    private findBestPattern(message: string): ResponsePattern | null {
        const words = message.toLocaleLowerCase().split(/\s+/);
        let bestMatch: ResponsePattern = null;
        let maxMatchCount = 0;
        for (const patternObj of this.responsePattern) {
            let matchCount = 0;

            for (const pattern of patternObj.pattern) {
                if (words.includes(pattern)) { matchCount++; }
            }

            if (matchCount > maxMatchCount) {
                maxMatchCount = matchCount;
                bestMatch = patternObj;
            }
        }
        return bestMatch;
    }

    public async prechecks(msg: Message): Promise<boolean> {
        // Tekks check
        await msg.guild.members.fetch();
        let tekks = msg.guild.members.cache.find(member => member.user.username === 'tekks');
        if (!tekks) { return false; }
        if (tekks.partial) { await tekks.fetch(); }
        if (tekks.presence?.status !== undefined && tekks.presence?.status !== PresenceUpdateStatus.Offline) { return false; }
        return true;
    }

}