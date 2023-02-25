import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../util/api";

function Orders() {
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getAllInformation = async () => {
            // start loading
            setIsLoading(true);
            // make the request here
            const data = await fetch(BACKEND_DOMAIN + "orders");
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
        <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
            {isLoading ? (
                ""
            ) : (
                <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
                    <div className="flex justify-between align-middle">
                        <div className="page-heading w-full pb-3 border-b-2">
                            Orders
                        </div>
                    </div>
                    {content.map((order) => {
                        return (
                            <div className="list-tab w-full flex flex-col p-7 gap-3 bg-white relative rounded-lg">
                                <div className="tab-id font-semibold">
                                    Order ID: {order.id}
                                </div>
                                <div className="flex gap-20 align-middle">
                                    <div className="flex flex-col gap-1">
                                        <div className="tab-name">
                                            Username: {order.username}
                                        </div>
                                        <div className="tab-name">
                                            Platform: {order.platform}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="tab-name">
                                            Product ID: {order.productId}
                                        </div>
                                        <div className="tab-name">
                                            Status: {order.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button className="dark-btn-norm absolute bottom-8 right-20">
                        Add Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Orders;
