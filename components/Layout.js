import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Reserved from './Reserved'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import ScrollToTop from './ScrollToTop'
import PublicLayout from './layouts/PublicLayout'




function Layout({children}) {
    const { state, dispatch } = useContext(DataContext)
    const {  auth } = state
    return (
        < >
        <ScrollToTop/>
            <Notify />
            <Modal />
           
            <NavBar /> 
            <div className='container'>
            </div>
            {children} 
            <PublicLayout>
                <h1 className=' text-3xl font-bold font-open'>
                    Next.js cookie consent banner
                </h1>
            </PublicLayout>
            <Reserved/>
        </>
    )
}

export default Layout
