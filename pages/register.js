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

            <section class="h-screen">
              <div class="container px-6 py-12 h-full">
                <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                  <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                      img src={"/images/puntest.png"}
                      class="w-[500px] h-[500px]"
                      alt="Phone image"
                    />
                  
                  </div>
                  <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form onSubmit={handleSubmit}>

                    <div class="mb-6">
                        <input
                          type="text"
                          class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="ชื่อ" name="name" value={name} onChange={handleChangeInput}
                        />
                      </div>

                      
                      <div class="mb-6">
                        <input
                          type="text"
                          class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="อีเมล์" name="email" value={email} onChange={handleChangeInput}
                        />
                        <small id="emailHelp" className="form-text text-muted">เราจะไม่แชร์อีเมลของคุณกับคนอื่นเด็ดขาด</small>
                      </div>

                    
                      <div class="mb-6">
                        <input
                          type="password"
                          class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="รหัสผ่าน" name="password" value={password} onChange={handleChangeInput}
                        />
                      </div>


                      <div class="mb-6">
                        <input
                          type="password"
                          class="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="ยืนยันรหัสผ่าน" name="cf_password" value={cf_password}   onChange={handleChangeInput}
                        />
                      </div>

                      <button
                        type="submit"
                        class="inline-block px-7 py-3 bg-indigo-900 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        สมัครสมาชิก
                      </button>

                      <div
                        class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                      >
                        <p class="text-center font-semibold mx-4 mb-0">หรือ</p>
                      </div>
                      <div class="flex items-center justify-between pb-6">
                        <p class="mb-0 mr-2">ถ้าคุณมีบัญชีอยู่แล้วคลิกที่นี้!</p>

                        <Link href="/signin">
                        <button
                          type="button"
                          class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          เข้าสู่ระบบ
                        </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
      </div>
    )
  }
  
  export default Register