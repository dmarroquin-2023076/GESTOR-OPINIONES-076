import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'


export const newComment = async (request, response) => {
    try {
        let data = request.body
        let { publicationId, comment } = data 

        if (!publicationId) {
            return response.status(400).send({ success: false, message: "Publication ID is required" })
        }

        if (!/^[0-9a-fA-F]{24}$/.test(publicationId)) {
            return response.status(400).send({ success: false, message: "The ID provided is not valid" })
        }

        const isValidPublicationId = await Publication.findById(publicationId)
        if (!isValidPublicationId) {
            return response.status(400).send({ success: false, message: "Publication does not exist" })
        }

        if (!comment || comment.trim() === '') {
            return response.status(400).send({ success: false, message: "Comment cannot be empty" })
        }

        const newComment = new Comment({
            comment,
            publicationId,
            user: request.user.uid 
        })

        await newComment.save()

        response.status(200).send({ success: true, message: 'Comment created', comment: newComment })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}

export const updateComment = async (request, response) => {
    try {
        const { id } = request.params 
        const { comment } = request.body

        const existingComment = await Comment.findById(id)
        if (!existingComment) {
            return response.status(404).send({ success: false, message: "Comment not found" })
        }

        if (existingComment.user.toString() !== request.user.uid) {
            return response.status(403).send({ success: false, message: "You are not authorized to update this comment" })
        }

        if (!comment || comment.trim() === '') {
            return response.status(400).send({ success: false, message: "Comment cannot be empty" })
        }

        existingComment.comment = comment
        await existingComment.save()

        response.status(200).send({ success: true, message: 'Comment updated', comment: existingComment })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}

export const deleteP = async (req, res) => {
    try {
        const commentId = req.params.id

        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' })
        }
        
        if (comment.user.toString() !== req.user.uid) {
            return res.status(403).send({ message: 'You are not authorized to delete this comment' })
        }

        await Comment.findByIdAndDelete(commentId)

        return res.send({ message: 'Comment deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting comment', err })
    }
}

export const getPublicationWithComments = async (request, response) => {
    try {
        const { publicationId } = request.params
        const publication = await Publication.findById(publicationId)
        if (!publication) {
            return response.status(404).send({ success: false, message: "Publication not found" })
        }

        const comments = await Comment.find({ publicationId: publicationId })
            .populate('user', 'username')
        response.status(200).send({
            success: true,
            publication,
            comments
        })
    } catch (error) {
        console.error(error)
        response.status(500).send({ success: false, message: 'Internal server error', error })
    }
}