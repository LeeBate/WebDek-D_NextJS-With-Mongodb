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
        const { images,timeOut
            ,procedure,labPrint,ensure,checkReport,ensureReport
            ,reportLSU, lsu, lab, note, phone,sntime,repList ,serviceNumber,
            repListDate,lastedit} = req.body

        //     if( images.length === 0  ||!timeOut||!serviceNumber
        //         ||!procedure||!labPrint||!ensure
        //         ||!checkReport||!ensureReport||!reportLSU
        //         ||!lsu ||!phone)
        // return res.status(400).json({err: 'Please add all the fields.'})

        await Informdata.findOneAndUpdate({_id: id}, {
            images,timeOut
            ,procedure,labPrint,ensure,checkReport,ensureReport
            ,reportLSU, lsu, lab, note, phone,sntime,repList ,serviceNumber:serviceNumber.toUpperCase(),
            repListDate,lastedit
        })

        res.json({msg: 'แก้ไขข้อมูลสำเร็จ!'})
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