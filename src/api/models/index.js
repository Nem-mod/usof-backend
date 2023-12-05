import {Sequelize} from "sequelize";
import {dbHost, dbName, dbPass, dbUser} from "../../config/index.js";
import user from "./User.js"
import verification from "./Verification.js"
import post from "./Post.js"
import category from "./Category.js";
import postCategories from "./PostCategories.js";
import comment from "./Comment.js";
import like from "./Like.js";
export const sequelize = new Sequelize(
    {
        database: dbName,
        username: dbUser,
        password: dbPass,
        host: dbHost,
        dialect: "mysql"
    }
)

export const UserModel = sequelize.define('user', user);
export const VerificationCodeModel = sequelize.define('verification_code', verification);

export const PostModel = sequelize.define('post', post);

export const CategoryModel = sequelize.define('category', category);
export const PostCategoriesModel = sequelize.define('post_categories', postCategories);

export const CommentModel = sequelize.define('comment', comment);

export const LikeModel = sequelize.define('like', like);

UserModel.hasOne(VerificationCodeModel);
VerificationCodeModel.belongsTo(UserModel);

PostModel.belongsTo(UserModel, { foreignKey: 'author' });
PostModel.belongsToMany(CategoryModel, {
    through: PostCategoriesModel,
    foreignKey: 'postId',
    as: 'postCategories'
});

CategoryModel.belongsToMany(PostModel, {
    through: PostCategoriesModel,
    foreignKey: 'categoryId',
    as: 'categoryPosts',
});


CommentModel.belongsTo(UserModel, { foreignKey: 'author' });
CommentModel.belongsTo(PostModel, { foreignKey: 'parent' });

LikeModel.belongsTo(UserModel, { foreignKey: 'userId' });


(async () => {
    // Пересоздаем таблицу в БД
    await sequelize.sync()
    // дальнейший код
})()