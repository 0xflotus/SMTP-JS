const FS = require("fs");
const CG = require("./SMTP-CONFIG/infos.json");
const MAIL = require("nodemailer");

FS.readFile("SMTP-CONFIG/mails_list.txt", "utf-8", function (err, data) {
    try {
        if (err) throw err;
        const array = data.split("\n");

        for (const mails of array) {
            const transporter = MAIL.createTransport({
                service: "gmail",
                auth: { user: CG.yourmail, pass: CG.yourpassword }
            });

            const mailOptions = { from: CG.yourmail, to: mails, subject: CG.subject, text: CG.texts };

            transporter.sendMail(mailOptions, function (error, info) {
                if (!error) console.log("Email sent to: " + info.response);
            });
        }
    } catch (err) {
        console.error(err.message)
    }
});