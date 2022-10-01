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
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="flex flex-row">
                <div className='basis-4/10 ml-3'>
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 ml-3 max-w-xl max-h-fit" />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ml-3 ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}
                    </div>
                </div>
            

            <div className="basis-6/10 mx-5 my-4">
                <h1 className="text-capitalize font-bold text-2xl font-serif ">{product.en}</h1>
                <h2 className="text font-light text-xl ">{product.title}</h2>
                        
                <div className="my-2">{product.detailCapability}</div>
                <div className="my-2">
                    {product.detailRestrictions}
                </div>
                <br/>
                
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

                <button type="button" className="my-3 px-10 bg-white border-2 rounded border-green-800  text-green-800 hover:bg-red-500 hover:text-black hover:border-red-500 "
                >
                    จอง
                </button>
                <button type="button" className="btn btn-dark d-block my-3 px-5"
                onClick={() => dispatch(addToCart(product, cart))} >
                    จ่าย
                </button>
                <button type="button" className="btn btn-dark d-block my-3 px-5"
                 >
                    คำนวณอัตราค่าบริการ
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