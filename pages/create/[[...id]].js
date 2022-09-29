import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import {useRouter} from 'next/router'

const ProductsManager = () => {
    const initialState = {
        title: '',
        en: '',
        brand: '',
        modelName: '',
        room: '',
        manager: '',
        detailCapability: '',
        detailRestrictions: '',
        price1: 0,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        category: ''
    }
    
    const [product, setProduct] = useState(initialState)
    const {title, en, brand, modelName, room, manager,
        detailCapability, detailRestrictions, price1, price2,
        price3, price4, price5, category} = product

    const [images, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 2024 * 2024)
            return err = 'The largest image size is 1mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(!title|| !en || !brand || !modelName || !room || !manager||
            !detailCapability || !detailRestrictions || !price1 || !price2 ||
            !price3 || !price4 || !price5 || category === 'all' || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        console.log(res)
    }

    return(
        <div className="products_manager">
            <Head>
                <title>Products Manager</title>
            </Head>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    
                    <input type="text" name="title" value={title}
                    placeholder="ชื่ออุปกรณ์ภาษาไทย" className="d-block my-2 w-100 p-2 text-gray-300"
                    onChange={handleChangeInput} />

                    <input type="text" name="en" value={en}
                    placeholder="ชื่ออุปกรณ์ภาษาอังกฤษ" className="d-block my-2 w-100 p-2 text-gray-300"
                    onChange={handleChangeInput} />

                    <input type="text" name="room" value={room}
                    placeholder="ชื่อห้องปฎิบัติการ" className="d-block my-2 w-100 p-2 text-gray-300"
                    onChange={handleChangeInput} />

                    <input type="text" name="manager" value={manager}
                    placeholder="ชื่อผู้ดูแลเครื่องมือ" className="d-block my-2 w-100 p-2 text-gray-300"
                    onChange={handleChangeInput} />
                    
                    <div className="row gap-2">
                    <div className="col-sm">
                            <input type="text" name="modelName" placeholder="ยี่ห้อ" value={modelName} 
                            className="d-block my w-100 p-2 text-gray-300" onChange={handleChangeInput}/>
                    </div>
                    <div className="col-sm">
                            <input type="text" name="brand" placeholder="รุ่น" value={brand} 
                            className="d-block my w-100 p-2 text-gray-300" onChange={handleChangeInput}/>
                    </div>
                    </div>
                    
                    <textarea name="detailCapability" id="detailCapability" cols="30" rows="4"
                    placeholder="ความสามารถของเครื่องมือ" className="d-block my-4 w-100 p-2" 
                    value={detailCapability} onChange={handleChangeInput} />

                    <textarea name="detailRestrictions" id="detailRestrictions" cols="30" rows="6"
                    placeholder="ข้อจำกัดของเครื่องมือ" className="d-block my-4 w-100 p-2" 
                    value={detailRestrictions} onChange={handleChangeInput} />

                <label >อัตราค่าบริการ : บาท/ตัวอย่าง</label>
                    <div className="row g-5">
                        <div className="col-sm">
                        <label htmlFor="price1">อัตรา 1 (100%)</label>
                            <input type="number" name="price1" value={price1} 
                            className="form-control" onChange={handleChangeInput}/>
                        </div>
                        <div className="col-sm">
                        <label htmlFor="price2">อัตรา 2 (75%)</label>
                            <input type="number" name="price2" value={price2} 
                            className="form-control" onChange={handleChangeInput}/>
                        </div>
                        <div className="col-sm">
                        <label htmlFor="price3">อัตรา 3 (50%)</label>
                            <input type="number" name="price3" value={price3} 
                            className="form-control" onChange={handleChangeInput}/>
                        </div>
                        <div className="col-sm">
                        <label htmlFor="price3">อัตรา 4 (นักวิจัย)</label>
                            <input type="number" name="price4" value={price4} 
                            className="form-control" onChange={handleChangeInput}/>
                        </div>
                        <div className="col-sm">
                        <label htmlFor="price5">อัตรา 5 (บัณฑิต)</label>
                            <input type="number" name="price5" value={price5} 
                            className="form-control" onChange={handleChangeInput}/>
                        </div>
                    </div>

                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput} className="custom-select text-capitalize">
                            <option value="all">All Products</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-info my-2 px-4">
                        {onEdit ? 'Update': 'Create'}
                    </button>

                </div>

                <div className="col-md-6 my-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                        </div>
                        <div className="custom-file border rounded">
                            <input type="file" className="custom-file-input"
                            onChange={handleUploadInput} multiple accept="image/*" />
                        </div>

                    </div> 

                    <div className="row img-up mx-0">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                     alt="" className="img-thumbnail rounded" />

                                     <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                        

                </div>

               
            </form>

            
        </div>
    )
}

export default ProductsManager