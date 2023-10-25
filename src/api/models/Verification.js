import {DataTypes} from "sequelize";

export default {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true
    }
}