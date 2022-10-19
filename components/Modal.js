import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import {useRouter} from 'next/router'
import Swal from "sweetalert2"

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
            return router.push('/Inform')
        })
    } 

    const deleteSlide = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`slideimage/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/manageslide')
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

                if(item.type === 'DELETE_SLIDE') deleteSlide(item)
        
                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

    //   swalWithBootstrapButtons.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'No, cancel!',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //         handleSubmit()
    //       swalWithBootstrapButtons.fire(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //     } else if (
    //       /* Read more about handling dismissals below */
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) {
    //       swalWithBootstrapButtons.fire(
    //         'Cancelled',
    //         'Your imaginary file is safe :)',
    //         'error'
    //       )
    //     }
    //   })


    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
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
                <div className="modal-footer">
                    <button type="button" className="bg-green-500 hover:bg-green-400 px-4 text-white py-2 rounded-3xl" data-dismiss="modal" onClick={handleSubmit}>ยืนยัน</button>
                    <button type="button" className="bg-red-500 hover:bg-red-400 px-4 text-white py-2 rounded-3xl" data-dismiss="modal">ยกเลิก</button>
                </div>
                </div>
            </div>
        </div>



    )
}

export default Modal