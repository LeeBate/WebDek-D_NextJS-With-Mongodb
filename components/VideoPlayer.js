import React from 'react'
import SwiperCore, { Autoplay } from "swiper";

function VideoPlayer() {
    SwiperCore.use([Autoplay]);
  return (<>
    <main className='w-full '>
      
        {/* Replace with your content */}
        
        <video
        autoPlay
        loop
        muted
        className=" object-cover  aspect-video "
      >
        <source src="./intro.mp4" type="video/mp4" />
      </video>
          
       
        {/* /End replace */}
      
    </main>
  </>
  )
}

export default VideoPlayer