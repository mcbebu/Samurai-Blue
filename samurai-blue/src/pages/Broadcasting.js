import React from "react";
import "./page-styles.css";
import { StopIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { fblogo, twitchlogo } from "../img";
import { TwitchEmbed } from 'react-twitch-embed';


function Broadcasting() {
  return (
    <div className="streaming-layout flex relative pt-8 px-3 pr-6 w-full h-full gap-6">
      <div className="flex flex-col">
      <TwitchEmbed channel="Kiarakitty" hideControls withChat={false} height={360} width={640}/>
        <div className="flex justify-between">
          <div className="flex live-icon w-fit h-fit text-white rounded-full pl-1 pr-3 py-1 gap-1 my-2">
            <PlayCircleIcon className="w-[24px] h-[24px] stroke-white tracking-wider"></PlayCircleIcon>
            L I V E
          </div>
          <button className="flex dark-broadcast-stop-btn h-fit mt-2 gap-1">
            <StopIcon className="w-[24px] h-[24px]"></StopIcon>
            <Link to="/broadcasts">Stop Broadcast</Link>
          </button>
        </div>

        <div className="comments-sect w-[640px] h-[230px] px-4 py-4 rounded-xl overflow-auto flex flex-col-reverse gap-3">
          {/* map here? */}
          <div className="comment-line flex text-sm gap-2">
            <img src={fblogo} className="w-[18px] h-[18px]" alt="facebook"></img>
            <div className="font-semibold shrink-0">username :</div>
            <div>sample comment</div>
          </div>

          <div className="comment-line flex text-sm gap-2">
            <img src={twitchlogo} className="w-[18px] h-[18px]" alt="twitch"></img>
            <div className="font-semibold shrink-0">username :</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              arcu mi, egestas eget enim volutpat, suscipit ultrices leo. Ut
              vitae nisl pulvinar, vehicula ligula vitae, lacinia tortor. 
            </div>
          </div>
        </div>
      </div>

      <div className="orders-sect w-full h-full rounded-xl bg-slate-100 flex flex-col">
        <div className="font-semibold tracking-wide p-7 text-xl">Orders</div>
        <div className="orders-overflow-container w-full h-[35rem] overflow-auto flex flex-col">
          {/* map here */}
          <div className="order-tab bg-white rounded-xl p-5 mx-5 mb-5 w-auto h-fit flex flex-col">
            <div className="flex justify-between">
              <div className="tab-id font-semibold mb-2">Order #0001</div>
              <div className="tab-name text-sm">Username</div>
            </div>
            <div className="tab-name text-sm">Product Name</div>
            <div className="tab-name text-sm">Product ID</div>
            <div className="tab-name text-sm">Quantity</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Broadcasting;
