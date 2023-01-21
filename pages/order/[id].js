import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import Link from 'next/link'
import OrderDetail from '../../components/OrderDetail'


const DetailOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const {orders, auth} = state
    console.log(state)

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
            
    if(!auth.user) return null;
    return(
        <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto ">
            <Head>
                <title>CALLLAB</title>
            </Head>

            <div className='mt-10'>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                </button>
            </div>
            
            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
        
        </div>
        </section>
    )
}

export default DetailOrder