import {config} from 'dotenv';
config({path: ".env"});

const {DB_HOST, DB_NAME, DB_USER, DB_PASS, PORT, JWT_SECRET_KEY, GMAIl_USER, GMAIL_PASS} = process.env

export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const dbHost = DB_HOST;
export const dbName = DB_NAME
export const dbUser = DB_USER;
export const dbPass = DB_PASS;

export const gmailUser = GMAIl_USER;
export const gmailPass = GMAIL_PASS;
export const prefix = '/api';
export const specs = "/docs";