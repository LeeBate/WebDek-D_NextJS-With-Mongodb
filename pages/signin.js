import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

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
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('auth/login', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    dispatch({ type: 'NOTIFY', payload: {} })

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
      
    }})
console.log(res.user)
    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>เข้าสู่ระบบ</title>
        </Head>
        <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
          <section className="vh-100 bg-[#f1f1f1]" >
            <div className="container py-0 h-100">
              <div className="row d-flex justify-center items h-100">
                <div className="col col-xl-9 col-lg-8 ">
                  <div className="card rounded-[1rem] mt-5" >
                    <div className="row g-0 items-center pl-4 py-4">
                      <div className="col-md-5 col-lg-5 d-none d-md-block">
                      <img src={"/images/puntest.png"}
                          className="transform transition duration-700 hover:scale-125 object-cover rounded-md "  />
                      </div>
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          
                          <span className="h1 font-bold mb-0">เข้าสู่ระบบ</span>
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17">อีเมล์</label>
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleChangeInput} />
                          
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">รหัสผ่าน</label>
                        <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={password} onChange={handleChangeInput}/>
                        
                        </div>
                        
                        <div className="pt-1 mb-4">
                        <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-[#0070BB] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#208BD4] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">เข้าสู่ระบบ
                        </button>
                        </div>
                        <div
                          className="flex items-center my-3 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                          <p className="text-center font-semibold mx-4 mb-0">หรือ</p>
                        </div>
                        
                        <p className="mb-5 pb-lg-2  " >ถ้าคุณยังไม่มีบัญชี?
                        <Link href="/register">
                        <a className='text-blue-500' href="#!"
                            >  สมัครที่นี่</a>
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
  
  export default Signin