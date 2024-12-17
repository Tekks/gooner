import { Command, MessageCommand, Model, UserListener } from "../interfaces/index.js";
import { Sequelize } from "sequelize";
import { dcbot } from "../index.js";
import { Logger } from "./index.js";

export class Database extends Sequelize {
    // mariadb
    private sequelize: Sequelize;

    public constructor() {
        super({
            dialect: 'mariadb',
            host: dcbot.config.DATABASE.HOST,
            port: 3306,
            username: dcbot.config.DATABASE.USERNAME,
            password: dcbot.config.DATABASE.PASSWORD,
            database: dcbot.config.DATABASE.DATABASE,
            logging: false
        });
        this.sequelize = this;
    }

    public async init() {
        try {
            await this.sequelize.authenticate();
            Logger.info('Connection has been established successfully.');
            return this;
        } catch (error) {
            Logger.error(`Unable to connect to the database: ${error}`);
        }
    }

    public initModels(models: Model[]) {
        models.forEach(model => {
            model.initModel();
        });
        this.sequelize.sync();
    }

}