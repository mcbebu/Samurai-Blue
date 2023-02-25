import React from 'react'

function Orders() {
  return (
    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
      <div className="flex justify-between align-middle">
        <div className="page-heading w-full pb-3 border-b-2">Orders</div>
      </div>
      {/* use map here */}
      <div className="list-tab w-full flex flex-col p-7 gap-3 bg-white relative rounded-lg">
        <div className="tab-id font-semibold">Order ID</div>
        <div className="flex gap-30 align-middle">
        <div className="flex flex-col gap-1">
          <div className="tab-name">Username</div>
          <div className="tab-name">Platform</div>
        </div>
        <div className="flex flex-col">
          <div className="tab-name">Product</div>
          <div className="tab-name">Product ID</div>
          </div>
        </div>
      </div>
      <button className="dark-btn-norm absolute bottom-8 right-20">Add Order</button>
    </div>
  )
}

export default Orders