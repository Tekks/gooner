import { dcbot } from "../index.js";


export class EmojiResolver {

    public static get(emojiName: string)  {
        const emoji = dcbot.client.emojis.cache.find(emoji => emoji.name === emojiName);
        if (!emoji) { return dcbot.client.emojis.cache.get("1285347155975864481"); }
        return emoji;
    }

}

