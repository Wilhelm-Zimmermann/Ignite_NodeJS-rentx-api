import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class EtherealMailProvider implements IMailProvider {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(acc => {
            const transporter = nodemailer.createTransport({
                host: acc.smtp.host,
                port: acc.smtp.port,
                secure: acc.smtp.secure,
                auth: {
                    user: acc.user,
                    pass: acc.pass
                }
            })
            this.client = transporter;
        }).catch(err => console.error(err));
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);
        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreply@rentx.com.br>",
            subject,
            html: templateHtml
        });

        console.log(`Message sent: ${message.messageId}`);
        console.log(`Preview url: ${nodemailer.getTestMessageUrl(message)}`);
    }

}

export { EtherealMailProvider }