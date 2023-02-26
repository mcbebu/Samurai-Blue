require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ws, WebSocket } = require("ws");
const { Client } = require("pg");

const USER_TOKEN =
  "EAAHycBwKj80BAFujmnHAgVtmZARXRoGmrh77EaUJZCy7HibLj0m8XuY775nVkimKUXOpnZBqPt1rcqs8tbzJdn0p0k04Q8PFUAhKfUbxDh0JNgMx2SeiH6UnTcR6aSaLA56S2l37nTLcdLtgOJYiNTkUpJncZCIqrIWsHd9XMZAzooLBfSRE5cBt83oQmuIu1t0PHNEW75xKgyGvZCCNRcRkNA5E58Sx9rsKU3gnUBCXBz0unR2hCIvrtEZC0YvIwoZD";
const PAGE_TOKEN =
  "EAAHycBwKj80BAPc1tDIj2r3M4zCZCd1S7HFGZB5JaKl7RiZCWv94w3TJk3XpxpHN26l3sZCnR0VvZAxuHHTAJnWzSZBWpm9HZBCvTfWrDbElHNKfdI8YgjeZCYGMIKI2vc0SZBfTNK0Kz9Pgc5jr5IqZAyAqs635VH9XiWJSvAJwx82ODqw26dgBSZAZAji9sI6QLPZBBk0WV2ESlVZBW3UZABqo9fn8SGBf5kjJUoZD";
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
