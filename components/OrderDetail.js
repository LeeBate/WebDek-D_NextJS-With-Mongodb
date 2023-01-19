import Link from 'next/link'
import PaypalBtn from './paypalBtn'
import {patchData} from '../utils/fetchData'
import {updateItem} from '../store/Actions'

const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders} = state

    const handleDelivered = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            const { paid, dateOfPayment, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, delivered
            }, 'ADD_ORDERS'))

            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    if(!auth.user) return null;
    return(
        <>
        {
            orderDetail.map(order => (
            <div key={order._id} style={{margin: '100px auto'}} className="row justify-content-around">

                <div className="text-uppercase my-3 " style={{maxWidth: '600px'}}>
                    <h2 className="text-break">Order {order._id}</h2>

                    <div className="mt-4 text-secondary">
                        <h3>ข้อมูลการจอง</h3>
                        <p>ชื่อ: {order.user.name}</p>
                        <p>อีเมล: {order.user.email}</p>
                        {/* <p>titme: {product.title}</p>
                        <p>Mobile: {order.mobile}</p> */}

                        <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.delivered ? `ยืมยันเมื่อ ${order.updatedAt}` : 'รอการติดต่อเพื่ออนุมัติ'
                            }
                            {
                                auth.user.role === 'admin' && !order.delivered &&
                                <button className="btn btn-dark text-uppercase"
                                onClick={() => handleDelivered(order)}>
                                    ยืนยันการจอง
                                </button>
                            }
                            
                        </div>

                        <h3>การชำระเงิน</h3>
                        {
                            order.method && <h6>Method: <em>{order.method}</em></h6>
                        }
                        
                        {
                            order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                        }
                        
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.paid ? `ชำระเงินเมื่อ ${order.dateOfPayment}` : 'ยังไม่ได้ชำระเงิน'
                            }
                            
                        </div>

                        {/* <div>
                            <h3>Order Items</h3>
                            {
                                showBooking.map(item => (
                                    <div className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center" key={item._id} style={{maxWidth: '550px'}}>
                                        <img src={item.images[0].url} alt={item.images[0].url}
                                        style={{width: '50px', height: '45px', objectFit: 'cover'}} />

                                        <h5 className="flex-fill text-secondary px-3 m-0">
                                            <Link href={`/product/${item._id}`}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </h5>

                                        <span className="text-info m-0">
                                            {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                        </span>

                                    </div>
                                ))
                            }
                        </div> */}

                    </div>

                </div>
                            
                {
                    !order.paid && auth.user.role !== 'admin' &&
                    <div className="p-4">
                        <h2 className="mb-4 text-uppercase">Total: ${order.total}</h2>
                        <PaypalBtn order={order} />
                    </div>
                }
               
            </div>
            ))
        }
        </>
    )
}

export default OrderDetail