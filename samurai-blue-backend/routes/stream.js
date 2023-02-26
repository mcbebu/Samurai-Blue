require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ws, WebSocket } = require("ws");
const { Client } = require("pg");

const USER_TOKEN =
  "EAAHycBwKj80BAMlbZBT1A9hcQu3RoBVO8P46OfutmFWoNcGYNVS4ChTTWf0vAuBsD9cnkHtKywFNoC5RYxrdAIuxCZCPhhookNKBGA2IfDrKXSVYaRNvPMYcekvTaZCOyUZC8cAeUGcJaPCBqW5UDBN1nZCZAimus5Eu375ZAL2wdrevZC5H82BSovZCzC1IBOvVC9lNNAKEZAS6QZAOiZCFhL11tL8mSm0D87t3pMyjvl9T3AgVACAfIZBVsGiCiNVt9wdgZD";
const PAGE_TOKEN =
  "EAAHycBwKj80BAFPt52kAJCD43wRcmdUhCUY5irA4TWEJw9DZAydkTrwrytPCA04bFiHFe5ZCYAKKAcIiZBZC8SumJsumA9CwLZC1UiLu1pQw1OhVUczw2QNZC2wtHoTe9AkRs4PCE5l7vngZAZBzBp6q9TNco8AbM30plKT4hMlIvz6tn0iuZB2kSvvjpPXs7dd3f3qaodFSy4qc4LVh3nmqKoFpy9ugCyc0ZD";
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
