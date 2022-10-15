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
            <div className="container">
            <Notify />
            <Modal />
            <div >{children}</div>
            </div>
            <Footer />
        </>
    )
}

export default Layout
