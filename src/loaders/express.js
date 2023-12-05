import express from 'express'
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './../api/routes/index.js';
import bodyParser from 'body-parser';
import {prefix} from "../config/index.js";

import {adminRouter} from "./admin.js";

export default (app) => {
    app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    // app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
    app.use(compression());
    app.use(express.static('public'));
    app.disable('x-powered-by');
    app.disable('etag');
    app.use('/uploads', express.static('uploads'));
    app.use(prefix, routes);

    app.use("/admin", adminRouter)


    app.get('/', (_req, res) => {
        return res.status(200).json({
            resultMessage: {
                en: 'Project is successfully working...'
            },
            resultCode: '00004'
        }).end();
    });

    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Headers',
    //         'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //     res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
    //     if (req.method === 'OPTIONS') {
    //         res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
    //         return res.status(200).json({});
    //     }
    //     next();
    // });

    app.use((_req, _res, next) => {
        const error = new Error('Endpoint could not find!');
        error.status = 404;
        _res.status(404).json({
            message: "endpoint not found"
        })
    });

}