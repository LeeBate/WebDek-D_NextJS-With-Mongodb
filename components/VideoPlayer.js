import React from 'react'
import SwiperCore, { Autoplay } from "swiper";



function VideoPlayer() {    
  SwiperCore.use([Autoplay]);
  return (

    
    <center >
      <div className="">
      
      <video
        autoPlay
        loop
        muted
        className=" w-full h-[50%] aspect-video"
      >
        
        <source src="./intro.mp4" type="video/mp4" />
      </video>
      {/* <div className="relative top-[-130px] left-0 right-0"> <span class="inline-block animate-bounce rounded-full p-4 bg-teal-400 text-white text-sm">
        <svg class="w-20 h-20 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
    </span>
      </div> */}
      
      
      </div>
     
      
    </center>


  )
}

export default VideoPlayer