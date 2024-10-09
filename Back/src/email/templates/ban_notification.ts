import { SendEmailDto } from "../dtos/send-email.dto";

export const fillBanNotificationTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notificación de Baneo</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #FF0000; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu cuenta ha sido baneada</h1>
            <p>Lamentamos informarte que tu cuenta ha sido baneada debido a violaciones de nuestras políticas de uso.</p>
            <p>Si crees que esto es un error o deseas más información, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
            <p>Gracias por tu comprensión,<br>El equipo de [Nombre de tu Aplicación]</p>
        </body>
        </html>
    `;
}
