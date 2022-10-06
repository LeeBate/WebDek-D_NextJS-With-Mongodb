import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import {useRouter} from 'next/router'
import { v4 as uuidv4 } from 'uuid';

const ProductsManager = () => {
    const initialState = {
        title: '',
        en: '',
        brand: '',
        modelName: '',
        room: '',
        roomen: '',
        manager: '',
        detailCapability: '',
        detailRestrictions: '',
        category: ''
    }
    
    const [product, setProduct] = useState(initialState)
    const {title, en, brand, modelName, room,roomen, manager,
        detailCapability, detailRestrictions, category} = product

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
                setInputFields(res.product.nameRate)
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

        if(!title|| !en || !brand || !modelName || !room ||!roomen || !manager||
            !detailCapability || !detailRestrictions || category === 'all' || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields111.'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, nameRate:[...inputFields], images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, nameRate:[...inputFields],images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
    }

    const [inputFields, setInputFields] = useState([
        { idx: uuidv4(), ListName: '', price1: '',price2: '',price3: '',price4: '',price5: '', },
      ]);
    
        const handleChangeInput2 = async(idx, event) => {
            
            const newInputFields = inputFields.map(i => {
              if(idx === i.idx) {
                i[event.target.name] = event.target.value
             
              }
              return i;
            })
            setInputFields(newInputFields);
        }
        const handleAddFields = () => {
            setInputFields([...inputFields, {idx: uuidv4(), ListName: '', price1: '',price2: '',price3: '',price4: '',price5: '', }])
          }
    
          const handleRemoveFields = idx => {
            const values  = [...inputFields];
            values.splice(values.findIndex(value => value.idx === idx), 1);
            setInputFields(values);
          }

    return(
        <div className="products_manager">
            <Head>
                <title>การจัดการเครื่องมือ</title>
            </Head>
            <form className="col" onSubmit={handleSubmit}>
                <div className="col-md-9">
                    
                    <input type="text" name="title" value={title}
                    placeholder="ชื่อเครื่องมือ (ภาษาไทย)" className=" w-[100%] h-[50px] my-2 p-2 border-cyan-500 border-2"
                    onChange={handleChangeInput} />

                    <input type="text" name="en" value={en}
                    placeholder="ชื่อเครื่องมือ (ภาษาอังกฤษ)" className="text-capitalize d-block my-2 w-100 p-2 "
                    onChange={handleChangeInput} />

                    <input type="text" name="room" value={room}
                    placeholder="ชื่อห้องปฎิบัติการ (ภาษาไทย)" className="d-block my-2 w-100 p-2 "
                    onChange={handleChangeInput} />

                    <input type="text" name="roomen" value={roomen}
                    placeholder="ชื่อห้องปฎิบัติการ (ภาษาอังกฤษ)" className="d-block my-2 w-100 p-2 "
                    onChange={handleChangeInput} />

                    <input type="text" name="manager" value={manager}
                    placeholder="ชื่อผู้ดูแลเครื่องมือ" className="d-block my-2 w-100 p-2 "
                    onChange={handleChangeInput} />
                    
                    <div className="row gap-2">
                    <div className="col-sm">
                            <input type="text" name="modelName" placeholder="ยี่ห้อ" value={modelName} 
                            className="d-block my w-100 p-2 " onChange={handleChangeInput}/>
                    </div>
                    <div className="col-sm">
                            <input type="text" name="brand" placeholder="รุ่น" value={brand} 
                            className="d-block my w-100 p-2 " onChange={handleChangeInput}/>
                    </div>
                    </div>
                    
                    <div className='row gap-2'>
                     <textarea name="detailCapability" id="detailCapability" cols="30" rows="4"
                    placeholder="ความสามารถของเครื่องมือ" className="col-sm-6 my-2 p-2 border-cyan-500 border-2" 
                    value={detailCapability} onChange={handleChangeInput} />

                    <textarea name="detailRestrictions" id="detailRestrictions" cols="30" rows="6"
                    placeholder="ข้อจำกัดของเครื่องมือ" className="col my-2 p-2 border-cyan-500 border-2"
                    value={detailRestrictions} onChange={handleChangeInput} />

                    </div>
                    
                <label >อัตราค่าบริการ : บาท/ตัวอย่าง</label>
                           
                        { inputFields.map(inputField => (
                                <div key={inputField.idx} className="row g-8">

                        <div className='col-md'>
                        <input type="text"  name="ListName" 
                                            placeholder="ชื่อรายการ" className="d-block my-4 w-100 p-2"
                                            value={inputField.ListName}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />
                        </div>
                        <div className='col-sm'>
                        <input type="number" min="0" name="price1" 
                                            placeholder="อัตราที่ 1" className="d-block my-4 w-100 p-2"
                                            value={inputField.price1}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />
                        </div>
                        <div className='col-sm'>
                        <input type="number" min="0" name="price2" 
                                            placeholder="อัตราที่ 2" className="d-block my-4 w-100 p-2"
                                            value={inputField.price2}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />
                        </div>
                        <div className='col-sm'>
                        <input type="number" min="0" name="price3" 
                                            placeholder="อัตราที่ 3" className="d-block my-4 w-100 p-2"
                                            value={inputField.price3}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />
                        </div>
                        <div className='col-sm'>
                        <input type="number" min="0" name="price4" 
                                            placeholder="อัตราที่ 4" className="d-block my-4 w-100 p-2"
                                            value={inputField.price4}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />
                        </div>
                        <div className='col-sm'>
                        <input type="number" min="0" name="price5" 
                                            placeholder="อัตราที่ 5" className="d-block my-4 w-100 p-2"
                                            value={inputField.price5}
                                            onChange={event => handleChangeInput2(inputField.idx, event)} />

                    </div>   
                    <div className='flex flex-col'> 
                            <button className='btn btn-danger mx-3 ' disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.idx)}>
                            ลบช่อง
                            </button>
                        </div>
                        </div>
                        )) }     

                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput} className="custom-select text-capitalize">
                            <option value="all">งานเครื่องมือทั้งหมด</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-green-500 rounded">
                        {onEdit ? 'อัพเดต': 'สร้าง'}
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
            <button className='btn btn-info mx-3 ' onClick={handleAddFields}>
            เพิ่มช่อง
            </button>
            
        </div>
    )
}

export default ProductsManager