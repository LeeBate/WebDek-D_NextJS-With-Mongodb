import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const InformItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`Inform/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>ดูข้อมู,</a>
                </Link>
                {/* <button className="btn btn-success"
                style={{marginLeft: '5px', flex: 1}}
                disabled={product.inStock === 0 ? true : false} 
                onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button> */}
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`/Admin/createInfo/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>แก้ไข</a>
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft: '5px', flex: 1}}
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCTS' 
                    }]
                })} >
                    ลบข้อมูล
                </button>
            </>
        )
    }
    return(
        <div className="transform transition duration-700 hover:shadow-2xl card bg-sky-100/75" style={{ width: '18rem' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(product._id)} />
            }
            <Link href={`Inform/${product._id}`}>
            <img className="aspect-square card-img-top object-fill cursor-pointer " src={product.images[0].url} alt={product.images[0].url} />
            </Link>
            <div className="card-body">
                <h5 className=" card-title font-bold text-xl mb-2 text-capitalize" title={product.title}>
                    {product.title}
                </h5>
                <h5 className="card-title text-capitalize" title={product.description}>
                    {product.description}
                </h5>
                    
                <div className="row justify-content-between mx-0 ">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    
        

        
    )
}


export default InformItem