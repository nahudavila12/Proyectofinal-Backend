import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Actualización de Contraseña</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #2196F3; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu contraseña ha sido actualizada</h1>
            <p>Te informamos que tu contraseña ha sido actualizada correctamente.</p>
            <p>Si no realizaste esta acción, por favor contacta con nuestro soporte inmediatamente.</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
