import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, 'Comment is required'], // Cambié 'title' a 'Comment'
            maxLength: [100000, `Can't be overcome 100000 characters`]
        },
        publication: { // Asegúrate de que este campo se llame 'publication'
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication ID is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User ',
            // No es obligatorio
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

commentSchema.methods.toJSON = function() {
    const { __v, ...Comment } = this.toObject() 
    return Comment
}

export default model('Comment', commentSchema)