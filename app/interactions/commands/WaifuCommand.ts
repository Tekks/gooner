import { AttachmentBuilder, ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DeferType } from '../../interfaces/index.js';


export class WaifuCommand {
	public name = 'waifu';
	public deferType = DeferType.PUBLIC;
	public data = new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Postet eine cute waifu :3')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('Art der Waifu :>')
				.setRequired(true)
				.setChoices(
					{ name: 'Awoo', value: 'awoo' },
					{ name: 'Neko', value: 'neko' },
					{ name: 'Shinobu', value: 'shinobu' },
					{ name: 'Megumin', value: 'megumin' },
					{ name: 'Bully', value: 'bully' },
					{ name: 'Cuddle', value: 'cuddle' },
					{ name: 'Cry', value: 'cry' },
					{ name: 'Hug', value: 'hug' },
					{ name: 'Kiss', value: 'kiss' },
					{ name: 'Lick', value: 'lick' },
					{ name: 'Pat', value: 'pat' },
					{ name: 'Smug', value: 'smug' },
					{ name: 'Yeet', value: 'yeet' },
					{ name: 'Blush', value: 'blush' },
					{ name: 'Smile', value: 'smile' },
					{ name: 'Wave', value: 'wave' },
					{ name: 'Handhold', value: 'handhold' },
					{ name: 'Nom', value: 'nom' },
					{ name: 'Bite', value: 'bite' },
					{ name: 'Glomp', value: 'glomp' },
					{ name: 'Slap', value: 'slap' },
					{ name: 'Happy', value: 'happy' },
					{ name: 'Wink', value: 'wink' },
					{ name: 'Poke', value: 'poke' },
					{ name: 'Dance', value: 'dance' },
				)
		);


	public async execute(intr: ChatInputCommandInteraction) {
		const response = await fetch(`https://api.waifu.pics/sfw/${intr.options.getString('type')}`);
		const body = await response.json();
		return intr.editReply({ files: [new AttachmentBuilder(body.url)] });
	}
}