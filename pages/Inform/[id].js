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

    function ConvertDate(date) {
        const data = new Date(date).toLocaleString("th-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    
        return data;
      }

    return(
        <div className="mb-5">
        <div className="mt-5">
            <Head>
                <title>{product.title}</title>
            </Head>
            <div className="flex flex-col bg-indigo-100  rounded-xl mx-4 sm:mx-4 md:mx-14 xl:mx-24 mt-24 lg:mt-28">
            <div className="text-capitalize font-bold text-3xl mt-[36px] ml-5 mr-5 mx-[20px] md:mx-[40px] xl:mx-[60px]">
            <div className="absolute left-2/2 -ml-0.5 w-1.5 rounded-md h-24 md:h-20 lg:h-20 bg-gray-600"></div>
            <div > <h1 className="font-blod text-lg md:text-2xl lg:text-3xl  ml-4">{product.title}</h1></div>
            </div>
            <div className="flex flex-col mx-4 sm:flex-col md:flex-col xl:flex-row sm:mx-4 md:mx-14 xl:mx-24 ">
                <div className='mx-3 md:mx-auto'>
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="img-thumbnail rounded mt-4 sm:mr-5 sm:max-w-100 sm:max-h-70 md:max-w-2xl md:max-h-fit xl:max-w-xl xl:max-h-fit" />

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
    
                <div className="my-2 text-base md:text-lg xl:text-lg ">{product.description}</div>
                <div className=" flex justify-end items-end font-bold xl:text-lg ">{ConvertDate(product.createdAt)} น.</div>
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