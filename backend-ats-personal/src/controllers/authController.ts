import { Request, Response } from 'express';
// Controlador de Autenticación con TypeORM
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';

const generarToken = (id: string, rol: string) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

export const register = async (req: Request, res: Response) => {
    const { nombre, email, password } = req.body;
    // 🔒 IMPORTANTE: No leemos 'rol' del body para evitar que alguien se registre como admin
    // Por defecto el modelo asignará 'candidate'

    try {
        const userRepository = AppDataSource.getRepository(User);

        const usuarioExiste = await userRepository.findOneBy({ email });

        if (usuarioExiste) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Creamos la instancia (se ejecutará @BeforeInsert para hashear password al guardar)
        const user = new User();
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        // user.rol = 'candidate'; // Dejamos que el default actúe o lo forzamos aquí si queremos

        await userRepository.save(user);

        res.status(201).json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            token: generarToken(user.id, user.rol),
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor al registrar usuario' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);

        // Necesitamos seleccionar el password explícitamente porque pusimos { select: false } en el modelo
        const user = await userRepository.findOne({
            where: { email },
            select: ['id', 'nombre', 'email', 'rol', 'password']
        });

        if (user && (await user.compararPassword(password))) {
            res.json({
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                token: generarToken(user.id, user.rol),
            });
        } else {
            res.status(401).json({ message: 'Email o contraseña inválidos' });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    res.json({ message: 'Perfil de usuario (Pendiente de Middleware)' });
};
