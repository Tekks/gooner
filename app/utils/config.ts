import { Config } from "../interfaces";
import * as dotenv from 'dotenv';


export class BotConfig {

    public constructor() {
        dotenv.config();
    }

    public init(): Config {
        return {
            BOT: {
                TOKEN: process.env.DC_BOT_TOKEN || "",
                ID: process.env.DC_BOT_ID || ""
            },
            WHITELIST: {
                CATEGORIES: process.env.DC_WHITELISTED_CATEGORIES?.split(',') || []
            }
        }
    }
}