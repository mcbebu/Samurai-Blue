import React from "react";
import { shirt1 } from "../img";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../util/api";

function Products() {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
    console.log(content);
    return (
        <div>
            {isLoading ? (
                <></>
            ) : (
                <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
                    <div className="flex justify-between align-middle">
                        <div className="page-heading w-full pb-3 border-b-2">
                            Products
                        </div>
                    </div>
                    {content.map((product) => {
                        return (
                            <div className="list-tab w-full flex flex-col p-7 gap-3 bg-white relative rounded-lg">
                                <div className="tab-id font-semibold">
                                    Product
                                </div>
                                <div className="flex gap-10 align-middle">
                                    <div className="product-img-container w-[7rem] h-[7rem] bg-black rounded-md shadow-xl">
                                        <img
                                            src={product.imageurl}
                                            className="object-cover w-full h-full"
                                        ></img>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="tab-name">
                                            Product Name: {product.name}
                                        </div>
                                        <div className="tab-name">
                                            Product Code: {product.product_code}
                                        </div>
                                        {/* </div>
<div className="flex flex-col"> */}
                                        <div className="tab-name">
                                            Product Qty: {product.quantity}
                                        </div>
                                        <div className="tab-name">
                                            Product Price: $
                                            {product.price / 100}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button className="dark-btn-norm absolute bottom-8 right-20">
                        Add Product
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;
