import { ChannelType, Message } from "discord.js";
import { dcbot } from "../index.js";
import { Logger } from "../utils/log.js";
import { MessageCommand } from "../interfaces/index.js";
import { RateLimiterType } from "../utils/index.js";


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
        const words = msg.content.split(' ').map((arg) => arg.toLowerCase());
        const messageCommand: MessageCommand = dcbot.messageCommands.find((command) => {
            return command.triggerWords.some((name) => words.includes(name));
        });
        
        if (!messageCommand) { return; }

        // Run some checks
        if (messageCommand.rateLimiter) {
            if (messageCommand.rateLimiter.type === RateLimiterType.USER) {
                if (messageCommand.rateLimiter.take(msg.author.id)) { return; }
            } else if (messageCommand.rateLimiter.type === RateLimiterType.GUILD) {
                if (messageCommand.rateLimiter.take(msg.guild.id)) { return; }
            } else if (messageCommand.rateLimiter.type === RateLimiterType.CHANNEL) {
                if (messageCommand.rateLimiter.take(msg.channel.id)) { return; }
            }
        }
        
        try {
            await messageCommand.execute(msg.channel, ...words);
        } catch (error) {
            Logger.error(error);
        }
        return;
    }
}