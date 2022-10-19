import React from 'react'
import SwiperCore, { Autoplay } from "swiper";

function VideoPlayer() {
    SwiperCore.use([Autoplay]);
  return (<>
    {/* <section>
    <div className="flex justify-center  p-50  opacity-100 ">
      <div className="flex text-center items-center absolute  w-[72rem] mt-96 h-900">
        <h1 className="text-5xl font-bold text-white ">
          ฝ่ายวิเคราะห์ด้วยเครื่องมือ ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี
          มหาวิทยาลัยเทคโนโลยีสุรนารี
        </h1>
      </div>
    </div>
  </section> */}
  <section>
    <div>
      <video
        autoPlay
        loop
        muted
        className="w-full h-full aspect-video"
      >
        <source src="./intro.mp4" type="video/mp4" />
      </video>

      {/* <Filter state={state} /> */}

      {/* {
    auth.user && auth.user.role === 'admin' &&
    <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
      <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
      style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />
    </div>
  }
  <div className="products"> */}
    </div>
  </section>
  </>
  )
}

export default VideoPlayer