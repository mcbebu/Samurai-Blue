import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./comp-styles.css"
import { ArrowLeftOnRectangleIcon, BriefcaseIcon, PlayCircleIcon, ClipboardDocumentListIcon, ArchiveBoxIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"


function NavBar() {
  const location = useLocation();
  return (
    <div className='nav-container flex flex-col w-[245px] h-full tracking-wide gap-5 py-9 px-8 relative font-semibold'>
      <div className='tracking-wider text-2xl m-2'>SampleName</div>
      <div className={`nav-button ${location.pathname.includes("/dashboard") ? "border-l-2" : ""}`}>
        <BriefcaseIcon className='w-[24px] h-[24px]'></BriefcaseIcon>
      <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className={`nav-button ${location.pathname.includes("/broadcasts") ? "border-l-2" : ""}`}>
        <PlayCircleIcon className='w-[24px] h-[24px]'></PlayCircleIcon>
        <Link to="/broadcasts">Broadcasts</Link>
      </div>
      <div className={`nav-button ${location.pathname.includes("/orders") ? "border-l-2" : ""}`}>
        <ClipboardDocumentListIcon className='w-[24px] h-[24px]'></ClipboardDocumentListIcon>
        <Link to="/orders">Orders</Link>
      </div>
      <div className={`nav-button ${location.pathname.includes("/products") ? "border-l-2" : ""}`}>
        <ArchiveBoxIcon className='w-[24px] h-[24px]'></ArchiveBoxIcon>
        <Link to="/products">Products</Link>
      </div>
      <div className='bottom-icons absolute bottom-8 left-5'>

      <div className={`nav-button ${location.pathname.includes("/settings") ? "border-l-2" : ""}`}>
        <Cog8ToothIcon className='w-[24px] h-[24px]'></Cog8ToothIcon>
        <Link to="/settings">Settings</Link>
        </div>
        <div className={`nav-button ${location.pathname.includes("/login") ? "border-l-2" : ""}`}>
        <ArrowLeftOnRectangleIcon className='w-[24px] h-[24px]'></ArrowLeftOnRectangleIcon>
        <Link to="/login">Logout</Link>
      </div>
      </div>
    </div>
  )
}

export default NavBar