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
                        {product.nameRate.map((e, r) => (
                        <h1 key={r} >
                        {e.ListName}
                        {e.price1}
                        {e.price2}
                        {e.price3}</h1>
                    ))}

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