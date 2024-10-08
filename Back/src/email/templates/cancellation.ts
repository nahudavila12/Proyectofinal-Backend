import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cancelación de Reserva</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #F44336; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu reserva ha sido cancelada</h1>
            <p>Queremos informarte que tu reserva con el ID ${params.reservationId} ha sido cancelada.</p>
            <p>Si tienes alguna pregunta o deseas hacer una nueva reserva, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
            <p>Gracias por usar nuestra plataforma,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
