import Head from 'next/head'

import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'
import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";

const index = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)
  const {auth} = state

  useEffect(() => {
    setProducts(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }



  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})
  }
  SwiperCore.use([Autoplay]);
  return(<div>
    <Head>
        <title>Index</title>
      </Head>
      <section>
      <div className='flex justify-center  p-50  opacity-100 '>
  <div className='flex text-center items-center absolute  w-[72rem] mt-96 h-900'>
<h1 className='text-5xl font-bold text-white '>ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
มหาวิทยาลัยเทคโนโลยีสุรนารี</h1>
</div>
</div>
</section>
  <section> 
    <div  >
    
     <video autoPlay loop muted className=" object-cover  w-screen h-[890px] ">
            <source
              src="./intro.mp4"
              type="video/mp4"
            />
          </video>
        
      

      {/* <Filter state={state} /> */}

      {/* {
        auth.user && auth.user.role === 'admin' &&
        <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
          <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
          style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />
        </div>
      }
      <div className="products"> */}

    
      </div>

</section>





<section className='  p-20'>
  <center>
<Swiper
    spaceBetween={20}
    navigation={true}
speed={700}
    pagination={{ clickable: true }}
    loop={true}
   effect={'fade'}
    slidesPerView={1}
    onSlideChange={() => console.log("slide change")}
    autoplay={{
      delay: 2000,
    
    }}>

        {

           products.map((product,index) => ( 
            <>
            <div >
             <SwiperSlide key={index}  >
            <Link href={"/"}><a><Image src={product.images[0].url}  width={800} height={400} className="mt-80" /></a></Link>   


            </SwiperSlide>
            </div>
            </>))
        }
    </Swiper>
  </center>
</section>
  </div>)
}

export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `slideimage?limit=${page * 100}&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default index
