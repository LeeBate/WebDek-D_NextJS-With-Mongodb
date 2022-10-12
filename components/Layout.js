import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './footer'

function Layout({children}) {
    return (
        <div >
            <NavBar />
            <Notify />
            <Modal />
            <div className="">{children}</div>
            <Footer/>
        </div>
    )
}

export default Layout
