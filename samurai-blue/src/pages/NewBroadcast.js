import React from 'react'
import {Link} from 'react-router-dom'

function NewBroadcast() {
  return (
    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5">
      <div className="flex justify-between">
        <div className="text-3xl tracking-widest font-light">New Broadcast</div>
          <input
            type="text"
            name="broadcast-title"
          id="broadcast-title"
          placeholder='Broadcast Title'
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      {/* <Link to="/sessions/new-broadcast" className="broadcast-btn flex bg-black text-white h-fit px-3 mx-3 py-2 gap-2 rounded-lg align-middle">
        <PlayIcon className="w-[16px] h-[20px]"></PlayIcon>
        <div className="text-sm text-semibold">New Broadcast</div>
      </Link> */}
      </div>
  )
}

export default NewBroadcast