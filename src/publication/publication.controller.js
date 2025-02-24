import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'
import Category from '../category/category.model.js'

export const saveP = async (req, res) => {
    try {
        const data = req.body
        const categoryId = data.category

        // Verificar si la categoría existe
        const categoryExists = await Category.findById(categoryId)
        if (!categoryExists) {
            return res.status(404).send({
                success: false,
                message: 'La categoría no existe'
            })
        }

        const newP = new Publication({
            ...data,
            user: req.user.uid 
        })

        await newP.save()
        return res.status(201).send({
            success: true,
            message: 'Publicación guardada exitosamente',
            publication: newP
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error general',
            error: error.message 
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id 
        const data = req.body 
        const publication = await Publication.findById(id)
        if (!publication) {
            return res.status(404).send({
                success: false,
                message: 'Publication not found'
            })
        }

        if (!publication.user || publication.user.toString() !== req.user.uid) {
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to update this publication'
            })
        }

       
        delete data.category
        delete data.user

       
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true } 
        )

        return res.send({
            success: true,
            message: 'Publication updated successfully',
            publication: updatedPublication
        })

    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            error: err.message
        })
    }
}

export const deleteP = async (req, res) => {
    try {
        const publicationId = req.params.id

        const publication = await Publication.findById(publicationId)
        
        if (!publication) {
            return res.status(404).send({
                success: false,
                message: 'Publication not found'
            })
        }

        if (!publication.user || publication.user.toString() !== req.user.uid) {
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to delete this publication'
            })
        }

        // Eliminar todos los comentarios asociados a la publicación
        await Comment.deleteMany({ publicationId: publicationId })

        // Eliminar la publicación
        await Publication.findByIdAndDelete(publicationId)

        return res.send({ 
            success: true,
            message: 'Publication and associated comments deleted successfully' 
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error deleting publication',
            error: err.message
        })
    }
}