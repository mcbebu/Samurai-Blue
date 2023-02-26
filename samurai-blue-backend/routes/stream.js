require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ws, WebSocket } = require("ws");
const { Client } = require("pg");

const USER_TOKEN =
  "EAAHycBwKj80BANpkyX1BNGZBZBPWOjv3iZAq7W6p8FwRQiVZAuxKnmKtcjvOO5zO9gaaxuiEKSiQhcs0x72nZBUX7udBqZAX0is0hkCQn08MnmcYpFuPE9lWrZCZAh4ZBjmp1HFgpVBO4ZAcMVy5wwjHBZAp0zBoYOcP4xbDOTWlXa9VKuEFFxYC2iMKEAKyaKL2XBIl58WCh7ZCKLRZAnXBSsHp6HK1MplVTnl5BO8Dg2GiWcdIhJrpPqFmA26X1IzyhYNwbCOdf8c0LUgZDZD";
const PAGE_TOKEN =
  "EAAHycBwKj80BAON5HwHr4ZC5A7pj4fYsGubbEOMKBM3KfpacVZB85X4bZCO1yHrPbZCDuAvucBusn31foa25Kkl6PNEDBDwh0ZATNJIFrFGj9ZCx7h2OmcFZCt8ZBEZAvC4ePJjwg8e21ZA7BMnXaOBzX5ZA2YzZBwhOAMRB1QdFPUEZBVoU8r4S4upIOSltHchh6NZC9LVGp02xXSlxZAmALzJUvRgcSlQVFvMvYoZD";
const APP_TOKEN = "548038297423821|BEc-ZSwfoLVme67qjLZ3UwBBAhE";
const PAGE_ID = 110513338639515;

const dbClient = new Client({
  host: "119.8.165.76",
  port: 5432,
  user: "root",
  password: "P@ssw0rdninjavan",
  database: "ninjavan",
});

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
    console.log(kek.data);
    dbClient.connect();
    const id = kek.data.id;
    const lmao = await dbClient.query(`INSERT INTO Livevideo VALUES (${id})`);
    console.log(lmao.rows);
    dbClient.end();
    res.status(200).json(kek.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

dbClient.connect();

router.post("/postComment", express.json(), async (req, res) => {
  try {
    console.log(req.body);
    const msg = Buffer.from(req.body.msg).toString("base64");
    const username = req.body.username;
    const timestamp = req.body.timestamp;
    const userid = req.body.userid;
    console.log("hi");
    const lmao = await dbClient.query(
      `INSERT INTO Messages (timestamp, msg, username, userid, platform) VALUES ('${timestamp}', '${msg}', '${username}', '${userid}', 'fb');`
    );
    console.log(lmao);
    res.status(201).json({ message: "POST Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
//   finally {
//     dbClient.end();
//   }
});
// router.post("/startListener",async(req,res)=>{
//     const id = req.body.streamID;
//     const ws = await new WebSocket('ws://https://streaming-graph.facebook.com/' + id + '/livecomments?access_token=' + PAGE_TOKEN + '&comment_rate=one_per_two_seconds')
//     ws.on('message', function message(data){
//         console.log('received: %s', data);
//     });
//     res.status(200).json({message: "ok"})
// })

module.exports = router;
