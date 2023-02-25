import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../util/api";

function Products() {
    return (
        <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
            <div className="flex justify-between align-middle">
                <div className="page-heading w-full pb-3 border-b-2">
                    Products
                </div>
            </div>
            {/* use map here */}
            <div className="list-tab w-full flex flex-col p-7 gap-3 bg-white relative rounded-lg">
                <div className="tab-id font-semibold">Product ID</div>
                <div className="flex gap-10 align-middle">
                    <div className="product-img-container w-[7rem] h-[7rem] bg-black rounded-md shadow-xl">
                        <img
                            src={shirt1}
                            className="object-cover w-full h-full"
                        ></img>
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
            <button className="dark-btn-norm absolute bottom-8 right-20">
                Add Product
            </button>
        </div>
    );
}

export default Products;
