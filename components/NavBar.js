import React, { useContext } from 'react'
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
            <Link href="/create">
                <a className="dropdown-item">จัดการเครื่องมือ</a>
            </Link>
            <Link href="/createInfo">
                <a className="dropdown-item">จัดการข่าวสาร</a>
            </Link>
            <Link href="/categories">
                <a className="dropdown-item">จัดการหมวดหมู่</a>
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
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }} /> {auth.user.name}
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

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            
            <Link  href="/">
                {/* <a className="navbar-brand">CALLLAB</a> */}
                <Image src="/CALLLAB.png" alt="logo" width={150} height={70} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
            <li class="nav-item">
            <a className='text-red-500' aria-current="page" href="/machinery">เครื่องมือวิทยาศาสตร์</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">บริการวิเคราะห์ทดสอบ</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">ติดตามผลการวิเคราะห์ทดสอบ</a>
            </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-current="page" >
            เกี่ยวกับเรา
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav ">
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
            
        </nav>
    )
}

export default NavBar
