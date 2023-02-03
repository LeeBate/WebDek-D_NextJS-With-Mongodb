import React from "react";
import SwiperCore, { Autoplay } from "swiper";

function VideoPlayer() {
  SwiperCore.use([Autoplay]);
  return (
    <center>
     
        <video autoPlay loop muted className=" w-full h-[50%] aspect-video">
          <source src="./intro.mp4" type="video/mp4" />
        </video>
      
    </center>
  );
}

export default VideoPlayer;
