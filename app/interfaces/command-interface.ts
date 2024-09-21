import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder,  } from "discord.js";
import { DeferType } from ".";


export interface Command {
    name: string;
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    deferType: DeferType;
    execute(...args: any);
}