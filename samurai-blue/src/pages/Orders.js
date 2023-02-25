import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../util/api";
import "./page-styles.css"

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
    <div>
      {isLoading ? (
        ""
      ) : (
        <div className="flex flex-col w-full h-[100vh] font-opensans py-16 px-12 gap-5 colored-bg">
          <div className="flex justify-between align-middle">
            <div className="page-heading w-full pb-3 border-b-2">Orders</div>
          </div>
          <ul className="list-table font-semibold gap-10 mx-7 justify-items-start">
            <li>Order ID</li>
            <li>Username</li>
            <li>Product ID</li>
            <li>Platform</li>
            <li>Status</li>
          </ul>
          {content.map((order) => {
            return (
              <div>
                <div className="list-table w-full gap-10 p-7 bg-white relative rounded-lg">
                  <div className="tab-id font-semibold">{order.id}</div>
                  <div className="tab-name">{order.username}</div>
                  <div className="tab-name">{order.productId}</div>
                  <div className="tab-name">{order.platform}</div>
                  <div className="tab-name">{order.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
