import { TextChannel } from "discord.js";

export interface UserListener {
    userName: string;
    execute(channel: TextChannel, ...args: String[]);
}
