import { ChatInputCommandInteraction, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { EmojiResolver, Logger } from "../../utils/index.js";
import { DeferType } from "../../interfaces/index.js";


export class TekksAiCommand {
    public name = 'tekks';
    public deferType = DeferType.PUBLIC;
    public data = new SlashCommandBuilder()
        .setName('tekks')
        .setDescription('Tekks AI')
        .addStringOption(option => option.setName('content').setDescription('Nachricht an Tekks AI').setRequired(true));


    public async execute(intr: ChatInputCommandInteraction) {
        const content = intr.options.getString('content');
        Logger.info(`Tekks AI: ${content}`);

        const response = await fetch('http://172.20.10.100:11434/api/generate', {
            method: 'POST',
            body: JSON.stringify({
                model: 'tekks',
                stream: false,
                prompt: content
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const body = await response.json();
        intr.editReply(`${EmojiResolver.replaceEmojisInMessage(body.response)}`);
    }
}