import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

export const userRoutes = Router()

userRoutes.post('/', UserController.create)
userRoutes.get('/', UserController.list)
userRoutes.get('/:id', UserController.get)
userRoutes.put('/:id', UserController.update)
userRoutes.delete('/:id', UserController.delete)
