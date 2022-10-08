import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>ดูข้อมูล</a>
                </Link>
                <button className="btn btn-success"
                >
                    จองเครื่องมือ
                </button>
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`create/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>แก้ไขข้อมูล</a>
                </Link>
                <button className="btn btn-danger"
                style={{marginLeft: '5px', flex: 1}}
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT' 
                    }]
                })} >
                    ลบข้อมูล
                </button>
            </>
        )
    }
    return(
        <div className="card bg-sky-100/75" style={{ width: '18rem' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(product._id)} />
            }
            <Link href={`/product/${product._id}`}>
            <img className="card-img-top cursor-pointer" src={product.images[0].url} alt={product.images[0].url} />
            </Link>
            <div className="card-body">
                <h5 className="card-title font-bold text-xl mb-2 text-capitalize" title={product.en}>
                    {product.en}
                </h5>
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>
                    
                <div className="row justify-content-between mx-0 ">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </div>

    )
}


export default ProductItem