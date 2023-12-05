import * as AdminJSSequelize from '@adminjs/sequelize'
import AdminJS from "adminjs";
import {CategoryModel, CommentModel, PostModel, UserModel} from "../api/models/index.js";
import AdminJSExpress from "@adminjs/express";


const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const adminOptions = {
    // We pass Category to `resources`
    resources: [UserModel, PostModel, CommentModel, CategoryModel],
}


export const admin = new AdminJS(adminOptions);
export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    },
    null
);