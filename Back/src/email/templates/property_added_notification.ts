import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Propiedad Agregada</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola, tu nueva propiedad ha sido agregada exitosamente!</h1>
            <p>Te informamos que la propiedad con el ID <strong>${params.propertyId}</strong> ha sido agregada a tu cuenta.</p>
            <p>Detalles de la propiedad:</p>
            <p>${params.propertyDetails}</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
