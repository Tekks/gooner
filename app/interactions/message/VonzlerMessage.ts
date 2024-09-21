import { TextChannel } from "discord.js";
import { DeferType } from "../../interfaces/index.js";
import { EmojiResolver } from "../../utils/index.js";


export class VonzlerMessage{
    public triggerWords = ['alpaka', 'vonzler', 'kamel'];
    public deferType = DeferType.PUBLIC;

    private emoteList = [
        "gooner_alpaka_01",
        "gooner_alpaka_02",
        "gooner_alpaka_03",
        "gooner_alpaka_04",
        "gooner_alpaka_05",
        "gooner_alpaka_06",
    ]

    public async execute(channel: TextChannel, ...args: String[]){
        const random = Math.floor(Math.random() * this.emoteList.length);
        channel.send(`${EmojiResolver.get(this.emoteList[random])}`);
    }
}