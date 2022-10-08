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

        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ชื่อ</label>
            <input type="text" className="form-control" id="name"
            name="name" value={name} onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">อีเมล์</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email} onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">เราจะไม่แชร์อีเมลของคุณกับคนอื่นเด็ดขาด</small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">รหัสผ่าน</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput} />
          </div>

          <input type="text" hidden value={avatar} name="avatar" ></input>

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">ยืนยันรหัสผ่าน</label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password}   onChange={handleChangeInput} />
          </div>
         
            <button type="submit" className="btn btn-dark w-100">สมัครสมาชิก</button>
         
          

          <p className="my-2">
            ถ้าคุณมีบัญชีอยู่แล้วคลิกที่นี้! <Link href="/signin"><a style={{color: 'crimson'}}>เข้าสู่ระบบ</a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register