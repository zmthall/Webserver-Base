const nodemailer = require("nodemailer");
require('dotenv').config()

let mailer_settings = {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
}

async function send_email(message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true, //ssl
        auth: {
            user: mailer_settings.username,
            pass: mailer_settings.password,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    if(message.from === undefined)
        message.from = mailer_settings.username

    const info = await transporter.sendMail(message)

    console.log("Message was sent: %s", info.messageId)
}

module.exports = {
    send_email: send_email
}