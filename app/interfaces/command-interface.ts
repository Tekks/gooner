import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder,  } from "discord.js";
import { DeferType } from ".";


export interface Command {
    name: string;
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
    deferType: DeferType;
    execute(...args: any);
}