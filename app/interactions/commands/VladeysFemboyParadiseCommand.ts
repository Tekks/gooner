import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { EmojiResolver } from "../../utils/index.js";
import { DeferType } from "../../interfaces/index.js";

import { Femboy } from "../../models/index.js";


export class VladeysFemboyParadiseCommand {
    public name = 'femboy';
    public deferType = DeferType.PUBLIC;

    public data = new SlashCommandBuilder()
        .setName('femboy')
        .setDescription('Macht Vladey Dinge...')


        .addSubcommand(subcommand =>
            subcommand.setName('add')
                .setDescription('Markiert ein Mitlgied als Femboy')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Femboy')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('Beschreibung warum der User ein süsi ist')
                        .setRequired(false)
                )
        )

        .addSubcommand(subcommand =>
            subcommand.setName('remove')
                .setDescription('Entfernt die Femboy Markierung von einem Mitglied')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Femboy')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand.setName('edit')
                .setDescription('Bearbeitet die Femboy Beschreibung')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Femboy')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('Beschreibung warum der User ein süsi ist')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand.setName('list')
                .setDescription('Listet alle Femboys auf')
        );


    public async execute(intr: ChatInputCommandInteraction) {

        const subcommand = intr.options.getSubcommand();
        const user = intr.options.getUser('user');

        if (subcommand === 'add') {

            let response = await Femboy.findOrCreate({
                where: { userId: user.id },
                defaults: {
                    userId: user.id,
                    userName: user.username,
                    description: intr.options.getString('description') || 'Kein Grund'
                }
            });
            if (!response[1]) {
                await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoPopcat)} ${user.toString()} ist bereits ein Femboy!` });
                return;
            }
            await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoZiii)} ${user.toString()} ist nun ein Femboy!` });
        }


        if (subcommand === 'remove') {

            let response = await Femboy.destroy({
                where: { userId: user.id }
            });

            if (response === 0) {
                await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoCry)} ${user.toString()} war nie ein Femboy!` });
                return;
            }
            await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoCry)} ${user.toString()} ist kein Femboy mehr!` });
        }


        if (subcommand === 'edit') {
            let response = await Femboy.update({
                description: intr.options.getString('description')
            }, {
                where: { userId: user.id }
            });

            if (response[0] === 0) {
                await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoCry)} ${user.toString()} ist kein Femboy!` });
                return;
            }
            await intr.editReply({ content: `${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoZiii)} ${user.toString()} wurde bearbeitet!` });
        }


        if (subcommand === 'list') {
            const femboys = await Femboy.findAll();
            const FemboyEmbed = new EmbedBuilder()
                .setColor('#fcc0ba')
                .setTitle(`${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoZiii)} Die Cuties des Servers ${EmojiResolver.resolveEmoji(EmojiResolver.CustomEmojis.nachoZiii)}`)
                .setFooter({
                    text: `Insgesamt ${femboys.length} Femboy${ (femboys.length == 1) ? '' : "s"}`,
                })
                .setThumbnail('https://i.imgur.com/uryLRGf.jpeg')
                .setAuthor({ name: 'Doge55 der Cutie', iconURL: 'https://i.imgur.com/OD1F9oG.png' })

            femboys.forEach(femboy => {
                FemboyEmbed.addFields({ name: `${femboy.dataValues.userName}`, value: `${femboy.dataValues.description}`,inline: true });
            });

            await intr.editReply({ embeds: [FemboyEmbed] });
        }

    }
}