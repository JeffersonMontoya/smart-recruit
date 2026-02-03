
import { AppDataSource } from "./config/db";
import { User } from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
    try {
        await AppDataSource.initialize();
        console.log("📦 Conectado a la BD para seeding...");

        const userRepository = AppDataSource.getRepository(User);

        // Verificar si ya existe el admin
        const existingAdmin = await userRepository.findOneBy({ email: "admin@smartrecruit.io" });
        
        if (existingAdmin) {
            console.log("⚠️ El usuario Admin ya existe. No es necesario crearlo.");
            process.exit(0);
        }

        const admin = new User();
        admin.nombre = "Super Admin";
        admin.email = "admin@smartrecruit.io";
        admin.password = "admin123"; // El hook @BeforeInsert lo encriptará automáticamente
        admin.rol = "admin"; // <--- Aquí forzamos el rol

        await userRepository.save(admin);
        
        console.log("✅ ¡Usuario ADMIN creado exitosamente!");
        console.log("📧 Email: admin@smartrecruit.io");
        console.log("🔑 Pass: admin123");

    } catch (error) {
        console.error("❌ Error en el seeding:", error);
    } finally {
        await AppDataSource.destroy();
        process.exit(0);
    }
};

seedAdmin();
