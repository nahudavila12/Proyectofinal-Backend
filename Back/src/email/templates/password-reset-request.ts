import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Solicitud de Restablecimiento de Contraseña</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #2196F3; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name},</h1>
            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p>Si fuiste tú quien solicitó este cambio, por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <p><a href="${params.resetLink}">Restablecer Contraseña</a></p>
            <p>Si no solicitaste este cambio, simplemente ignora este mensaje.</p>
            <p>Gracias,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
