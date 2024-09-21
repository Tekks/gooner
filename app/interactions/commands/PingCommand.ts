import { ChatInputCommandInteraction, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { EmojiResolver } from "../../utils/index.js";
import { DeferType } from "../../interfaces/index.js";


export class PingCommand {
    public name = 'ping';
    public deferType = DeferType.NONE;
    public data = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Antwortet mit Pong :3');
        
    public async execute(intr: ChatInputCommandInteraction) {
        await intr.reply(`${EmojiResolver.get('gooner_nachoZiii')} Pong :3`);
    }
}