import connectDB from '../../../utils/connectDB'
import Products from '../../../models/FavoriteModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if(!product) return res.status(400).json({err: 'This product does not exist.'})
        
        res.json({ product })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
      

        const {id} = req.query
        const {title,en, brand, modelName, room,roomen, manager,
            detailCapability, detailRestrictions, category, images, nameRate} = req.body

        if(!title || !en  || !brand || !modelName || !room ||!roomen || !manager||
            !detailCapability || !detailRestrictions || category === 'all' || images.length === 0 || nameRate.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})

        await Products.findOneAndUpdate({_id: id}, {
            en : en.toLowerCase(),title, brand, modelName, room,roomen, manager, detailCapability, detailRestrictions, category, images, nameRate
        })

        res.json({msg: 'Success! Updated a product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
        
    }
}

const deleteProduct = async(req, res) => {
    try {
        const result = await auth(req, res)
        
     

        const {id} = req.query

        await Products.findByIdAndDelete(id)
        res.json({msg: 'ลบข้อมูลสำเร็จ'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}