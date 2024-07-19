import React from 'react'
import loading from "/loading.mp4"

function Loading() {
  return (
    <div className=' h-screen w-full relative'>
     <div className=' text-white tracking-tight absolute top-[34vh] left-[73vh] '>
     <div>
      <video autoPlay muted loop src={loading}></video>
      </div>
      <h1>LOADING......</h1>
     </div>
    </div>
  )
}

export default Loading