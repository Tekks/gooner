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
            },
            DATABASE: {
                USERNAME: process.env.DB_USERNAME || "",
                PASSWORD: process.env.DB_PASSWORD || "",
                DATABASE: process.env.DB_DATABASE || "",
                HOST: process.env.DB_HOST || ""
            },
            APIS: {
                GELBOORU:{
                    ID: process.env.APIS_GELBOORU_ID || "",
                    TOKEN: process.env.APIS_GELBOORU_TOKEN || ""
                }
            }
        }
    }

}