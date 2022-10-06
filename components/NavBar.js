import { useState } from 'react'
import React, { useContext  } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'
import Image from 'next/image'

function NavBar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth, cart } = state



    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'ออกจากระบบ!'} })
        return router.push('/')
    }

    const adminRouter = () => {
        return(
            <>
            <Link href="/users">
                <a className="dropdown-item">จัดการผู้ใช้</a>
            </Link>
            <Link href="/createslide">
                <a className="dropdown-item">จัดการสไลด์บาร์</a>
            </Link>
            <Link href="/create">
                <a className="dropdown-item">จัดการเครื่องมือ</a>
            </Link>
            <Link href="/createInfo">
                <a className="dropdown-item">จัดการข่าวสาร</a>
            </Link>
            <Link href="/categories">
                <a className="dropdown-item">จัดการหมวดหมู่เครื่องมือ</a>
            </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '50px', height: '50px',
                        transform: 'translateY(-3px)', marginLeft: '30px'
                    }} />
                    
                    {auth.user.name}
                    
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">โปรไฟล์</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>ออกระบบ</button>
                </div>

            </li>
        )
    }
    

    return(
        
	<div className="bg-indigo-900 bg-opacity-100 shadow">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-1">
      <Link  href="/" >
            <Image src="/images/CALLLAB.png" alt="logo" width={150} height={100} className="cursor-pointer " />
      </Link>

        <div className="hidden sm:flex sm:items-center">
          <a href="/machinery" className="text-white text-xl font-semibold hover:text-purple-600 mr-4">เครื่องมือวิทยาศาสตร์</a>
          <a href="#" className="text-white text-xl font-semibold hover:text-purple-600 mr-4">บริการวิเคราะห์ทดสอบ</a>
          <a href="#" className="text-white text-xl font-semibold hover:text-purple-600 mr-4">ติดตามผลการวิเคราะห์ทดสอบ</a>
          <a href="/Inform" className="text-white text-xl font-semibold hover:text-purple-600 mr-4">เกี่ยวกับเรา</a>
          <a href="/contactemail" className="text-white text-xl font-semibold hover:text-purple-600 mr-4">ติดต่อเรา</a>
          <div className="divide-x-2 ">
          
          <Link href={"/"}><a><Image src={"/images/en.png"} className="rounded " width={26} height={26}/></a></Link> 
          <Link href={"/"}><a><Image src={"/images/th.png"} className="rounded" width={30} height={30}/></a></Link>
          </div>
        </div>

        <div className="hidden sm:flex sm:items-center">
        <ul className="text-gray-50 text-sm font-semibold ">
                     {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item">
                            <Link href="/signin">
                                <a className={"nav-link" + isActive('/signin')}>
                                    <i className="fas fa-user" aria-hidden="true"></i> เข้าสู่ระบบ
                                </a>
                            </Link>
                        </li>
                        : loggedRouter()
                    }
                </ul>
        </div>
      </div>

    </div>
  </div>

    )
}

export default NavBar