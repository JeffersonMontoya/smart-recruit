import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

export type JobStatus = "open" | "closed" | "draft"

@Entity()
export class Job {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    titulo!: string

    @Column("text")
    descripcion!: string

    @Column()
    ubicacion!: string

    @Column({ nullable: true })
    salario?: string

    @Column()
    nivel!: string

    @Column({
        type: "varchar",
        default: "open"
    })
    estado!: JobStatus

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    // Relación: Muchas vacantes pueden ser creadas por un solo usuario (reclutador/admin)
    @ManyToOne(() => User, (user) => user.id)
    createdBy!: User
}