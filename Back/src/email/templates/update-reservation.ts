import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Actualización de Reserva</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu reserva ha sido actualizada</h1>
            <p>Te informamos que los detalles de tu reserva con el ID ${params.reservationId} han sido actualizados.</p>
            <p>Detalles actualizados:</p>
            <p>${params.updatedDetails}</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
