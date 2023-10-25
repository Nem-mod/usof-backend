import {DataTypes} from "sequelize";

export default  {
    postId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
};