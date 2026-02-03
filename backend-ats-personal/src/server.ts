import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import connectDB from './config/db'

const PORT = process.env.PORT || 3000

// Conectar a Base de Datos
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
