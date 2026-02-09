import { Router } from 'express'
import { TaskController } from '../controllers/TaskController.js'

export const taskRoutes = Router()

taskRoutes.post('/', TaskController.create)
taskRoutes.patch('/:id/status', TaskController.changeStatus)
taskRoutes.get('/user/:userId', TaskController.list)
