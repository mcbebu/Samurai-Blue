require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ws, WebSocket } = require("ws");
const { Client } = require("pg");

const USER_TOKEN =
  "EAAHycBwKj80BABBuFpXOwWYVtZA600ndTUWuOURy7GMcDTma308qJHdgPK7ZCBKwec6PxeaDwfrZCt95qtaymBxujB2KZAKwYppNgREpmdNDw3noFYUxQgJlYJdesDwAfZA4rlr7vkEPCP6io7KU8lZCXc8Jw6pkGKI71xMqsPNLisEhkJ8cpyQJmy4Ak2ZBeiu8idLcyumSDIZCLPumZBxTxEA7CUtn5rLGzGFLs8LhAKXA13K5xOuGOu6weE01Ske2KwqZAq9h5DDwZDZD";
const PAGE_TOKEN =
  "EAAHycBwKj80BAEiLXqSLxpIpXpkmUoA1y2BqNTW4uewNH8HG4KRAUA6GgPn8J7Jrj7iq2ZCzSiPscf4Iw3MA4vLzZBYl2NPPIOx9jF1AArHEouv6bBSD49Ckrh4fiT5wfcUnBMcI72ZBLZCgv1h1lI9UNgYoKwb3LNXklZCZAkHNmZC3rIo3xZAaGnlrEllzxPlbXZB6aV8rZC0x5USYCBXKLt25ZBAkYeXEnQZD";
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
