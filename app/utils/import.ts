import { dcbot } from "../index.js";
import { Command } from "../interfaces/index.js";
import { REST, Routes } from "discord.js";
import { Logger } from "./index.js";


export class CommandExport {
    
    static async import() {

        const commands = dcbot.commands;

        const rest = new REST({ version: '10' }).setToken(dcbot.config.BOT.TOKEN);
        await rest.put(Routes.applicationCommands(dcbot.config.BOT.ID), {
            body: Array.from(commands).map((command: Command) => command.data.toJSON())
        });
        Logger.info(`Registered [ ${dcbot.commands.length} ] commands`);

    }

}