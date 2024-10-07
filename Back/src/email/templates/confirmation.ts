import { SendEmailDto } from "../dtos/send-email.dto";

export const fillConfirmationTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Reserva</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
                .details { margin-top: 20px; }
                .details li { font-size: 1.05em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, ¡tu reserva ha sido confirmada!</h1>
            <p>Gracias por elegir nuestro servicio. Aquí están los detalles de tu reserva:</p>
            <ul class="details">
                <li><strong>Reserva:</strong> ${params.reservationId}</li>
                <li><strong>Fecha de entrada:</strong> ${params.checkInDate}</li>
                <li><strong>Fecha de salida:</strong> ${params.checkOutDate}</li>
                <li><strong>Habitación:</strong> ${params.roomType}</li>
            </ul>
            <p>Estamos encantados de tenerte con nosotros y esperamos que disfrutes de tu estancia.</p>
            <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
            <p>¡Gracias de nuevo!<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
};
