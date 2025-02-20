import { Router } from "express"
import { saveCategory } from "./category.controller.js"

const api = Router()



api.post('/new', saveCategory)


export default api