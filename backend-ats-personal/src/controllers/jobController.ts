import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Job } from "../models/Job";

export const createJob = async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion, ubicacion, salario , nivel } = req.body;
        const jobRepository = AppDataSource.getRepository(Job);

        const newJob = jobRepository.create({
            titulo,
            descripcion,
            ubicacion,
            salario,
            nivel,
            createdBy: (req as any).user 
        });

        await jobRepository.save(newJob);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la vacante" });
    }
};

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobRepository = AppDataSource.getRepository(Job);
        // Traemos las vacantes y adjuntamos info del creador (nombre y email)
        const jobs = await jobRepository.find({
            relations: ["createdBy"],
            order: { createdAt: "DESC" }
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener vacantes" });
    }
};