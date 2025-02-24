import { Router } from "express";
import { deleteP, saveP, update } from "./publication.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { objectIdValid } from "../../utils/db.validators.js";
import { createPublicationValidator, updatePublicationValidator } from "../../middlewares/validators.js";

const api = Router()

api.post('/new', validateJwt, createPublicationValidator, saveP)

api.put('/update/:id', validateJwt, objectIdValid, updatePublicationValidator, update)


api.delete('/delete/:id', validateJwt, objectIdValid , deleteP)

export default api