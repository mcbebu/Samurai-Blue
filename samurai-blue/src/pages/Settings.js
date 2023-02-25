import React from "react";
import "./page-styles.css";

function Settings() {

  const handleConnectStripe = () => {
    
  }


  return (

    <div className="flex flex-col w-full font-opensans py-16 px-12 gap-5 bg-gray-100">
      <div className="flex justify-between align-middle">
        <div className="page-heading w-full pb-3 border-b-2">Account Settings</div>
      </div>


    <div className="payment-container flex flex-col">
      <div className="acc-details">Account Details</div>
      <div className="payment-methods rounded-lg bg-white relative">
        <div>Payment Methods</div>
        <button onClick={handleConnectStripe} className="absolute top-3 right-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 my-2 mx-2 border border-blue-500 hover:border-transparent rounded bg-white text-sm">
          Connect To Stripe
        </button>

        <div className="other-payments flex-col py-2">
          <div className="paynow flex-1 flex align-middle gap-3 my-5">
            <div >PayNow</div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="bank-trf flex-1 flex align-middle gap-3 my-2">
            <div>Bank Transfer</div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
        </div>
        </div>
  );
}

export default Settings;
