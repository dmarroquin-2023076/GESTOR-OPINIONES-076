import Category from './category.model.js'

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

export const update = async (req, res)=>{
  try {
    let id = req.params.id
    let data = req.body

    let updateCategory = await Category.findByIdAndUpdate(
      id, 
      data,
      { new: true }
    )
    if (!updateCategory){
      return res.status(400).send(
            {
                success: false,
                 message: 'Category not found and not updated'
            }
      )
    }
    return res.send(
      {
       success: true,
       message: 'Category  updated',
       user: updateCategory 
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

// export const categoryDelete = async (req, res) => {
//     try {
//         let { id } = req.params

//         const categoryToDelete = await Category.findById(id)
//         if (!categoryToDelete) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Category not found'
//             })
//         }

        
//         const defaultCategory = await Category.findOne({ name: 'Default' })
//         if (!defaultCategory) {
//             return res.status(500).send({
//                 success: false,
//                 message: 'Default category not found'
//             })
//         }

       
//         await Public.updateMany(
//             { category: id }, 
//             { category: defaultCategory._id } 
//         )

//         // Eliminar la categoría
//         let deleteCategory = await Category.findByIdAndDelete(id);
        
//         return res.status(200).send({
//             success: true,
//             message: 'Category deleted successfully',
//             deleteCategory
//         })
//     } catch (e) {
//         console.error(e);
//         return res.status(500).send({
//             success: false,
//             message: 'General error',
//              error: e
//          })
//      }
//  }









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

