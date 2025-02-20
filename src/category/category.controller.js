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

