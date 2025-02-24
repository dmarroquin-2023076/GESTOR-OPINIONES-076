//Validar datos relacionados a la BD
import { isValidObjectId } from 'mongoose';
import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'

                                //parámetro | token
export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

//Validar que sea un id
export const objectIdValid = (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).send({ error: 'The ID provided is not valid' })
    }
    next()
}


export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

export const existCategoryName = async (name) => {
    const category = await Category.findOne({ name })
    if (category) {
        throw new Error('Category name already exists')
    }
}

