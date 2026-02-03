import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transportador
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verificar la conexión al inicio
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error en la configuración del correo:', error);
    } else {
        console.log('✅ Servidor de correo listo para enviar mensajes');
    }
});

export const sendInvitationEmail = async (email: string, nombre: string, passwordTemporal: string) => {
    const mailOptions = {
        from: `"Smart Recruit" <${process.env.EMAIL_USER || 'noreply@smartrecruit.com'}>`,
        to: email,
        subject: '¡Bienvenido al equipo de Smart Recruit!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px;">
                <h1 style="color: #4f46e5; text-align: center;">Smart Recruit</h1>
                <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>Has sido invitado a unirte a nuestro equipo como <strong>Reclutador</strong>.</p>
                <p>Para acceder a tu panel, utiliza las siguientes credenciales temporales:</p>
                <div style="background-color: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 5px 0;"><strong>Contraseña Temporal:</strong> ${passwordTemporal}</p>
                </div>
                <p style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:5173/login" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Iniciar Sesión ahora</a>
                </p>
                <p style="color: #71717a; font-size: 12px; margin-top: 40px; text-align: center;">
                    * Por seguridad, te recomendamos cambiar tu contraseña una vez que ingreses al sistema.
                </p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Correo de invitación enviado a: ${email}`);
        // Si usas Ethereal, esto te da la URL para ver el correo
        if (process.env.EMAIL_HOST?.includes('ethereal')) {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        return true;
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        return false;
    }
};
