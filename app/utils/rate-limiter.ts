import { RateLimiter } from "discord.js-rate-limiter";

export class CustomRateLimiter extends RateLimiter {
    public type: RateLimiterType;

    constructor(limit: number, duration: number, type: RateLimiterType) {
        super(limit, duration);
        this.type = type;
    }

}

export enum RateLimiterType {
    USER = 'USER',
    GUILD = 'GUILD',
    CHANNEL = 'CHANNEL'
}