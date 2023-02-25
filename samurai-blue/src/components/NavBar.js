import React from 'react'
import { Link } from 'react-router-dom'
import "./comp-styles.css"
import { BriefcaseIcon, PlayCircleIcon, ClipboardDocumentListIcon, ArchiveBoxIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"

function NavBar() {
  return (
    <div className='nav-container flex flex-col w-[245px] h-full tracking-wide gap-4 py-8 px-5 relative font-semibold'>
      <div className='nav-button flex p-2 gap-2'>
        <BriefcaseIcon className='w-[24px] h-[24px]'></BriefcaseIcon>
      <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className='nav-button flex p-2 gap-2'>
        <PlayCircleIcon className='w-[24px] h-[24px]'></PlayCircleIcon>
        <Link to="/sessions">Sessions</Link>
      </div>
      <div className='nav-button flex p-2 gap-2'>
        <ClipboardDocumentListIcon className='w-[24px] h-[24px]'></ClipboardDocumentListIcon>
        <Link to="/orders">Orders</Link>
      </div>
      <div className='nav-button flex p-2 gap-2'>
        <ArchiveBoxIcon className='w-[24px] h-[24px]'></ArchiveBoxIcon>
        <Link to="/products">Products</Link>
      </div>
      <div className='nav-button absolute  flex p-2 gap-2'>
        <Cog8ToothIcon className='w-[24px] h-[24px]'></Cog8ToothIcon>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  )
}

export default NavBar