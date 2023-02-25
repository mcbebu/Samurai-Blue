import React from "react";
import { Link } from "react-router-dom";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TwitchEmbed } from 'react-twitch-embed';
import { STREAM_BACKEND_DOMAIN } from "../util/api";

function NewBroadcast() {

  const clickHandler = async() => {
    const fbStreamID = await fetch(STREAM_BACKEND_DOMAIN + 'createStream',{method:"POST"})
    const result = await fbStreamID.json();
    console.log(result)
  }

  return (
    <div className="flex gap-4 justify-start w-full relative">
      <div className="flex flex-col w-full pt-16 gap-6">
      <div className="page-heading w-full">New Broadcast</div>

      {/* <div className="bg-black w-[640px] h-[360px] rounded-xl"></div> */}
      <TwitchEmbed channel="Kiarakitty" hideControls withChat={false} height={360} width={640} />
      <div className="flex flex-col gap-4 w-[450px] flex-1">
          <input
            type="text"
            name="broadcast-title"
            id="broadcast-title"
            placeholder="Broadcast Title"
            className="input-field mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <textarea
            type="text"
            name="broadcast-description"
            id="broadcast-desc"
            placeholder="Description"
            className="input-field mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
      </div>
      </div>
          <div className="featured-products flex w-auto absolute right-10 top-10 flex-col">
            <div className="text-xl tracking-widest font-semibold py-4 px-1">
              Featured Products
            </div>
            <button className="dark-btn flex gap-1">
              <PlusIcon className="w-[24px] h-[24px]"></PlusIcon>
              Add Products
            </button>
      </div>
      <button className="dark-broadcast-btn flex gap-1 absolute bottom-8 right-20" onClick={clickHandler}>
             <PlayIcon className="w-[18px] h[20px]"></PlayIcon>
             <Link to="/broadcasting">Start Broadcast</Link>
          </button>
</div>


    // <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5">
    //     <div className="bg-black w-[640px] h-[360px] rounded-xl"></div>

    //   <div className="flex justify-between gap-4">
        // <div className="flex flex-col gap-4 w-[450px] flex-1">
        //   <div className="text-3xl tracking-widest font-light">
        //     New Broadcast
        //   </div>
        //   <input
        //     type="text"
        //     name="broadcast-title"
        //     id="broadcast-title"
        //     placeholder="Broadcast Title"
        //     className="input-field mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        //   />
        //   <textarea
        //     type="text"
        //     name="broadcast-description"
        //     id="broadcast-desc"
        //     placeholder="Description"
        //     className="input-field mt-1 w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        //   />
        //   <div className="featured-products w-[450px] h-[180px] flex flex-col">
        //     <div className="text-xl tracking-widest font-semibold py-4 px-1">
        //       Featured Products
        //     </div>
        //     <button className="dark-btn flex gap-1">
        //       <PlusIcon className="w-[24px] h-[24px]"></PlusIcon>
        //       Add Products
        //     </button>
        //   </div>
    //       <div className="linked-platforms w-[450px] h-[200px] flex flex-col">
    //         <div className="text-xl tracking-widest font-semibold pt-4 pb-1 px-1 ">
    //           Linked Platforms
    //         </div>
    //         <div className="font-light px-1">
    //           Select at least one platform to broadcast to.
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-5 flex-1 relative">
    //       <button className="dark-broadcast-btn flex gap-1 absolute bottom-8 right-20">
    //         <PlayIcon className="w-[18px] h[20px]"></PlayIcon>
    //         <Link to="/broadcasting">Start Broadcast</Link>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default NewBroadcast;
