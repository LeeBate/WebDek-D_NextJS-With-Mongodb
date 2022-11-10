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
       
            <Head>
                <title>{product.title}</title>
            </Head>
           

{/* <div class="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 mt-28 mx-auto bg-indigo-100 w-[90%] h-auto p-3 gap-6">
  <div class=" col-span-5">
     
  <div class=" my-auto bg-red-300 col-span-3 lg:col-span-5 "> 
        <div className="text-capitalize font-bold text-4xl ">
                  <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
                    {product.title}
                  </h1>
               
        </div>
    </div>

    </div>
 <div class=" col-span-2 bg-red-300 row-span-3"> 

  <img  src={product.images[tab].url}
        alt={product.images[tab].url}
        className=" object-fill py-3 rounded h-[80%] max-h-[589px] w-auto mx-auto "/>

    <div className="" style={{ cursor: "pointer" }}>
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.url}
                    className={`img-thumbnail rounded ml-2 mb-2 h-12 md:h-18 xl:-h-18 w-20 xl:min-h-[64px] ${isActive(
                      index
                    )}`}
                    // style={{height: '60px', width: '80px'}}
                    onClick={() => setTab(index)}
                  />
                ))}
                
              </div>
</div> 
  <div class=" col-span-3 bg-red-300 row-span-3">
  <div className="my-2 text-base md:text-lg xl:text-lg whitespace-pre-line">{product.description}</div>
                <div className=" flex justify-end items-end font-bold xl:text-lg ">{ConvertDate(product.createdAt)} น.</div>
  </div>

</div>
 */}




<div class="grid bg-[#e0e7ff] pb-8 rounded-md  mt-28 mx-auto w-[95%] content-center    grid-cols-1 lg:grid-cols-5 grid-rows-5  px-4 lg:px-8  h-auto gap-4">
 
 
  <div class=" my-auto col-span-3  lg:col-span-5 "> 
        <div className="text-capitalize font-bold text-4xl ">
                  <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl ">
                  {product.title}
                  </h1>
              
        </div>
 </div>

    
  <div class=" col-span-2 pb-0 xl:pb-3 max-h-[589px]  rounded-md row-span-4">
   
    {/* <div className="grid grid-cols-1 bg-red-400 grid-rows-7 w-full h-full"> */}
       {/* <div class=" h-full w-full row-span-5"> */}
        <img  src={product.images[tab].url}
        alt={product.images[tab].url}
        className=" object-fill py-3 rounded h-[80%] max-h-[589px] w-auto mx-auto "/>
        {/* </div> */}
        {/* <div class="h-full w-full row-span-2"> */}
        <div className="row mx-0 mt-3 mb-4" style={{cursor: 'pointer'}} >

{product.images.map((img, index) => (
    <img key={index} src={img.url} alt={img.url}
    className={`img-thumbnail rounded h-[60px] w-[83px] mx-[2px] md:h-24 md:w-40 ${isActive(index)}`}
    // style={{height: '60px', width: '80px'}}
    onClick={() => setTab(index)} />
))}
</div>
        {/* </div> */}
    {/* </div> */}

  </div>
  <div class="col-span-3  row-span-4">
    

  <div>
      
        <p className="text-sm whitespace-pre-line md:text-lg">{product.description}</p>
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