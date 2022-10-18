import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './footer'
import VideoPlayer from "./VideoPlayer";


function Layout({children}) {
    return (
        < >
            <NavBar />
            <Notify />
            <Modal />
            <div >{children}</div>
            <Footer />
        </>
    )
}

export default Layout
