import Publication from './publication.model.js'

export const saveP = async (req, res) => {
    try {
        let data = req.body
        
        let newP = new Publication({
                ...data,
                user: req.user.uid 
            }
         )

        await newP.save()
            return res.send(
                {
                    message: 'Save Publication',
                    publication: newP
                }
            )
   
        } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                message: 'General error',
                e
            }
        )
    }
}

export const update = async (req, res)=>{
    try {
        let id = req.params.id
            let data = req.body
        
            let updatePublication = await Publication.findByIdAndUpdate(
              id, 
              data,
              { new: true }
            )
            if (!updatePublication){
              return res.status(400).send(
                    {
                        success: false,
                         message: 'Publication not found and not updated'
                    }
              )
            }
            return res.send(
              {
               success: true,
               message: 'Publication  updated',
               user: updatePublication 
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

export const deleteP = async (req, res) => {
    try {
        const publicationId = req.params.id

        const publication = await Publication.findByIdAndDelete(publicationId)
        if (!publication) {
            return res.status(404).send(
                {
                     message: 'Publication  not found'
                     }
                    )
        }

        return res.send({ message: 'Profile deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
             message: 'Error deleting profile', 
             err 
            }
        )
    }
}