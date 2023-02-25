const cors = require('cors');
const express = require('express');
const {FB, FacebookApiException} = require('fb');
const axios = require('axios');

const USER_TOKEN = 'EAAHycBwKj80BANoQde3YctnEexxd5VscZB5ZAKXIjZCGovZB3mHpcv9YPGdY3VlaRv6RlfYolGqJj6yYHADLoMKcZBJL2ZBZAzPDX5CdQHQFDouLlZBct0SzSQPTdYkxcKYPXymIZAYPstVFLp60cABmyXHhLNftSA4uzokZBWcXuHpZCHWz50Wxp8vJBgVCk1ev21wlAL7PatYrqJhBAsGZBZCYyywBaSh0PbRT5AVmlLkUGx3DMh9QK5CzJiLE7UZCehddeCyJJNrt2GRwZDZD'
const PAGE_TOKEN = 'EAAHycBwKj80BAPe22l95fQ56dZCJcyZBhLzzHr6ZBNqmp6YK3Imf3ucwaHMqy0D2uLiZBzmFqeLvIovYvgRSVQvn4kC0GSeGddOb74HeS3tw2AyRtohMbA3vGSZAZB61qtZBUmqPOZAI4mZBe6ToMhEkcEO8vZBugQKZB45IyyqZAQcLA1os5ZCIUiJnZCinjpMNXo0lZBQ65bnXxaOzEiakbWbYZCFdB7lGHFO3G3gZD';
const APP_TOKEN = '548038297423821|BEc-ZSwfoLVme67qjLZ3UwBBAhE'


const app = express();
app.use(cors());
app.use(express.json());

const streamRouter = require('./routes/stream.js')
app.use('/stream', streamRouter);

app.listen(3000, ()=>console.log("SERVER STARTED"))

// var source = new EventSource("https://streaming-graph.facebook.com/6096002253777048/live_comments?access_token=EAAKM6wrNvlMBABJwX9ZCFOnmS5fM6Vhne0SguEl0MrzNnxcwBsYNjYe72x0ZBbkUFSjKFImpgXbAVhcmMkEwRvUhN8IgqdmQAeSYTauouWRradUVNaB7BtI8wBRHI3Cq8UqewGRM3rB7U57MY6cmiTZAcW92DHeYMctys9OeuERoejcinbY92Dh0SKMKJRFoy6E5m0PvFs1WtV556sqVIXiqBMbfx0ZD&comment_rate=one_per_two_seconds");
// source.onmessage = function(event) {
//   console.log(event)
//   console.log("FUCK")
// };