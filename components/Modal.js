import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import {useRouter} from 'next/router'
import { Divider } from '@mui/material'

const Modal = () => {
    const {state, dispatch} = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

    const deleteUser = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))
        
        deleteData(`user/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const  deleteCategories =   (item) => {
        deleteData(`categories/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch(deleteItem(item.data, item.id, item.type))
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const deleteProduct = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`product/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/Admin/createProduct')
        })
    }    
    
    const deleteProduct1 = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`productNews/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/Admin/createInfo')
        })
    } 

    const deleteTrack = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`tracking/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/Admin/Tracking')
        })
    }
  const deleteFav = (item) => {
    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`favorite/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
       return    dispatch({type: 'NOTIFY', payload: {success: res.msg}})
          
               //router.push(`/product/${item.pid}`)
          //  return  router.replace(router.asPath);
        })
    }
    const deleteBooking = (item) => {
    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`bookingApi/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
          dispatch({type: 'NOTIFY', payload: {success: res.msg}})
          return router.replace(router.asPath);
               //router.push(`/product/${item.pid}`)
          //  return  router.replace(router.asPath);
        })
    }


    const handleSubmit = () => {
        if(modal.length !== 0){
            for(const item of modal){
                if(item.type === 'ADD_CART'){
                    dispatch(deleteItem(item.data, item.id, item.type))
                }

                if(item.type === 'ADD_USERS') deleteUser(item)
        
                if(item.type === 'ADD_CATEGORIES') deleteCategories(item)
        
                if(item.type === 'DELETE_PRODUCT') deleteProduct(item)

                if(item.type === 'DELETE_PRODUCTS') deleteProduct1(item)

                if(item.type === 'DELETE_SLIDE') deleteTrack(item)  
                
                if(item.type === 'DELETE_FAV') deleteFav(item)

                if(item.type === 'DELETE_Booking') deleteBooking(item)
        
                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }


    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog mt-[20%]" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-capitalize" id="exampleModalLabel">
                        {modal.length !== 0 && modal[0].title}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    ต้องการลบข้อมูลใช่ไหม?
                </div>
                <Divider/>
                <div className="modal-footer mx-auto">
                    <button type="button" className="bg-green-600 hover:bg-green-400 px-4 text-white py-2 rounded-lg" data-dismiss="modal" onClick={handleSubmit}>ยืนยัน</button>
                    <button type="button" className="bg-red-600 hover:bg-red-400 px-4 text-white py-2 rounded-lg" data-dismiss="modal">ยกเลิก</button>
                </div>
                </div>
            </div>
        </div>



    )
}

export default Modal