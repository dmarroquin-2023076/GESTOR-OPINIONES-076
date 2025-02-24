import Category from './category.model.js'
import Publication from '../publication/publication.model.js'

export const saveCategory = async (req, res)=>{
    try {
        let data = req.body
        let newCategory = new Category(data)
        await newCategory.save()
        return res.send(
            {
                message:`Saved category`
            }
        )
    }
     catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                message:'General error',
                e
            }
        )
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }   
            )
        }

       
        category.name = name || category.name// Solo actualiza si se proporciona un nuevo valor
        category.description = description || category.description

        const updatedCategory = await category.save()

        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                category: updatedCategory
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal server error',
                error
            }
        )
    }
}

export const categoryDelete = async (req, res) => {
  try {
      let { id } = req.params

      // Buscar la categoria a eliminar
      const categoryToDelete = await Category.findById(id)
      if (!categoryToDelete) {
          return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )   
      }

      // Buscar la categoria por defecto
      const defaultCategory = await Category.findOne({ name: 'Default' })
      if (!defaultCategory) {
        return res.status(500).send(
                {
                success: false,
                message: 'Default category not found'
                }
        )
      }

      // Redirigir las publicaciones a la categoria por defecto
      await Publication.updateMany(
          { category: id }, 
          { category: defaultCategory._id } 
      )

      // Eliminar la categora
      const deleteCategory = await Category.findByIdAndDelete(id)
      
      return res.status(200).send(
        {
            success: true,
            message: 'Category deleted successfully',
            deletedCategory: deleteCategory // Cambiel nombre a deletedCategory para mayor claridad
        }
    )
  } catch (e) {
      console.error(e)
      return res.status(500).send(
        {
          success: false,
          message: 'General error',
          error: e
        }
    )
  }
}


 export const getCategoriesWithPublications = async (req, res) => {
  try {
      // Obtener todas las categoriias
      const categories = await Category.find()

      // Para cada categori obtener las publicaciones asociadas
      const categoriesWithPublications = await Promise.all(categories.map(async (category) => {
          const publications = await Publication.find({ category: category._id })
          return {
              ...category.toJSON(), // Convertir a objeto y excluir __v
              publications // Incluir las publicaciones asociadas
          }
        
    }
    ))

    return res.status(200).send(
            {
                success: true,
                categories: categoriesWithPublications
            }
    )
  } catch (error) {
    console.error(error)
    return res.status(500).send(
        {
                success: false,
                message: 'Internal server error',
            error
        }
    )
  }
}






const addCategoriesByDefault = async () => {
    const existingCategory = await Category.countDocuments()

    if (existingCategory === 0) {
      const defaultCategory = [
        {
            name: "Default",
            description: "default category"
        }
        
      ]

    try {
        await Category.insertMany(defaultCategory)
        console.log("Category added by default")
      } catch (e) {
        console.error("Error when adding categories: ", e)
      }
    }
  }
  addCategoriesByDefault();

