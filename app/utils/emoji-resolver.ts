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
        nachoPopcat: "gooner_nachoPopcat",
        elisHalt: "gooner_elisHalt",
        weird01: "gooner_weird_01",
        weird02: "gooner_weird_02",
        weird03: "gooner_weird_03",
        weird04: "gooner_weird_04",
        weird05: "gooner_weird_05",
        weird06: "gooner_weird_06",
    }

    public static removeEmojiContext(message: string): string {
        let regex = /<:([a-zA-Z0-9_-]+):([0-9]+)>/g;
        return message.replace(regex, '$1');
    }

    public static resolveEmoji(emojiName: string, nullable?: boolean): GuildEmoji | null {
        let emoji = dcbot.client.emojis.cache.find(emoji => emoji.name === emojiName);
        if (!emoji && nullable) { return null; }
        if (!emoji) { return dcbot.client.emojis.cache.find(emoji => emoji.name === this.CustomEmojis.nachoCry); }
        return emoji;
    }

    public static replaceEmojisInMessage(message: string): string {
        let regex = /:[a-zA-Z0-9_-]+:/g;
        let matches = message.match(regex);
        if (!matches) { return message; }
        matches.forEach(match => {
            const emoji = EmojiResolver.resolveEmoji(match.replace(/:/g, ''), true);
            if (!emoji) { return; }
            message = message.replace(match, emoji.toString());
        });
        return message;
    }

}