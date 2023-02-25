import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5">
      <div className="flex justify-between align-middle">
      <div className="text-3xl tracking-widest font-light">Dashboard</div>
      <Link to="/broadcasts/new-broadcast" className="broadcast-btn flex bg-black text-white h-fit px-3 mx-3 py-2 gap-2 rounded-lg align-middle">
        <PlayIcon className="w-[16px] h-[20px]"></PlayIcon>
        <div className="text-sm text-semibold">New Broadcast</div>
      </Link>
      </div>
      <div className="w-[70%] h-[30%] rounded-xl shadow-lg p-6">Revenue</div>
    </div>
  );
}

export default Dashboard;
