import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './footer'


function Layout({children}) {
    return (
        < >
            <NavBar />
            <div className="container">
            <Notify />
            <Modal />
            <div className="">{children}</div>
            </div>
        </>
    )
}

export default Layout
