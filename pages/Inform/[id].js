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
        <div className="mb-5">
        <div className="mt-5">
            <Head>
                <title>Detail Inform</title>
            </Head>
            <div className="flex flex-col bg-indigo-100  rounded-xl mx-4 sm:mx-4 md:mx-14 xl:mx-24">
            <div className="text-capitalize font-bold text-3xl mt-[36px] ml-5 mr-5 mx-[20px] md:mx-[40px] xl:mx-[60px]">
                <h1 className="text font-blod text-base md:text-lg  ">{product.title}</h1>
            </div>
            <div className="flex flex-col mx-4 sm:flex-col md:flex-col xl:flex-row sm:mx-4 md:mx-14 xl:mx-24 ">
            
                <div className='mx-3 md:mx-auto'>
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="img-thumbnail rounded mt-4 sm:mr-5 sm:max-w-xs sm:max-h-xs md:max-w-2xl md:max-h-fit xl:max-w-xl xl:max-h-fit" />

                <div className="row mx-0 mt-3 mb-4" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded h-[60px] w-[83px] mx-[2px] md:h-24 md:w-40 ${isActive(index)}`}
                        // style={{height: '60px', width: '80px'}}
                        onClick={() => setTab(index)} />
                    ))}
                    </div>
                </div>
            
            <div className=" mx-3 sm:mx-2 md:mx-3 xl:mx-5 mt-3 mb-4">
    
                <div className="my-2 text-base xl:text-lg ">{product.description}</div>
            </div>
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