import connectDB from '../../../utils/connectDB'
import Products from '../../../models/BookingModel'
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
        
        const {id} = req.query
        const {email, fullname,studentID,phone,dateBooking,dateBookingEnd, prodid,userid, statusBooking,price} = req.body

        if(!email || !fullname ||!phone ||!dateBooking ||!dateBookingEnd || !studentID)
        return res.status(400).json({err: 'โปรดกรอกข้อมูลให้ครบถ้วนทุกช่อง'})

        await Products.findOneAndUpdate({_id: id}, {
            email, fullname,studentID,phone,dateBooking,dateBookingEnd, prodid,userid, statusBooking,price
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
        res.json({msg: 'ลบข้อมูลการจองสำเร็จ.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}