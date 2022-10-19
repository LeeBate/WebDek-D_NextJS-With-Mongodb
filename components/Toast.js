import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import Swal from "sweetalert2"
const Toast = ({msg, handleShow, bgColor}) => { 

const {state, dispatch} = useContext(DataContext)

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          if(true)
          Toast.fire({
            icon: bgColor=="bg-danger" ?'error':'success',
            title: msg.title+" :  "+msg.msg
          }).then(()=>{
            dispatch({ type: 'NOTIFY', payload: {} })
          });
    
    return(<div>
    </div>)
}

export default Toast