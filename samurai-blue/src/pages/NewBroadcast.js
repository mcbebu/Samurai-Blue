import React from "react";
import { Link } from "react-router-dom";
import { XMarkIcon, PlayIcon, PlusIcon } from "@heroicons/react/24/outline";

import { TwitchEmbed } from "react-twitch-embed";
import { fblogo, twitchlogo } from "../img";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN, STREAM_BACKEND_DOMAIN } from "../util/api";

const PAGE_TOKEN =
  "EAAHycBwKj80BAAh3qkWPbumMNPoTZAxM44fufZARcFMHqzQnZCyL3ZA9lHFnOVZABMa0QE37YaUPyMflJvElZAewZC4tU7w4ukPZBIRzOfdlNjR7mJSItZBoDLG4g2NKGmq6ghBWSyZAwulVUT8gFUf9pT067eA8w3f2Y84sG5sP5RZCZCQAdwdFP2icaosHFv0ZBJw6ODvZCH9ZC3UQc8BAHd98iLiJz0YdQQbCD0ZD";
const source = new EventSource(
  "https://streaming-graph.facebook.com/114855184867579/live_comments?access_token=" +
    PAGE_TOKEN +
    "&comment_rate=one_per_two_seconds"
);
source.onmessage = function (event) {
  // const result = event.data.json();
  const data = JSON.parse(event.data);

  console.log(data.message);
  console.log(typeof data.message);

  fetch(STREAM_BACKEND_DOMAIN + "postComment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg: data.message,
      username: data.from.name,
      timestamp: Math.floor(Date.now() / 1000),
      userid: data.from.id,
    }),
  });
};

function NewBroadcast() {
  const clickHandler = async () => {
    const data = await fetch(STREAM_BACKEND_DOMAIN + "createStream", {
      method: "POST",
    });
    const fbStreamID = await data.json();
    console.log(fbStreamID);
  };
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleAddProducts, setToggleAddProducts] = useState(false);
  const [addedProduct, setAddedProduct] = useState(false);

  const handleAddProduct = () => {
    setAddedProduct(true);
    setToggleAddProducts(false);
  };

  useEffect(() => {
    const getAllInformation = async () => {
      // start loading
      setIsLoading(true);
      // make the request here
      const data = await fetch(BACKEND_DOMAIN + "products");
      const body = await data.json();
      setState(body);
      // already finished here
      setIsLoading(false);
    };
    getAllInformation();
  }, []);
  const content = [];
  for (let i = 0; i < state.length; i++) {
    content.push(state[i]);
  }

  return (
    <div className="w-screen h-screen">
      {isLoading ? (
        ""
      ) : (
        <div>
          {toggleAddProducts ? (
            <div>
              <div className="flex justify-center w-screen h-screen">
                <div className="z-20  bg-white rounded-lg w-[650px] h-[500px] absolute my-16 flex flex-col">
                  <XMarkIcon
                    className="w-[28px] h-[28px] mt-9 ml-9 cursor-pointer"
                    onClick={() => setToggleAddProducts(false)}
                  ></XMarkIcon>
                  <div className="font-semibold tracking-wide text-xl ml-9 my-5">
                    Products
                  </div>

                  {content.map((product) => {
                    return (
                      <div className="grid w-[90%] gap-5 ml-8 mb-5">
                        <input
                          type="checkbox"
                          id="react-option"
                          value={product.product_code}
                          class="hidden peer"
                          required=""
                        />
                        <label
                          for="react-option"
                          class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 "
                        >
                          <div class="block">
                            <div class="w-full text-lg font-semibold">
                              {product.name}
                            </div>
                            <div class="w-full text-sm">
                              {product.product_code}
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                  <button
                    className="dark-btn-norm mb-6 ml-[30rem]"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                </div>
              </div>
              <div className="absolute z-10 w-full h-full bg-black opacity-40"></div>
            </div>
          ) : (
            ""
          )}

          {/* <button value={product.product_code} className="list-table w-full flex flex-col gap-1 p-5 ml-5 bg-white relative rounded-lg">
                        <div className="font-semibold">{product.id}</div>
                        <div className="">{product.name}</div>
                        <div className="">{product.product_code}</div>
                        </button> */}

          <div className="flex gap-4 justify-start relative colored-bg px-9 ">
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
              <div className="flex flex-col gap-4 w-full flex-1">
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
                  className="input-field mt-1 mb-[97px] w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="featured-products flex flex-col w-[14rem] h-[28rem] mt-28 ml-4 gap-3">
                <div className="text-xl tracking-widest font-semibold pt-4 px-1">
                  Featured Products
                </div>
                {addedProduct ? (
                  <div className="w-auto p-4 h-[5rem] bg-white rounded-lg mb-4 flex flex-col">
                    <div>{content[0].name}</div>
                    <div>{content[0].product_code}</div>
                  </div>
                ) : (
                  ""
                )}

                <button
                  className="dark-btn flex gap-1"
                  onClick={() => setToggleAddProducts(true)}
                >
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
                  <div className="flex pt-1 flex-col">
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
        </div>
      )}
    </div>
  );
}

export default NewBroadcast;
