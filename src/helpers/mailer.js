import nodemailer from "nodemailer"
import {gmailPass, gmailUser} from "../config/index.js";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: gmailPass,

    }
});
