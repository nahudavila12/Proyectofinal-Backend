import { Injectable } from '@nestjs/common';
import { SendEmailDto } from 'src/email/dtos/send-email.dto';
import { Email } from 'src/email/providers/email/email';

@Injectable()
export class EmailService {

    constructor(
        private emailProvider: Email
    ){}

    async sendEmail(body: SendEmailDto) {
        try {
            const { from, subjectEmail, sendTo, template, params } = body;
            const html = await this.getTemplate({ template, params }); // Asegúrate de que getTemplate acepte template y params
            await this.emailProvider.sendEmail(from, subjectEmail, sendTo, html);
            return true;
        } catch (error) {
            throw error;
        }
    }
    

    async healthCheck(){
        try {
            await this.emailProvider.testEmail()
            return {
                statusService: 'UP'
            }
        } catch (error) {
            throw error
        }
    }

    private async getTemplate(body){
        const template = await this.getTemplateFile(body.template)
        const html = template.fillTemplate(body)
        return html
    }

    private async getTemplateFile(template: string) {
        const path = '../../templates';
        
        try {
            const templateFile = await import(`${path}/${template}`);
            return templateFile;
        } catch {
            throw new Error(`No se pudo cargar el template: ${template}`);
        }
    }
    
}
