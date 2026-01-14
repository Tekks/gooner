import { Message, PresenceUpdateStatus, TextChannel } from "discord.js";
import { CustomRateLimiter, EmojiResolver, Logger, RateLimiterType } from "../../utils/index.js";
import { ResponsePattern, UserListener } from "../../interfaces/index.js";


export class DogeListener {

    public userName: string = 'doge55';
    public rateLimiter: CustomRateLimiter = new CustomRateLimiter(1, 5 * 60 * 1000, RateLimiterType.USER);

    private responsePattern: ResponsePattern[] = [
        {
            "pattern": new RegExp("hallo|henlo|huhu", "i"),
            "reactEmojis": [EmojiResolver.CustomEmojis.nachoPopcat],
            "responses": [`Henloooo! :${EmojiResolver.CustomEmojis.nachoPopcat}:`, `Henloooo sweety! :${EmojiResolver.CustomEmojis.nachoZiii}:`]
        },
        {
            "pattern": new RegExp("ziii", "i"),
            "reactEmojis": [EmojiResolver.CustomEmojis.nachoPopcat],
            "responses": [`:${EmojiResolver.CustomEmojis.nachoZiii}: ZIIIIIIIII`, `:${EmojiResolver.CustomEmojis.nachoZiii}: ZIIIIIIIII`]
        },
        {
            "pattern": new RegExp("tekks", "i"),
            "reactEmojis": [EmojiResolver.CustomEmojis.nachoZiii],
            "responses": [`Doge is n cutie :${EmojiResolver.CustomEmojis.nachoPopcat}:`, `DOGEEEEEEEE :${EmojiResolver.CustomEmojis.nachoPopcat}:`]
        }
    ];

    public async execute(msg: Message, channel: TextChannel) {
        let pattern = this.findBestPattern(EmojiResolver.removeEmojiContext(msg.content));
        if (!pattern) { return; }

        if (this.rateLimiter.take(msg.author.id)) { return; }

        if (pattern.reactEmojis.length == 0) { return; }
        await msg.react(EmojiResolver.resolveEmoji(pattern.reactEmojis[Math.floor(Math.random() * pattern.reactEmojis.length)]));

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

    public async prechecks(msg: Message): Promise<boolean> {
        try { await msg.guild.members.fetch(); } catch (e) {}
        let tekks = msg.guild.members.cache.find(member => member.user.username === 'tekks');
        if (!tekks) { return false; }
        try { await tekks.fetch(); } catch (e) {}
        if (tekks.presence?.status === undefined ) { return true; }
        if (tekks.presence?.status === PresenceUpdateStatus.Offline) { return true; }
        return false;
    }

}