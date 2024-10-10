import { SendEmailDto } from "../dtos/send-email.dto";

export const fillOwnerConfirmationTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Propietario Agregado</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, ¡eres un nuevo propietario!</h1>
            <p>Te informamos que has sido agregado como propietario en nuestra plataforma.</p>
            <p>Detalles:</p>
            <p>UUID: ${params.ownerId}</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de [Nombre de tu Aplicación]</p>
        </body>
        </html>
    `;
}
