import { TextChannel } from "discord.js";
import { DeferType } from "../../interfaces/index.js";
import { EmojiResolver } from "../../utils/index.js";


export class VonzlerMessage{
    public triggerWords = ['alpaka', 'vonzler', 'kamel'];
    public deferType = DeferType.PUBLIC;
    
    public async execute(channel: TextChannel, ...args: String[]){
        channel.send(`${EmojiResolver.get('gooner_alpaka')}`);
    }
}