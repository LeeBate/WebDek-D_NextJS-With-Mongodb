import connectDB from '../../../utils/connectDB'
import Informdata from '../../../models/TrackingModel'
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

        const product = await Informdata.findById(id)
        if(!product) return res.status(400).json({err: 'This product does not exist.'})
        
        res.json({ product })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query
        const {rnb, images, timeIn,timeOut,serviceNumber,reportNumber
            ,procedure,labPrint,ensure,checkReport,ensureReport
            ,reportLSU, lsu, lab, note, phone} = req.body

            if(!rnb || images.length === 0 || !timeIn ||!timeOut||!serviceNumber||!reportNumber
                ||!procedure||!labPrint||!ensure
                ||!checkReport||!ensureReport||!reportLSU
                ||!lsu ||!phone)
        return res.status(400).json({err: 'Please add all the fields.'})

        await Informdata.findOneAndUpdate({_id: id}, {
            rnb, images, timeIn,timeOut,serviceNumber,reportNumber
            ,procedure,labPrint,ensure,checkReport,ensureReport
            ,reportLSU, lsu, lab, note, phone
        })

        res.json({msg: 'Success! Updated a product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
        
    }
}


const deleteProduct = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query

        await Informdata.findByIdAndDelete(id)
        res.json({msg: 'Deleted a product.'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}