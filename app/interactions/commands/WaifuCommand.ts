import { AttachmentBuilder, ChannelType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { DeferType } from '../../interfaces/index.js';
import { EmojiResolver, Logger } from '../../utils/index.js';


export class WaifuCommand {

	private choices = [
		{ name: 'Awoo', value: 'awoo', types: ['sfw'] },
		{ name: 'Neko', value: 'neko', types: ['sfw', 'nsfw'] },
		{ name: 'Shinobu', value: 'shinobu', types: ['sfw'] },
		{ name: 'Bully', value: 'bully', types: ['sfw'] },
		{ name: 'Cuddle', value: 'cuddle', types: ['sfw'] },
		{ name: 'Cry', value: 'cry', types: ['sfw'] },
		{ name: 'Hug', value: 'hug', types: ['sfw'] },
		{ name: 'Kiss', value: 'kiss', types: ['sfw'] },
		{ name: 'Lick', value: 'lick', types: ['sfw'] },
		{ name: 'Pat', value: 'pat', types: ['sfw'] },
		{ name: 'Smug', value: 'smug', types: ['sfw'] },
		{ name: 'Yeet', value: 'yeet', types: ['sfw'] },
		{ name: 'Blush', value: 'blush', types: ['sfw'] },
		{ name: 'Smile', value: 'smile', types: ['sfw'] },
		{ name: 'Wave', value: 'wave', types: ['sfw'] },
		{ name: 'Handhold', value: 'handhold', types: ['sfw'] },
		{ name: 'Nom', value: 'nom', types: ['sfw'] },
		{ name: 'Bite', value: 'bite', types: ['sfw'] },
		{ name: 'Glomp', value: 'glomp', types: ['sfw'] },
		{ name: 'Slap', value: 'slap', types: ['sfw'] },
		{ name: 'Happy', value: 'happy', types: ['sfw'] },
		{ name: 'Wink', value: 'wink', types: ['sfw'] },
		{ name: 'Poke', value: 'poke', types: ['sfw'] },
		{ name: 'Dance', value: 'dance', types: ['sfw'] },
		{ name: 'Waifu', value: 'waifu', types: ['nsfw'] },
		{ name: 'Trap', value: 'trap', types: ['nsfw'] },
		{ name: 'Blowjob', value: 'blowjob', types: ['nsfw'] }
	];

	public name = 'waifu';
	public deferType = DeferType.PUBLIC;
	public data = new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Postet eine cute waifu :3')

		.addSubcommand(subcommand =>
			subcommand.setName('sfw')
				.setDescription('SFW Waifu')
				.addStringOption(option =>
					option.setName('type')
						.setDescription('Art der Waifu :>')
						.setRequired(true)
						.addChoices(
							this.choices.filter((choice) => choice.types.includes('sfw')).map((choice) => { return { name: choice.name, value: choice.value } })
						)
				)
		)

		.addSubcommand(subcommand => 
			subcommand.setName('nsfw')
				.setDescription('NSFW Waifu')
				.addStringOption(option =>
					option.setName('type')
					.setDescription('Art der Waifu :>')
					.setRequired(true)
					.setChoices(
						this.choices.filter((choice) => choice.types.includes('nsfw')).map((choice) => { return {name: choice.name, value: choice.value} })
					)
				)
			);


	public async execute(intr: ChatInputCommandInteraction) {
		const category = intr.options.getSubcommand();
		if (category === 'nsfw' && (intr.channel.type === ChannelType.GuildText || intr.channel.type === ChannelType.GuildVoice) && intr.channel.nsfw === false) {
			return intr.editReply(`${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.elisHalt)} In NSFW Channels Only!`);
		}

		const response = await fetch(`https://api.waifu.pics/${category}/${intr.options.getString('type')}`);
		const body = await response.json();
		return intr.editReply({ files: [new AttachmentBuilder(body.url)] });
	}
}