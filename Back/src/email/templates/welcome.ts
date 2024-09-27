import { SendEmailDto } from "../dtos/send-email.dto";

export const fillTemplate = (body: SendEmailDto) => {
    const { params } = body;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido a Nuestra Plataforma de Reservas</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h1 { color: #4CAF50; }
                p { font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Hola ${params.name}, ¡bienvenido a nuestra plataforma de reservas!</h1>
            <p>Estamos encantados de tenerte con nosotros. Ahora puedes explorar las mejores estancias y realizar tus reservas de manera fácil y rápida.</p>
            <p>Aquí hay algunas cosas que puedes hacer:</p>
            <ul>
                <li>Buscar y comparar estancias.</li>
                <li>Gestionar tus reservas desde tu perfil.</li>
                <li>Recibir ofertas exclusivas y promociones.</li>
            </ul>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
            <p>Gracias por unirte a nosotros,<br>El equipo de InstaStay</p>
        </body>
        </html>
    `;
}
