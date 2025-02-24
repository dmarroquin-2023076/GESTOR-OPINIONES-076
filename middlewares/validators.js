//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existEmail, existUsername, notRequiredField, existCategoryName } from "../utils/db.validators.js"

//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
        body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('password')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') 
        .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter') 
        .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter') 
        .matches(/\d/).withMessage('Password must contain at least 1 number'), 
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserValidator = [
    body('username')
        .optional() //Parámetro opcional, puede llegar como no puede llegar
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 
]

export const updatePasswordValidator = [
    body('currentPassword')
        .notEmpty().withMessage('Current password cannot be empty'),
    body('newPassword')
        .notEmpty().withMessage('New password cannot be empty')
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({ min: 8 })
        .withMessage('New password needs min characters')
        .matches(/[a-z]/).withMessage('New password must contain at least 1 lowercase letter')
        .matches(/[A-Z]/).withMessage('New password must contain at least 1 uppercase letter')
        .matches(/\d/).withMessage('New password must contain at least 1 number'),
    validateErrors 
]

export const createCategoryValidator = [
    body('name')
        .notEmpty().withMessage('Category name cannot be empty')
        .custom(existCategoryName), 
    body('description')
        .optional()
        .notEmpty().withMessage('Description cannot be empty'),
    validateErrors
]

export const createPublicationValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100000 }).withMessage("Can't exceed 100000 characters"),
    body('textP')
        .notEmpty().withMessage('Text is required')
        .isLength({ max: 63206 }).withMessage("Can't exceed 63206 characters"),
    body('category')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Category ID must be a valid MongoDB ObjectId'), 
    body('user')
        .optional() // El ID del usuario es opcional
        .isMongoId().withMessage('User  ID must be a valid MongoDB ObjectId'),
]

export const updatePublicationValidator = [
    body('title')
        .notEmpty().withMessage('Title is required') 
        .isLength({ min: 1, max: 100000 }).withMessage("Title must be between 1 and 100000 characters"), 
    body('textP')
        .notEmpty().withMessage('Text is required') 
        .isLength({ min: 1, max: 63206 }).withMessage("Text must be between 1 and 63206 characters"),
    body('category')
        .notEmpty().withMessage('Category ID is required') 
        .isMongoId().withMessage('Category ID must be a valid MongoDB ObjectId'), 
    body('user')
        .notEmpty().withMessage('User  ID is required') 
        .isMongoId().withMessage('User  ID must be a valid MongoDB ObjectId'),
]

