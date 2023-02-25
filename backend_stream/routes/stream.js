require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const {ws, WebSocket} = require('ws');

const USER_TOKEN = process.env.USER_TOKEN;
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const APP_TOKEN = process.env.APP_TOKEN;
const PAGE_ID = 110513338639515;

router.get("/", (req, res) => {
    res.status(200).json({ message: "hello world" });
});

router.get("/test", async (req, res) => {
    try {
        const user = await axios.get(
            "https://graph.facebook.com/v16.0/110513338639515?access_token=" +
                USER_TOKEN
        );
        res.status(200).json(user.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/createStream", async (req, res) => {
    try {
        const kek = await axios.post(
            "https://graph.facebook.com/v16.0/110513338639515/live_videos?access_token=" +
                PAGE_TOKEN
        );
        console.log(kek.data)
        res.status(200).json(kek.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/startListener",async(req,res)=>{
    const id = req.body.streamID;
    const ws = await new WebSocket('ws://https://streaming-graph.facebook.com/' + id + '/livecomments?access_token=' + PAGE_TOKEN + '&comment_rate=one_per_two_seconds')
    ws.on('message', function message(data){
        console.log('received: %s', data);
    });
    res.status(200).json({message: "ok"})
})

module.exports = router;
