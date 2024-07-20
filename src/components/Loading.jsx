import React from 'react'
import loading from "/loading.mp4"

function Loading() {
  return (
    <div className=' h-full w-full flex justify-center items-center '>
      <div className=' w-[35%] rounded-lg h-[50%] bg-[#6556CD] flex items-center justify-center'>
      
        <div>
        <div className=' flex gap-8 '>
        <video autoPlay muted loop src={loading}></video>
        <video autoPlay muted loop src={loading}></video>
        </div>
        <h1 className=' text-center py-2 font-semibold text-[3vh] tracking-tighter text-white'>Loading....</h1>

        <div className='flex gap-8'>
        <video autoPlay muted loop src={loading}></video>
        <video autoPlay muted loop src={loading}></video>
        </div>
        </div>

      </div>
    
    </div>
  )
}

export default Loading