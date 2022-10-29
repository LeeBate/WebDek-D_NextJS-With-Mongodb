import React from 'react'
import SwiperCore, { Autoplay } from "swiper";

function VideoPlayer() {
    SwiperCore.use([Autoplay]);
  return (<>

  <section className='max-w-full'>
    <div>
      <video
        autoPlay
        loop
        muted
        className="w-full max-h-[50%] aspect-video"
      >
        <source src="./introvideo.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
  </>
  )
}

export default VideoPlayer