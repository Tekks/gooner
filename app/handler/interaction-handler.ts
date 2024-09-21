import { AutocompleteInteraction, CommandInteraction, Interaction } from "discord.js";
import { dcbot } from "../index.js";
import { Command, DeferType } from "../interfaces/index.js";
import { EmojiResolver, Logger } from "../utils/index.js";


export class CommandHandler {

    public async process(intr: CommandInteraction | AutocompleteInteraction): Promise<void> {

        if (intr.isMessageComponent()) { return };
        if (!intr.isCommand()) { return };
        let commands: Command[] = dcbot.commands.filter((command: Command) => command.data.name === intr.commandName);
        if (commands.length === 0) { return };
        let command = commands[0];

        if (intr.deferred) { return; }

        try {
            switch (command.deferType) {
                case DeferType.PUBLIC:
                    await intr.deferReply({ ephemeral: false });
                    break;
                case DeferType.HIDDEN:
                    await intr.deferReply({ ephemeral: true });
                    break;
            }
            await command.execute(intr);
        } catch (error) {
            Logger.error(error);
            if (intr.deferred) {
                await intr.editReply({ content: `${EmojiResolver.get('gooner_nachoCry')} Es ist ein Fehler aufgetreten` });
            } else {
                await intr.reply({ content: `${EmojiResolver.get('gooner_nachoCry')} Es ist ein Fehler aufgetreten`, ephemeral: true });
            }
        }
    }

}