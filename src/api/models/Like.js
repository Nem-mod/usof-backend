import {DataTypes} from "sequelize";

export default {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    entityId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    entityType: {
        type: DataTypes.ENUM('post', 'comment'),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('like', 'dislike'),
        allowNull: false,
    },
}