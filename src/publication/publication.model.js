import { Schema, model } from 'mongoose'



const publicationSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [100000, "Can't exceed 100000 characters"]
        },
        textP: {
            type: String,
            required: [true, 'TextP is required'],
            maxLength: [63206, "Can't exceed 63206 characters"]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category ID is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User ',
            required: [true, 'User  ID is required'] // Asegúrate de que este campo sea requerido
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)




export default model('Publication', publicationSchema)