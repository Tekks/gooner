import { DataTypes, Model } from "sequelize";
import { dcbot } from "../index.js";

export class Femboy extends Model {
    declare userId: string;
    declare userName: string;
    declare reason: string;

    public static initModel() {
        Femboy.init({
            userId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING
            }
        }, {
            sequelize: dcbot.database,
            modelName: 'femboy',
            timestamps: false
        });
    }
}


