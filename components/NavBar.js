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
    const [navbar, setNavbar] = useState(false);


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
        // dispatch({ type: 'NOTIFY', payload: {success: 'ออกจากระบบ!'} })
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
                <a className="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
        

<div>
      <nav className="w-full bg-indigo-900 bg-opacity-100 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/" >
           <img src={"/images/callab2.png"} className="rounded cursor-pointer" width={150} height={51.95}/>
           </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:underline">
                  <Link href="/machinery">
                    <a>เครื่องมือวิเคราะห์</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                  <Link href="#">
                    <a>บริการวิเคราะห์ทดสอบ</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                  <Link href="#">
                    <a>ติดตามผลการวิเคราะห์ทดสอบ</a>
                  </Link>
                </li>
                <li className="text-white hover:underline">
                
                    <div className="nav-link dropdown-toggle  " href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <a className="text-white cursor-pointer no-underline">เกี่ยวกับเรา</a>
                    </div>
                    
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/Inform">
                        <a className="dropdown-item">ข่าวประชาสัมพันธ์</a>
                    </Link><div className="dropdown-divider"></div>
                    <Link href="/profile">
                        <a className="dropdown-item">บุคลากร</a>
                    </Link><div className="dropdown-divider"></div>
                    <Link href="/contactemail">
                        <a className="dropdown-item">ติดต่อเรา</a>
                    </Link>
                    </div>
                   
                
                </li>
                
                <div className="hidden md:block text-white">|</div>
                  <ul className="text-white hover:underline">
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
                <Link href={"/"}><a><Image src={"/images/en.png"} className="rounded" width={26} height={26}/></a></Link>
                <Link href={"/"}><a><Image src={"/images/th.png"} className="rounded" width={30} height={30}/></a></Link>

              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center ">
      </div>
    </div>

    )
}

export default NavBar