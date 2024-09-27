import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class Email {

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'mekhi.mcdermott@ethereal.email', //crear correo en 'ethereal.email' de prueba
      pass: 'dkqUCPwfyxtjCDA5zQ'
    }
  });

  async sendEmail(from, subjectEmail, sendTo, html) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Mekhi" <mekhi.mcdermott@ethereal.email>', // sender address
        to: sendTo, // list of receivers
        subject: subjectEmail, // Subject line
        html: html, // html body
      });
      // Puedes loguear la información sobre el envío
      console.log('Message sent: %s', info.messageId); // ID del mensaje
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // URL de vista previa si usas Ethereal
    } catch (error) {
      throw error;
    }
  }

  async testEmail() {
    try {

      const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: 'Email de prueba', // Subject line
        html: '<b>Test Email</b>', // html body
      });
      // Puedes loguear la información sobre el envío
      console.log('Message sent: %s', info.messageId); // ID del mensaje
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // URL de vista previa si usas Ethereal
    } catch (error) {
      throw error
    }
  }
}
