import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { deleteP, getPublicationWithComments, newComment, updateComment } from './comment.controller.js'

const api = Router()

api.post('/new', validateJwt, newComment)
api.put('/update/:id', validateJwt, updateComment)
api.delete('/delete/:id', validateJwt, deleteP)

api.get('/get/:publicationId', validateJwt,getPublicationWithComments)

export default api