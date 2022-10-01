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

            <div className="col-md-6">
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h2 className="text-uppercase">{product.en}</h2>
                      
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">ลำดับ</th>
                                <th scope="col">รายการ</th>
                                <th scope="col">อัตรา1(100%)</th>
                                <th scope="col">อัตรา2(75%)</th>
                                <th scope="col">อัตรา3(50%)</th>
                                <th scope="col">อัตรา4(นักวิจัย)</th>
                                <th scope="col">อัตรา5(บัณฑิต)</th>
                              
                                </tr>
                            </thead>
                            <tbody > 
                            {
                        product.nameRate.map((obj, i) => <Tr {...obj} key={i} />)
                             }
                            </tbody>
                            </table>

                <div className="my-2">{product.detailCapability}</div>
                <div className="my-2">
                    {product.detailRestrictions}
                </div>

                <button type="button" className="btn btn-dark d-block my-3 px-5"
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


function Tr({idx, ListName, price1, price2, price3, price4, price5 }){

   
let i = 1  

    return (
        <tr className="bg-gray-50 text-center">
        <td className="px-16 py-2 flex flex-row items-center">
            <span className="text-center ml-2 font-semibold">{}</span>
        </td>
        <td>
            <span></span>
        </td>
        <td >
            <span>{ListName || "Unknown"}</span>
        </td>
        <td >
            <span>{price1 || "-"}</span>
        </td>
        <td >
            <span>{price2 || "-"}</span>
        </td>
        <td >
        <span>{price3 || "-"}</span>
        </td>
         <td >
        <span>{price4 || "-"}</span>
        </td>
        <td >
        <span>{price5 || "-"}</span>
        </td>
     
     
    </tr>
    )
    i = i+1
}