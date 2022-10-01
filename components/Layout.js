import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'

function Layout({children}) {
    return (
        <div >
            <NavBar />
            <Notify />
            <Modal />
            <div className="container-fluid">{children}</div>
        </div>
    )
}

export default Layout
