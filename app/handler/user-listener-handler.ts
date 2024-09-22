import { ChannelType, Message } from "discord.js";
import { dcbot } from "../index.js";
import { Logger } from "../utils/log.js";


export class UserListenerHandler {

    public async process(msg: Message) {

        if (msg.author.bot) { return; }
        if (!msg.guild) { return; }
        if (msg.channel.type !== ChannelType.GuildText) { return; }

        // Ignore messages from channels that are not in the whitelist
        const parentChannel = msg.guild.channels.cache.get(msg.channel.id)?.parent;
        if (!dcbot.config.WHITELIST.CATEGORIES.includes(parentChannel?.id || '')) { return; }

        let userListener = dcbot.userListeners.find((listener) => {
            return listener.userName === msg.author.username;
        });

        if (!userListener) { return; }

        // Run some checks
        if (userListener.rateLimiter) {
            if (userListener.rateLimiter.take(msg.author.id)) { return; }
        }

        try {
            await userListener.execute(msg, msg.channel);
        } catch (error) {
            Logger.error(error);
        }
        return;
    }
}