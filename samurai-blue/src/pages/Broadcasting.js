import React from "react";
import "./page-styles.css";

function Broadcasting() {
  return (
    <div className="streaming-layout flex relative pt-16 px-3 w-full">
      <div className="flex flex-col">
        <div className="w-[640px] h-[360px] bg-black rounded-xl"></div>
        <div className="comments-sect w-full h-[240px] mt-5 rounded-xl"></div>
      </div>
      <div className='orders-sect w-auto h-full my-5 rounded-xl'></div>

    </div>
  );
}

export default Broadcasting;
