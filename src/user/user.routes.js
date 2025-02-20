import { Router } from "express"
import { 
    login,
    register,
    update,
    updatePassword,
} from "./user.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js"


const api = Router()

api.post('/register', register)

api.post('/',login)


api.put(
    '/updateUser', 
    [
        validateJwt, 
        updateUserValidator
    ], 
    update
)

api.put(
    '/updatePassword',
    [
        validateJwt, 
        updateUserValidator
    ], 
    updatePassword
)


export default api
