import {DataTypes} from "sequelize";

export default {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    parent: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    author: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}