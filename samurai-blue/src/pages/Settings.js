import React from "react";
import "./page-styles.css";
import { BACKEND_DOMAIN } from "../util/api";
import { useContext } from "react";
import { NinjaLiveContext } from "../ticketing-context";

function Settings() {
    const ctx = useContext(NinjaLiveContext);
    const handleConnectStripe = async (event) => {
        event.preventDefault();
        const response = await fetch(BACKEND_DOMAIN + "onboard-user", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: null,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch concerts");
        }
        const body = await response.json();
        console.log(body);
        window.location.href = body.url;
        return response.json();
    };

    return (
      <div className="flex flex-col w-full h-[100vh] font-opensans py-16 px-12 gap-5 colored-bg">
        <div className="page-heading w-full pb-3 border-b-2">Account Settings</div>
        <div className="acc-details rounded-lg shadow-lg relative w-full bg-white">
          <div>Account Details</div>
            </div>
            <div className="payment-methods rounded-lg  shadow-lg relative w-full bg-white">
                <div>Payment Methods</div>
                {ctx.stripeAccount === "" ? (
                    <button
                        onClick={handleConnectStripe}
                        className="absolute top-3 right-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 my-2 mx-2 border border-blue-500 hover:border-transparent rounded bg-white text-sm"
                    >
                        Connect To Stripe
                    </button>
                ) : (
                    ""
                )}

                <div className="other-payments flex-col py-2">
                    <div className="paynow flex-1 flex align-middle gap-3 my-5">
                        <div>PayNow</div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                defaultChecked={ctx.paynow}
                            />
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="bank-trf flex-1 flex align-middle gap-3 my-2">
                        <div>Bank Transfer</div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                defaultChecked={ctx.creditcard}
                            />
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
