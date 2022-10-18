import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from "next/router";

const DetailInform = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const router = useRouter();

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <div>
        <div className="row detail_page">
            <Head>
                <title>Detail Inform</title>
            </Head>
            <div className="text-capitalize font-bold text-3xl mx-[80px] my-5">
                <h1 className="text font-light text-xl ">{product.title}</h1>
            </div>
            <div className="flex flex-row bg-indigo-100 mx-24 rounded-xl">
                <div className='basis-4/10 ml-3'>
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 ml-4 max-w-xl max-h-fit" />

                <div className="row mx-0 mt-3 ml-2 " style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ml-3 ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}
                    </div>
                </div>
            
            <div className="basis-6/10 mx-5 my-4">
    
                <div className="my-2">{product.description}</div>
            </div>
        </div>
        </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`productNews/${id}`)
    // server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailInform