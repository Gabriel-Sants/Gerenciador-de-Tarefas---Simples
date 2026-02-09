import express from 'express'
import { userRoutes } from './presentation/routes/user.routes.js'
import { taskRoutes } from './presentation/routes/task.routes.js'
import cors from 'cors'

export const app = express()

app.use(cors({
  origin: 'http://localhost:5173' // ou 8080, depende do Vue
}));

app.use(express.json())


app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
