import { GuildEmoji } from "discord.js";
import { dcbot } from "../index.js";



export class EmojiResolver {

    public static CustomEmojis = {
        alpaka01: "gooner_alpaka_01",
        alpaka02: "gooner_alpaka_02",
        alpaka03: "gooner_alpaka_03",
        alpaka04: "gooner_alpaka_04",
        alpaka05: "gooner_alpaka_05",
        alpaka06: "gooner_alpaka_06",
        nachoCry: "gooner_nachoCry",
        nachoZiii: "gooner_nachoZiii",
        nachoPopcat: "gooner_nachoPopcat"
    }

    public static get(emojiName: string): GuildEmoji {
        let emoji = dcbot.client.emojis.cache.find(emoji => emoji.name === emojiName);
        if (!emoji) { return dcbot.client.emojis.cache.get("1285347155975864481"); }
        return emoji;
    }

    public static replaceEmojisInMessage(message: string): string {
        let regex = /:[a-zA-Z0-9_-]+:/g;
        let matches = message.match(regex);
        if (!matches) { return message; }
        matches.forEach(match => {
            const emoji = EmojiResolver.get(match);
            if (!emoji) { return; }
            message = message.replace(match, emoji.toString());
        });
        return message;
    }

}