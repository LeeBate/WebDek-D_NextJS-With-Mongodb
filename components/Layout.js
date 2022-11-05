import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Reserved from './Reserved'




function Layout({children}) {
    return (
        < >
            <Notify />
            <Modal />
            <NavBar />
            <div className='container'>
            </div>
            {children} 
            <Reserved/>
        </>
    )
}

export default Layout
