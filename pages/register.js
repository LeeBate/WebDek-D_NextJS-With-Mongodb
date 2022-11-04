import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'


const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '',avatar:'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password, avatar } = userData

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('auth/register', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
 
      dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }})
    

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
     
return dispatch({ type: 'NOTIFY', payload: {} })


  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>สมัครสมาชิก</title>
        </Head>
        <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
          <section className="vh-100 bg-[#f1f1f1]" >
            <div className="container py-0 h-100">
              <div className="row d-flex justify-center center h-100">
                <div className="col col-xl-9 col-lg-8 my-auto lg:mt-20">
                  <div className="card rounded-[1rem] mt-5" >
                    <div className="row g-0 items-center pl-4 py-4 ">
                      <div className="col-md-5 col-lg-5 d-none d-md-block">
                      <img src={"/images/puntest.png"}
                          className="transform transition duration-700 hover:scale-125 object-cover rounded-md "  />
                      </div>
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center mb-2 pb-1">
                          
                          <span className="h1 font-bold mb-0">สมัครสมาชิก</span>
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form2Example17">ชื่อ</label>
                          <input type="text" id="form2Example17" className="form-control form-control-lg" name="name" value={name} onChange={handleChangeInput} />
                          
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form2Example17">อีเมล์</label>
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleChangeInput} />
                        </div>

                        <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form2Example27">รหัสผ่าน</label>
                        <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={password} onChange={handleChangeInput} />
                        
                        </div>

                        <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form2Example27">ยืนยันรหัสผ่าน</label>
                        <input type="password" id="form2Example27" className="form-control form-control-lg" name="cf_password" value={cf_password}   onChange={handleChangeInput} />
                        
                        </div>
                        
                        <div className="pt-1 mb-2">
                        <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-[#0070BB] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#208BD4] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">สมัครสมาชิก
                        </button>
                        </div>
                        <div
                          className="flex items-center my-3 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                          <p className="text-center font-semibold mx-4 mb-0">หรือ</p>
                        </div>
                        
                        <p className="mb-0 pb-lg-2  " >ถ้าคุณมีบัญชีอยู่แล้วคลิกที่นี่!
                        <Link href="/signin">
                        <a className='text-blue-500' href="#!"
                            >  เข้าสู่ระบบ</a>
                        </Link>    
                        </p>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
      </div>
    )
  }
  
  export default Register