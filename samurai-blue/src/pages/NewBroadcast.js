import React from "react";
import { Link } from "react-router-dom";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/outline";
<<<<<<< HEAD
import { TwitchEmbed } from 'react-twitch-embed';
import { STREAM_BACKEND_DOMAIN } from "../util/api";

function NewBroadcast() {

  const clickHandler = async() => {
    const fbStreamID = await fetch(STREAM_BACKEND_DOMAIN + 'createStream',{method:"POST"})
    const result = await fbStreamID.json();
    console.log(result)
  }
=======
import { TwitchEmbed } from "react-twitch-embed";
import { fblogo, twitchlogo } from "../img";

function NewBroadcast() {
  const clickHandler = () => {};
>>>>>>> 487cd3ff7c15440776120671e476116332865b06

  return (
    <div className="flex gap-4 justify-start w-full relative colored-bg pl-9">
      <div className="flex flex-col w-auto pt-12 gap-6">
        <div className="page-heading w-full">New Broadcast</div>

        {/* <div className="bg-black w-[640px] h-[360px] rounded-xl"></div> */}
        <TwitchEmbed
          channel="Kiarakitty"
          hideControls
          withChat={false}
          height={360}
          width={640}
        />
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
      <div className="flex flex-col gap-5">
        <div className="featured-products flex flex-col w-[14rem] h-[28rem] mt-28 ml-4 gap-3">
          <div className="text-xl tracking-widest font-semibold pt-4 px-1">
            Featured Products
          </div>
          <div className="w-auto p-3 h-[5rem] bg-white rounded-lg mb-4">
            <div>Sample Product</div>
          </div>
          <button className="dark-btn flex gap-1">
            <PlusIcon className="w-[24px] h-[24px]"></PlusIcon>
            Add Products
          </button>
          <div className="linked-platforms w-auto mt-5">
            <div className="text-xl tracking-widest font-semibold pt-4 pb-1 px-1 ">
              Linked Platforms
            </div>
            <div className="font-light px-1">
              Select at least one platform to broadcast to.
            </div>
            <div className="flex flex-col">

            <div className="flex p-3 gap-4">
              <img src={fblogo} className="w-[24px] h-[24px]"></img>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  // defaultChecked={}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              </div>
              <div className="flex p-3 gap-4">

              <img src={twitchlogo} className="w-[24px] h-[24px]"></img>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  // defaultChecked={}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="dark-broadcast-btn flex gap-1 absolute bottom-8 right-20"
        onClick={clickHandler}
      >
        <PlayIcon className="w-[20px] h[20px]"></PlayIcon>
        <Link to="/broadcasting">Start Broadcast</Link>
      </button>
    </div>

  );
}

export default NewBroadcast;
