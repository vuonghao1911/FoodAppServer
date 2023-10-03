import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail() {
        await this.mailerService.sendMail({
            to: "vuonghao14298@gmail.com",
            subject: "Welcome to",
            template: 'index.hbs',
            context: {
                name: "hoaaaa"
            }

        });

        return { message: 'Email sent successfully' };
    }
}
