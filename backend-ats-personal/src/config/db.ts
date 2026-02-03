import { DataSource } from "typeorm"
import { User } from "../models/User"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1221",
    database: process.env.DB_NAME || "ats_personal",
    synchronize: true, 
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})

const connectDB = async () => {
    try {
        await AppDataSource.initialize()
        console.log("✅ PostgreSQL Conectado exitosamente")
    } catch (error) {
        console.error("❌ Error conectando a PostgreSQL:", error)
        process.exit(1)
    }
}

export default connectDB
