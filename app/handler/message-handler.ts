import { ChannelType, Message } from "discord.js";
import { dcbot } from "../index.js";
import { Logger } from "../utils/log.js";


export class MessageHandler {

    public async process(msg: Message) {
        if (msg.author.bot) { return; }
        if (!msg.guild) { return; }
        if (msg.channel.type !== ChannelType.GuildText) { return; }
        if (msg.content.startsWith('/')) { return; }


        // Ignore messages from channels that are not in the whitelist
        const parentChannel = msg.guild.channels.cache.get(msg.channel.id)?.parent;
        if (!dcbot.config.WHITELIST.CATEGORIES.includes(parentChannel?.id || '')) { return; }

        // Find the best fitting message command
        const args = msg.content.split(' ').map((arg) => arg.toLowerCase());
        const messageCommand = dcbot.messageCommands.find((command) => {
            return command.triggerWords.some((name) => args.includes(name));
        });
        if (!messageCommand) { return; }

        try {
            await messageCommand.execute(msg.channel, ...args);
        } catch (error) {
            Logger.error(error);
        }
        return;
    }
}