import { Router } from "express";
import { deleteP, saveP, update } from "./publication.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/new',validateJwt, saveP)
api.put('/update/:id', validateJwt, update)

api.delete('/delete/:id', validateJwt, deleteP)

export default api