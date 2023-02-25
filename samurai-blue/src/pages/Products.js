import React from "react";
import { shirt1 } from "../img";
import {PencilSquareIcon} from "@heroicons/react/24/outline"

function Products() {
  return (
    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
      <div className="flex justify-between align-middle">
        <div className="page-heading w-full pb-3 border-b-2">Products</div>
      </div>
      {/* <ul className="table-heading flex font-semibold">

      </ul> */}
      {/* use map here */}
      <div className="list-tab w-full flex flex-col p-7 gap-3 bg-white relative rounded-lg">
        <div className="flex justify-between">
          <div className="tab-id font-semibold">Product ID</div>
          <PencilSquareIcon className="w-[24px] h-[24px] cursor-pointer"></PencilSquareIcon>

        </div>
        <div className="flex gap-10 align-middle">

        <div className="product-img-container w-[7rem] h-[7rem] bg-black rounded-md shadow-xl">
          <img src={shirt1} className="object-cover w-full h-full"></img>
        </div>
        <div className="flex flex-col gap-1">
          <div className="tab-name">Product Name</div>
          <div className="tab-name">Product Code</div>
        {/* </div>
        <div className="flex flex-col"> */}
          <div className="tab-name">Product Qty</div>
          <div className="tab-name">Product Price</div>
          </div>
        </div>
      </div>
      <button className="dark-btn-norm absolute bottom-8 right-20">Add Product</button>
    </div>
  );
}

export default Products;
