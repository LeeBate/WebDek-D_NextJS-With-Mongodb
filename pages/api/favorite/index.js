import connectDB from '../../../utils/connectDB'
import Products from '../../../models/FavoriteModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
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

        if(queryObj.category !== 'all')
            this.query.find({category: queryObj.category})
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

const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Products.find(), req.query)
        .filtering().sorting().paginating()

        const favorits = await features.query
        
        res.json({
            status: 'success',
            result: favorits.length,
            favorits
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        

        const {title, en,category, images, prodid,userid} = req.body

        if(!title || !en || !prodid || !userid || !category  || !images)
        return res.status(400).json({err: 'Please add all the fields888.'})


        const newProduct = new Products({
            title : title, en,category, images, prodid,userid
        })
        console.log("new product =",newProduct)
        await newProduct.save()

        res.json({msg: 'เพิ่มเครื่องมือไว้ในรายการโปรดเรียบร้อยแล้ว'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}