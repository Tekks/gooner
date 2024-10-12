import { Client, GatewayIntentBits } from "discord.js";
import { dcbot as dcBot } from "./dcbot.js";


export const dcbot = new dcBot(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences
        ]
    })
);

dcbot.init();