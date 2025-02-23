import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'

export const newComment = async (request, response) => {
    try {
        const { publicationId, comment } = request.body; // Obtener el ID de la publicación y el comentario desde el cuerpo de la solicitud

        // Validamos que se una id de una publicacion
        const isValidPublicationId = await Publication.findById(publicationId);
        if (!isValidPublicationId) {
            return response.status(400).send({ success: false, message: "Publication Id is not valid" });
        }

        // Crear un nuevo comentario
        const newComment = new Comment({
            comment,
            publication: publicationId, // Asegúrate de que el campo se llama 'publication' en el modelo
            user: request.user.uid // Asumiendo que el ID del usuario está en request.user.uid
        });

        await newComment.save();

        // Actualizar la publicación para incluir el nuevo comentario
        await Publication.findByIdAndUpdate(
            publicationId,
            { $push: { comments: newComment._id } }, // Agregar el ID del nuevo comentario al array de comentarios
            { new: true }
        );

        return response.status(200).send({ success: true, message: 'Comment created', comment: newComment });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ success: false, message: 'Internal server error', error });
    }
}