import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Email {

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'mekhi.mcdermott@ethereal.email', 
      pass: 'dkqUCPwfyxtjCDA5zQ'
    },
    tls: {
      rejectUnauthorized: false, // Desactiva la verificación del certificado SSL
    }
  });

  async sendEmail(from, subjectEmail, sendTo, html) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Mekhi" <mekhi.mcdermott@ethereal.email>', 
        to: sendTo, 
        subject: subjectEmail, 
        html: html, 
      });
      
      console.log('Message sent: %s', info.messageId); 
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
    } catch (error) {
      console.error('Error al enviar el correo:', error.message);
      throw error;
    }
  }

  async testEmail() {
    try {

      const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
        to: "bar@example.com, baz@example.com", 
        subject: 'Email de prueba', 
        html: '<b>Test Email</b>', 
      });
      console.log('Message sent: %s', info.messageId); 
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
    } catch (error) {
      console.error('Error al enviar el correo de prueba:', error.message);
      throw error;
    }
  }
}
