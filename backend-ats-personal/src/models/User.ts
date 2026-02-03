import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import bcrypt from "bcryptjs"

export type UserRole = "admin" | "recruiter" | "candidate"

@Entity()
// Entidad de Usuario para PostgreSQL
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    nombre!: string

    @Column({ unique: true })
    email!: string

    @Column({ select: false }) 
    password!: string

    @Column({
        type: "varchar",
        default: "candidate"
    })
    rol!: UserRole

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    // Método para encriptar contraseña antes de crear el usuario
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
        }
    }

    // Método auxiliar para comparar contraseñas
    async compararPassword(passwordString: string): Promise<boolean> {
        // Necesitamos seleccionar el password explícitamente antes de llamar a esto si usamos select: false
        return await bcrypt.compare(passwordString, this.password)
    }
}
