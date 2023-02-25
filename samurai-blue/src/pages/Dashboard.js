import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex flex-col w-full font-opensans">
      <div className="flex justify-between align-middle p-12">
      <div className="text-2xl tracking-wider">Dashboard</div>
      <Link to="/sessions/new-broadcast" className="broadcast-btn flex bg-black text-white h-fit px-3 py-2 gap-2 rounded-lg align-middle">
        <PlayIcon className="w-[16px] h-[20px]"></PlayIcon>
        <div className="text-sm text-semibold">New Broadcast</div>
      </Link>
      </div>
    </div>
  );
}

export default Dashboard;
