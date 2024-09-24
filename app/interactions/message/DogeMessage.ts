import { Message, TextChannel } from "discord.js";
import { DeferType } from "../../interfaces/index.js";
import { EmojiResolver } from "../../utils/index.js";


export class DogeMessage {
    public triggerWords = ['doge'];
    public deferType = DeferType.PUBLIC;

    public async execute(channel: TextChannel, ...args: String[]) {
        return;
        channel.send(`${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoZiii)}`);
    }
}