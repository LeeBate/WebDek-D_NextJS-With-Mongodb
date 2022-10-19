import React from 'react'
import SwiperCore, { Autoplay } from "swiper";

function VideoPlayer() {
    SwiperCore.use([Autoplay]);
  return (<>

  <section className='max-w-full mx-auto'>
    <div>
      <video
        autoPlay
        loop
        muted
        className="w-full h-full  aspect-video"
      >
        <source src="./intro.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
  </>
  )
}

export default VideoPlayer