import connectDB from '../../../utils/connectDB'
import Products from '../../../models/BookingModel'
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

        const booking = await features.query
        
        res.json({
            status: 'success',
            result: booking.length,
            booking
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        

        const {email, fullname,studentID,phone,dateBooking,dateBookingEnd, prodid,userid,statusBooking} = req.body

        if(!email || !fullname ||!phone ||!dateBooking ||!dateBookingEnd || !studentID )
        return res.status(400).json({err: 'กรอกข้อมูลให้ครบถ้วนทุกช่อง'})


        const newProduct = new Products({
            email, fullname,studentID,phone,dateBooking,dateBookingEnd, prodid,userid,statusBooking
        })
        console.log("new product =",newProduct)
        await newProduct.save()

        res.json({msg: 'จองสำเร็จกรุณารอการติดต่อกลับจากเจ้าหน้าที่'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}