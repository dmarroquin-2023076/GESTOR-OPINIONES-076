import { Router } from "express"
import { categoryDelete, getCategoriesWithPublications, saveCategory, update } from "./category.controller.js"
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { createCategoryValidator } from "../../middlewares/validators.js"
import { objectIdValid } from "../../utils/db.validators.js"
const api = Router()



api.post('/new', validateJwt, isAdmin, createCategoryValidator, saveCategory);

api.put('/update/:id', validateJwt, isAdmin, objectIdValid, createCategoryValidator, update);

api.get('/', validateJwt, getCategoriesWithPublications);

api.delete('/:id', validateJwt, isAdmin, objectIdValid, categoryDelete);

export default api