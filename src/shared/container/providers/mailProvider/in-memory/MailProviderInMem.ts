import { IMailProvider } from "../IMailProvider";


class MailProviderInMem implements IMailProvider{

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        console.log("EMAIL WAS SEND SUCCESSFULY!!");
    }
}

export { MailProviderInMem };