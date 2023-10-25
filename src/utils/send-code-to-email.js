import {gmailUser} from "../config/index.js";
import {transporter} from "../helpers/mailer.js";

export default async (email, confirmCode) => {
    const mailOptions = {
        from: gmailUser,
        to: email,
        subject: "Sending verification code",
        text: `Code: ${confirmCode}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('Email sent: ' + mailOptions.to)
    })
}