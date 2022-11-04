import React from 'react'
import SwiperCore, { Autoplay } from "swiper";



function VideoPlayer() {    
  SwiperCore.use([Autoplay]);
  return (
  <div>
    <div class="ParallaxVideo">
      <video
        autoPlay
        loop
        muted
        
      >
        <source src="./introvideo.mp4" type="video/mp4" />
      </video>
      <h1>Video Background</h1>
    </div>
  </div>
  )
}

export default VideoPlayer