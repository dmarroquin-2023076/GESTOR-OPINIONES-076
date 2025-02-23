import { Schema, model } from 'mongoose'

//id,titulo,categoria,textoprincipal,iduser,

const publicationSchema = new Schema(
    {
        title:{
            type:String,
            required: [true, 'title is required'],
            maxLength: [100000, `Can't be overcome 100000 characters`]
        },
        textP:{
            type:String,
            required: [true, 'textP is required'],
            maxLength: [63206, `Can't be overcome 63206 characters`]
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category ID is required']
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
        },
        comments: [{ // Agregar un array de comentarios
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

publicationSchema.methods.toJSON = function() {
    const { __v, ...publication } = this.toObject() 
    return publication
}

export default model('Publication', publicationSchema)