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
                    <a className="btn btn-info mt-2 w-full"
                    style={{marginRight: '5px', flex: 1}}>ดูข้อมูล</a>
                </Link>
                
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`createInfo/${product._id}`}>
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
                    Delete
                </button>
            </>
        )
    }

    return(
        // <div class="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
        //     <img className={`${sizeClasses.height} ${sizeClasses.width} flex-shrink-0`} src={product.images[0].url} alt={product.images[0].url} />
        //     <div className="px-6 py-0">
        //         <h5 className="text-lg font-semibold text-gray-800" title={product.title}>
        //             {product.title}
        //         </h5>
        //         <h5 className=" text-gray-700 text-base truncate" title={product.description}>
        //             {product.description}
        //         </h5>
                    
        //         <div className="row justify-content-between mx-0 ">
        //             {!auth.user || auth.user.role !== "admin" ? userLink() : userLink()}
        //         </div>
        //     </div>
            
        // </div>
        
          <div>
            <div class="bg-white rounded-xl shadow-xl  max-w-md mx-auto md:object-cover">
              <img
                class="w-full h-60 object-center object-cover rounded-t-xl  md:object-center md:object-cover "
                src={product.images[0].url} alt={product.images[0].url}
              />
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 line-clamp-2" title={product.title}>
                {product.title}
                </h2>
                <p class="mt-3 text-gray-700 line-clamp-2" title={product.description}>
                {product.description}
                </p>
               
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                
              </div>
            </div>
          </div>
        

    
        

        
    )
}


export default InformItem