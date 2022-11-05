import React from 'react'
import SwiperCore, { Autoplay } from "swiper";



function VideoPlayer() {    
  SwiperCore.use([Autoplay]);
  return (

    <div className='ParallaxVideo'>
    <div >
      <video
        autoPlay
        loop
        muted
        className=" aspect-video"
      >
        <source src="./introvideo.mp4" type="video/mp4" />
      </video>
      <h1>CALLLAB</h1>
    </div>
</div>
  )
}

export default VideoPlayer