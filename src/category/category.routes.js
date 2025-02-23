import { Router } from "express"
import { saveCategory, update } from "./category.controller.js"
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
const api = Router()



api.post('/new', validateJwt, isAdmin, saveCategory)
api.put('/update/:id',validateJwt, isAdmin, update)


export default api