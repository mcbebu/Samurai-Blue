import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Broadcasts() {
  return (
    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 colored-bg">
      <div className="flex justify-between align-middle relative">
        <div className="page-heading w-full pb-3 border-b-2">Broadcasts</div>
        <Link
          to="/broadcasts/new-broadcast"
          className="broadcast-btn flex bg-black text-white px-3 mx-3 py-2 gap-2 rounded-lg absolute right-0"
        >
          <PlayIcon className="w-[16px] h-[20px]"></PlayIcon>
          <div className="text-sm text-semibold">New Broadcast</div>
        </Link>
      </div>
      <ul className="list-table font-semibold gap-10 mx-7 justify-items-start">
        <li>Broadcast ID</li>
        <li>Viewer Count</li>
        <li>Order Count</li>
        <li>Platform(s)</li>
        <li>Date Broadcasted</li>
      </ul>
      {/* use map here */}
      <div className="list-table w-full flex flex-col gap-10 p-7 bg-white relative rounded-lg">
        <div className="tab-id font-semibold">#0001</div>
        <div className="tab-name">1,234</div>
        <div className="tab-name">765</div>
        <div className="tab-name">Facebook</div>
        <div className="tab-name">25 Feb 2023</div>
      </div>

      <div className="list-table w-full flex flex-col gap-10 p-7 bg-white relative rounded-lg">
        <div className="tab-id font-semibold">#0002</div>
        <div className="tab-name">2,345</div>
        <div className="tab-name">897</div>
        <div className="tab-name">Twitch, Facebook</div>
        <div className="tab-name">26 Feb 2023</div>
      </div>
      
    </div>
  );
}

export default Broadcasts;
