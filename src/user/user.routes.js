import { Router } from "express"
import { 
    login,
    register,
    update,
    updatePassword,
} from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { registerValidator, updatePasswordValidator, updateUserValidator } from "../../middlewares/validators.js"


const api = Router()

api.post('/register',registerValidator, register)

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
        updatePasswordValidator
    ], 
    updatePassword
)


export default api
