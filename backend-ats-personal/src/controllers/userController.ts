import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import { sendInvitationEmail } from '../services/emailService';

export const createRecruiter = async (req: Request, res: Response) => {
    const { nombre, email, password } = req.body;
    const tempPass = password || 'Temp1234!';

    try {
        const userRepository = AppDataSource.getRepository(User);

        const usuarioExiste = await userRepository.findOneBy({ email });

        if (usuarioExiste) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = new User();
        user.nombre = nombre;
        user.email = email;
        user.password = tempPass; // El hook @BeforeInsert lo encriptará automáticamente
        user.rol = 'recruiter'; // Forzamos el rol a recruiter

        await userRepository.save(user);

        // --- ENVIAR EMAIL ---
        await sendInvitationEmail(email, nombre, tempPass);

        res.status(201).json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            message: 'Reclutador creado exitosamente'
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el reclutador' });
    }
};

export const getStaff = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        
        // Obtenemos usuarios con rol admin o recruiter
        const staff = await userRepository.find({
            where: [
                { rol: 'admin' },
                { rol: 'recruiter' }
            ],
            select: ['id', 'nombre', 'email', 'rol', 'createdAt'],
            order: { createdAt: 'DESC' }
        });

        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el staff' });
    }
};

export const deleteStaff = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Evitar que un admin se borre a sí mismo por error (opcional)
        if (user.rol === 'admin' && (req as any).user.id === id) {
             return res.status(400).json({ message: 'No puedes eliminarte a ti mismo' });
        }

        await userRepository.remove(user);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};
