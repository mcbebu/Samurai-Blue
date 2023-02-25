require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const {ws, WebSocket} = require('ws');
const {Client} = require('pg');

const USER_TOKEN = 'EAAHycBwKj80BANoQde3YctnEexxd5VscZB5ZAKXIjZCGovZB3mHpcv9YPGdY3VlaRv6RlfYolGqJj6yYHADLoMKcZBJL2ZBZAzPDX5CdQHQFDouLlZBct0SzSQPTdYkxcKYPXymIZAYPstVFLp60cABmyXHhLNftSA4uzokZBWcXuHpZCHWz50Wxp8vJBgVCk1ev21wlAL7PatYrqJhBAsGZBZCYyywBaSh0PbRT5AVmlLkUGx3DMh9QK5CzJiLE7UZCehddeCyJJNrt2GRwZDZD'
const PAGE_TOKEN = 'EAAHycBwKj80BAPe22l95fQ56dZCJcyZBhLzzHr6ZBNqmp6YK3Imf3ucwaHMqy0D2uLiZBzmFqeLvIovYvgRSVQvn4kC0GSeGddOb74HeS3tw2AyRtohMbA3vGSZAZB61qtZBUmqPOZAI4mZBe6ToMhEkcEO8vZBugQKZB45IyyqZAQcLA1os5ZCIUiJnZCinjpMNXo0lZBQ65bnXxaOzEiakbWbYZCFdB7lGHFO3G3gZD';
const APP_TOKEN = '548038297423821|BEc-ZSwfoLVme67qjLZ3UwBBAhE'
const PAGE_ID = 110513338639515;

const dbClient = new Client({
    host: '119.8.165.76',
    port: 5432,
    user: 'root',
    password: 'P@ssw0rdninjavan',
    database: 'ninjavan'
  })

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
        dbClient.connect()
        const id = kek.data.id
        const lmao = await dbClient.query(`INSERT INTO Livevideo VALUES (${id})`);
        console.log(lmao.rows);
        dbClient.end();
        res.status(200).json(kek.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/postComment", async (req, res)=>{
    try {
        const msg = Buffer.from(req.body.msg).toString("base64");
        const username = req.body.username;
        const timestamp = req.body.timestamp;
        const userid = req.body.userid;
        dbClient.connect()
        const lmao = await dbClient.query(`INSERT INTO Messages (timestamp, msg, username, userid, platform) VALUES ('${timestamp}', '${msg}', '${username}', '${userid}', 'fb');`);
        console.log(lmao);
        dbClient.end();
        res.status(201).json({message:"POST Success"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// router.post("/startListener",async(req,res)=>{
//     const id = req.body.streamID;
//     const ws = await new WebSocket('ws://https://streaming-graph.facebook.com/' + id + '/livecomments?access_token=' + PAGE_TOKEN + '&comment_rate=one_per_two_seconds')
//     ws.on('message', function message(data){
//         console.log('received: %s', data);
//     });
//     res.status(200).json({message: "ok"})
// })

module.exports = router;
