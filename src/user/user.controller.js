'use stric'

import User from './user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{
    try{    
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message: `Registered successfully, can be login with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos(body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfunción OR | espera un [] de busquedas
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) //{username} = {username: username}
        console.log(user)
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}

//Actualizar datos generales
export const update = async (req, res) => {
    try {

        const loggedUser  = {
            uid: req.user.uid,
            username: req.user.username,
            name: req.user.name,
            role: req.user.role
        }

        const data = req.body

        
        const updatedUser  = await User.findByIdAndUpdate(
            loggedUser .uid,
            data,
            { new: true }
        )

        if (!updatedUser ) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User  not found'
                }
            )
        }

        return res.send(
               {
                success: true,
                message: 'User  updated',
                user: updatedUser 
                }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const loggedUser  = {
            uid: req.user.uid,
            username: req.user.username,
            name: req.user.name,
            role: req.user.role
        }

        const { newPassword } = req.body
        const user = await User.findById(loggedUser .uid)
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User  not found'
                }
            )
        }

        
        user.password = await encrypt(newPassword)
        const updatedUser  = await user.save()

        return res.send(
            {
                success: true,
                message: 'Password updated successfully',
                user: updatedUser    
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                message: 'General error with update password function',
                e
            }
        )
    }
}


const addDefaultUser = async () => {
    try {
        // Verificar si ya existe un usuario administrador
        const adminExisting = await User.findOne({ role: "ADMIN" })
 
        if (!adminExisting) {
            // Encriptar contraseña
            const passwordHash = await encrypt("Admin1234", 10)
 
            // Crear usuario por defecto
            const adminUser = new User(
                {
                    name: "Retana",
                    surname: "Retana",
                    username: "Rretana",
                    email: "rRetana@kinal.edu.gt",
                    password: passwordHash,
                    phone: "41662897",
                    role: "ADMIN",
            }
        )
 
            await adminUser.save()
            console.log(" Default admin user added ")
        }
    } catch (e) {
        console.error("Error adding default user:", e)
    }
}

addDefaultUser();
