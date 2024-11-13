// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'marion.deckow@ethereal.email',
        pass: 'cABEsAM7vz3hbAY9C1',
      },
    });
  }

  async sendResetEmail(email: string, resetCode: string): Promise<void> {
    const mailOptions = {
      from: 'Auth-backend service <bethel.fahey52@ethereal.email>',
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}