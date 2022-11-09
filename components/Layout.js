import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Reserved from './Reserved'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import ScrollToTop from './ScrollToTop'




function Layout({children}) {
    const { state, dispatch } = useContext(DataContext)
    const {  auth } = state
    return (
        < >
        <ScrollToTop/>
            <Notify />
            <Modal />
            <div>
            {!auth.user || auth.user.role !== "admin" ? <NavBar /> : <></>}
            </div>
            {/* <NavBar />  */}
            <div className='container'>
            </div>
            {children} 
            <Reserved/>
        </>
    )
}

export default Layout
