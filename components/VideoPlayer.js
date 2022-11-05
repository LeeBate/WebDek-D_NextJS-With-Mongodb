import React from 'react'
import SwiperCore, { Autoplay } from "swiper";



function VideoPlayer() {    
  SwiperCore.use([Autoplay]);
  return (

    
    <div >
      <video
        autoPlay
        loop
        muted
        className=" aspect-video"
      >
        <source src="./introvideo.mp4" type="video/mp4" />
      <h1>CALLLAB</h1>
      </video>
    </div>


  )
}

export default VideoPlayer