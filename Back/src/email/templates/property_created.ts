import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Propiedad Creada</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu propiedad ha sido creada exitosamente!</h1>
            <p>La propiedad con ID ${params.propertyId} y título "${params.propertyTitle}" ha sido añadida a tu cuenta.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
