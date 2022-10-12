
import Link from 'next/link'
import Newslatter from "./_child/newslatter";
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

export default function footer() {
  const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

  const bg = {
    backgroundImage : "url('/images/footer.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "bottom left"
  }

  return (
    <footer className="bg-gray-500" style={bg}>
      
      
      <div className="row justify-content-between mx-0 ">
        {!auth.user || auth.user.role !== "admin" ? <Newslatter></Newslatter> : <></>}
      </div>

    </footer>
  )
}