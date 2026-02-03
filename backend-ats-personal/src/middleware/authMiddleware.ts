import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';

interface TokenPayload {
    id: string;
    rol: string;
}

export const protect = async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

            const userRepository = AppDataSource.getRepository(User);
            req.user = await userRepository.findOne({ 
                where: { id: decoded.id },
                select: ['id', 'nombre', 'email', 'rol']
            });

            if (!req.user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, el token falló' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

export const admin = (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'No autorizado como administrador' });
    }
};
