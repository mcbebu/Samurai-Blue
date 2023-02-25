import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
          <div className="flex flex-col w-screen h-screen overflow-auto font-opensans py-16 px-12 gap-5 colored-bg">
      <div className="flex justify-between align-middle relative">
        <div className="page-heading w-full pb-3 border-b-2">Dashboard</div>
    
        <Link
          to="/broadcasts/new-broadcast"
          className="broadcast-btn flex bg-black text-white px-3 mx-3 py-2 gap-2 rounded-lg absolute right-0"
        >
          <PlayIcon className="w-[16px] h-[20px]"></PlayIcon>
          <div className="text-sm text-semibold">New Broadcast</div>
        </Link>
      </div>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="revenue flex-1 h-[270px] bg-white rounded-xl  p-5 flex flex-col gap-2 tracking-wide">
            <div className="font-semibold text-lg mb-2">Revenue</div>
          </div>
          <div className="to-do w-[300px] h-[270px] bg-white rounded-xl  p-5 flex flex-col gap-2 tracking-wide">
            <div className="font-semibold text-xl mb-2">To Do</div>
            <div>
              {" "}
              <span className="text-xl">2</span> orders to pack
            </div>
            <div>
              {" "}
              <span className="text-xl">3</span> orders to be picked up
            </div>
          </div>
        </div>
        <div className="best-selling flex-1 h-[270px] bg-white rounded-xl p-5 flex flex-col gap-2 tracking-wide">
          <div className="font-semibold text-xl mb-2">Best Selling Products</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
