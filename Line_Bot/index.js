// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const line = require("@line/bot-sdk");
const express = require("express");

// create LINE SDK config from env variables
require("dotenv").config();
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// const API_KEY = process.env.ALCHEMY_API;

// // Using HTTPS
// const web3 = createAlchemyWeb3(
//   `https://eth-goerli.alchemyapi.io/v2/${API_KEY}`
// );

// const nfts = await web3.alchemy.getNfts({
//   owner: "0x909A1228EC026e3100FC700921dcA1c67eA93d63",
// });

// console.log(nfts);

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.text === "NFT") {
    const NFT_reply = { type: "text", text: "想買NFT嗎?!" };

    return client.replyMessage(event.replyToken, NFT_reply);
  } else {
    // create a echoing text message
    const echo = { type: "text", text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
