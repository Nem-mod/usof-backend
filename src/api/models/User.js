import {sequelize} from "./index.js";
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    login: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
        allowNull: false,
    },

    fname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    lname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0

    },

    profile_picture_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


export const VerificationCode = sequelize.define('verification_code', {
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
});

User.hasOne(VerificationCode);
VerificationCode.belongsTo(User);

(async () => {
    // Пересоздаем таблицу в БД
    await sequelize.sync()
    // дальнейший код
})()