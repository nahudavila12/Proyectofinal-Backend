import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Pago por PayPal</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
                .transaction-details {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, tu pago ha sido confirmado</h1>
            <p>¡Gracias por tu compra! Tu transacción ha sido procesada correctamente.</p>
            <div class="transaction-details">
                <p><strong>Monto:</strong> $${params.amount}</p>
                <p><strong>ID de Transacción:</strong> ${params.transactionId}</p>
                <p><strong>Fecha de Pago:</strong> ${params.date}</p>
            </div>
            <p>Si tienes alguna pregunta o inquietud sobre tu transacción, no dudes en contactarnos.</p>
            <p>Gracias por confiar en nosotros,<br>El equipo de TuEmpresa</p>
        </body>
        </html>
    `;
}
