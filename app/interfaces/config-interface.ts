
export interface Config {
    BOT:{
        TOKEN: string,
        ID: string
    },
    WHITELIST: {
        CATEGORIES: string[]
    },
    DATABASE: {
        USERNAME: string,
        PASSWORD: string,
        DATABASE: string,
        HOST: string,
    },
    APIS: {
        GELBOORU: {
            ID: string,
            TOKEN: string
        },
        WAIFUIM: {
            TOKEN: string
        }
    }
}