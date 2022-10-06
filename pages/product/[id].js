import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <div>
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>
            <div className="text-capitalize font-bold text-3xl mx-[80px] my-5">
            <h1>{product.en}</h1>
            <h2 className="text font-light text-xl ">{product.title}</h2>
            </div>
            <div className="flex flex-row bg-indigo-100 mx-24 rounded-xl">
                <div className='basis-4/10 ml-3'>
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded-xl mt-4 ml-3 max-w-xl max-h-fit" />

                <div className="row mx-0 mb-4 mt-3" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ml-3 ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}
                    </div>
                </div>
            

            <div className="basis-6/10 mx-5 my-4">
                {/* <h1 className="text-capitalize font-bold text-2xl font-serif ">{product.en}</h1>
                <h2 className="text font-light text-xl ">{product.title}</h2> */}
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p className="my-2 font-bold">ยี่ห้อ : </p><p className="my-2 ml-[8px]">{product.brand}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="my-2 font-bold">รุ่น : </p><p className="my-2 ml-[8px]">{product.modelName}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                <div className="flex flex-row">
                <p className="my-2 font-bold">ห้องปฏิบัติการ (ภาษาไทย) : </p><p className="my-2 ml-[8px]">{product.room}</p>
                </div>
                <div className="flex flex-row">
                <p className="my-2 font-bold">ห้องปฏิบัติการ (ภาษาอังกฤษ) : </p><p className="my-2 ml-[8px]">{product.roomen}</p>
                </div>
                <div className="flex flex-row">
                <p className="my-2 font-bold">ผู้ดูแลเครื่องมือ : </p><p className="my-2 ml-[8px]">{product.manager}</p>
                </div>
                <p className="my-2 font-bold">รายละเอียดเครื่องมือ :</p>
                
                </div>
                <div className="grid gap-4 grid-cols-2 grid-flow-col">
                    <div>
                <p className="font-semibold">ความสามารถของเครื่องมือ</p>
                <p>{product.detailCapability}</p>
                    </div>
                    <div>
                <p className="font-semibold">ข้อจำกัดของเครื่องมือ</p> 
                <p>{product.detailRestrictions}</p>
                    </div>
                </div>
               
                <br/>
            </div>
            
        </div>
        <div className="text-2xl mx-24 mt-14 mb-2">
            <p>อัตราค่าบริการ : บาท/ชั่วโมง (Baht / Hour)</p>
        </div>
        <div className="flex items-center w-full mx-24">
        <table class="table table-bordered">
                            <thead>
                                <tr className='text-center'>
                                <th >ลำดับ</th>
                                <th >รายการ</th>
                                <th >อัตรา1<br/>(100%)</th>
                                <th >อัตรา2<br/>(75%)</th>
                                <th >อัตรา3<br/>(50%)</th>
                                <th >อัตรา4<br/>(นักวิจัย)</th>
                                <th >อัตรา5<br/>(บัณฑิต)</th>

                                </tr>
                            </thead>
                            <tbody > 
                            {
                        product.nameRate.map((obj, i) => (
                            <tr key={i} className="bg-gray-50 text-center">
                                  <td >
                                <span>{i+1 || "-"}</span>
                            </td>
                            <td >
                                <span>{obj.ListName ||  "Unknown"}</span>
                            </td>
                            <td >
                                <span>{obj.price1 ||  "-"}</span>
                            </td>
                            <td >
                                <span>{obj.price2 ||  "-"}</span>
                            </td>
                            <td >
                            <span>{obj.price3 ||  "-"}</span>
                            </td>
                             <td >
                            <span>{obj.price4 ||  "-"}</span>
                            </td>
                            <td >
                            <span>{obj.price5 || "-"}</span>
                            </td>

                        </tr>
                            ) )}

                            </tbody>
                            </table>     
            </div> 
        </div>
        <div className="flex mb-5  justify-between items-center">
            
             <p className="ml-[80px]">หมายเหตุ : เฉพาะเจ้าหน้าที่ทดสอบ ติดต่อสอบถามโดยตรงกับเจ้าหน้าที่</p>
             <div className="mr-[72px]">
                <button type="button" className="px-4 py-2 rounded-xl bg-indigo-900 text-white border-2 mr-2 ml-[265px]">
                ติดต่อขอรับบริการ
                </button>
                <button type="button" className="px-4 py-2 rounded-xl bg-green-700 text-white border-2 mr-2">
                จองเข้าใช้เครื่องมือ
                </button>
                <button type="button" className="px-4 py-2 rounded-xl bg-gray-400 text-white border-2 mr-2">
                รายการโปรด
             </button>
             </div>
        </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct