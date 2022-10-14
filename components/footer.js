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
    <footer className="w-full h-full">



        {!auth.user || auth.user.role !== "admin" ? <Newslatter></Newslatter> : <></>}

    </footer>
  )
}