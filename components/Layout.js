import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './footer'
import VideoPlayer from "./VideoPlayer";


function Layout({children}) {
    return (
        < >
            <Notify />
            <Modal />
            <NavBar />
            <div className='container'>
            </div>
            {children} 
            
            <Footer />
        </>
    )
}

export default Layout
