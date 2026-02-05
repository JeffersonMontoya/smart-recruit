import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import jobRoutes from './routes/jobRoutes'

const app = express()

// Middlewares
app.use(cors()) // Permite peticiones desde el frontend
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'API ATS funcionando 🚀' })
})

// Ruta base antigua (mantener por compatibilidad si se usaba, o redirigir)
app.get('/', (_req, res) => {
  res.send('API Backend ATS Running')
})

export default app
