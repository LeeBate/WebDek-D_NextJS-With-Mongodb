import React from 'react'

function VideoPlayer() {
  return (
  <>

  <section className='max-w-full max-h-full min-h-screen'>
    <div>
      <video
        autoPlay
        loop
        muted
        className="w-full aspect-video "
      >
        <source src="./introvideo.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
  </>
  )
}

export default VideoPlayer