import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { newComment } from './comment.controller.js'

const api = Router()

api.post('/new', validateJwt, newComment)

export default api