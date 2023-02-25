const express = require('express');
const {FB, FacebookApiException} = require('fb');
const axios = require('axios');

const USER_TOKEN = process.env.USER_TOKEN;
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const APP_TOKEN = process.env.APP_TOKEN;

const app = express();
app.use(express.json());

const streamRouter = require('./routes/stream.js')
app.use('/stream', streamRouter);

app.listen(3000, ()=>console.log("SERVER STARTED"))

// var source = new EventSource("https://streaming-graph.facebook.com/6096002253777048/live_comments?access_token=EAAKM6wrNvlMBABJwX9ZCFOnmS5fM6Vhne0SguEl0MrzNnxcwBsYNjYe72x0ZBbkUFSjKFImpgXbAVhcmMkEwRvUhN8IgqdmQAeSYTauouWRradUVNaB7BtI8wBRHI3Cq8UqewGRM3rB7U57MY6cmiTZAcW92DHeYMctys9OeuERoejcinbY92Dh0SKMKJRFoy6E5m0PvFs1WtV556sqVIXiqBMbfx0ZD&comment_rate=one_per_two_seconds");
// source.onmessage = function(event) {
//   console.log(event)
//   console.log("FUCK")
// };