import connectDB from '../../../utils/connectDB'
import Informdata from '../../../models/infoModel'
import auth from '../../../middleware/auth'
// import Products from '../../../models/productModel'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getInform(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getInform = async (req, res) => {
    try {
        const features = new APIfeatures(Informdata.find(), req.query)
        .filtering().sorting().paginating()

        const products = await features.query
        
        res.json({
            status: 'success',
            result: products.length,
            products
            
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
        
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const {title, images, description} = req.body

        if(!title || images.length === 0 || !description)
        return res.status(400).json({err: 'Please add all the fields22.'})


        const newProduct = new Informdata({
            title : title, images, description
        })
        console.log(newProduct)
        await newProduct.save()

        res.json({msg: 'เพิ่มข่าวประชาสัมพันธ์สำเร็จ'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}