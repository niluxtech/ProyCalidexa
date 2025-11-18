<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto - CalidexA</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #2C3E7E 0%, #1a2850 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #2C3E7E;
            font-size: 20px;
            margin-bottom: 20px;
            border-bottom: 2px solid #50E3C2;
            padding-bottom: 10px;
        }
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #50E3C2;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-row {
            margin-bottom: 12px;
        }
        .info-label {
            color: #2C3E7E;
            font-weight: 600;
            display: inline-block;
            width: 80px;
        }
        .info-value {
            color: #333333;
        }
        .message-box {
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
            line-height: 1.6;
            color: #333333;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #50E3C2;
            color: #2C3E7E;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .button:hover {
            background-color: #3dd4b3;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        .footer p {
            color: #666666;
            font-size: 12px;
            margin: 5px 0;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 20px 0;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 20px 15px;
            }
            .header h1 {
                font-size: 20px;
            }
            .button {
                padding: 12px 30px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                Has recibido un nuevo mensaje desde el formulario de contacto de <strong>CalidexA</strong>.
            </p>

            <h2>📋 Datos del Remitente</h2>
            
            <div class="info-box">
                <div class="info-row">
                    <span class="info-label">Nombre:</span>
                    <span class="info-value">{{ $nombre }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">
                        <a href="mailto:{{ $email }}" style="color: #2C3E7E; text-decoration: none;">
                            {{ $email }}
                        </a>
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Teléfono:</span>
                    <span class="info-value">{{ $telefono }}</span>
                </div>
            </div>

            <h2>💬 Mensaje</h2>
            
            <div class="message-box">
                {{ $mensaje }}
            </div>

            <div class="divider"></div>

            <!-- Button -->
            <div class="button-container">
                <a href="mailto:{{ $email }}?subject=Re: Consulta desde CalidexA" class="button">
                    ✉️ Responder al Cliente
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>CalidexA</strong> - Acreditamos negocios que cumplen lo que prometen</p>
            <p style="margin-top: 10px;">
                Este mensaje fue enviado desde el formulario de contacto de 
                <a href="https://calidexa.pe" style="color: #2C3E7E; text-decoration: none;">calidexa.pe</a>
            </p>
            <p style="color: #999999; font-size: 11px; margin-top: 15px;">
                © {{ date('Y') }} CalidexA. Todos los derechos reservados.
            </p>
        </div>
    </div>
</body>
</html>