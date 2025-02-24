import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, 'Comment is required'],
            maxLength: [100000, `Can't be overcome 100000 characters`]
        },
        publicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication ID is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Asegúrate de que este campo haga referencia al modelo de Usuario
            required: true // Asegúrate de que este campo sea obligatorio
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

commentSchema.methods.toJSON = function() {
    const { __v, ...Comment } = this.toObject();
    return Comment;
}

export default model('Comment', commentSchema);