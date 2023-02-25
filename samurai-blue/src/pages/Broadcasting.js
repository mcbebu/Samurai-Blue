import React from "react";
import "./page-styles.css";
import { StopIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { fblogo, twitchlogo } from "../img";
import { TwitchEmbed } from "react-twitch-embed";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_DOMAIN } from "../util/api";

function Broadcasting() {
    const [comments, setComments] = useState([]);
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
    const content = state.filter((order) => {
        return order.sessionName === "S2";
    });
    console.log(content);

    const updateState = useCallback(async () => {
        axios.get("http://49.0.201.137:3000/messages").then((response) => {
            setComments([...comments, ...response.data]);
            console.log(response);
        });
    }, []);
    useEffect(() => {
        setInterval(updateState, 2000);
    }, [updateState]);

    return (
        <div className="streaming-layout flex relative pt-8 px-3 pr-6 w-screen h-screen gap-6">
            <div className="flex flex-col">
                <TwitchEmbed
                    channel="Kiarakitty"
                    hideControls
                    withChat={false}
                    height={360}
                    width={640}
                />
                <div className="flex justify-between">
                    <div className="flex live-icon w-fit h-fit text-white rounded-full pl-1 pr-3 py-1 gap-1 my-2">
                        <PlayCircleIcon className="w-[24px] h-[24px] stroke-white tracking-wider"></PlayCircleIcon>
                        L I V E
                    </div>
                    <button className="flex dark-broadcast-stop-btn h-fit mt-2 gap-1">
                        <StopIcon className="w-[24px] h-[24px]"></StopIcon>
                        <Link to="/broadcasts">Stop Broadcast</Link>
                    </button>
                </div>

                <div className="comments-sect w-[640px] h-[230px] px-4 py-4 rounded-xl overflow-auto flex flex-col-reverse gap-3">
                    {comments.map((comment) => {
                        console.log(comment);
                        return (
                            <div className="comment-line flex text-sm gap-2">
                                <img
                                    src={
                                        comment.platform === "twitch"
                                            ? twitchlogo
                                            : fblogo
                                    }
                                    className="w-[18px] h-[18px]"
                                    alt="logo"
                                ></img>
                                <div className="font-semibold shrink-0">
                                    {comment.username} :
                                </div>
                                <div>{atob(comment.msg)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="orders-sect w-auto flex-1 h-auto mb-12 rounded-xl bg-slate-100 flex flex-col">
                <div className="font-semibold tracking-wide p-7 text-xl">
                    Orders
                </div>
                <div className="orders-overflow-container w-full h-[35rem] overflow-auto flex flex-col">
                    {content.map((order) => {
                        return (
                            <div className="order-tab bg-white rounded-xl p-5 mx-5 mb-5 w-auto h-fit flex flex-col">
                                <div className="flex justify-between">
                                    <div className="tab-id font-semibold mb-2">
                                        Order Id: {order.id}
                                    </div>
                                    <div className="tab-name text-sm">
                                        Username: {order.username}
                                    </div>
                                </div>
                                <div className="tab-name text-sm">
                                    Product ID: {order.productId}
                                </div>
                                <div className="tab-name text-sm">
                                    Status: {order.status}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Broadcasting;
