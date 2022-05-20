import * as line from "@line/bot-sdk";
import express from "express";
import { getEthAddress, getNFTAsset, getNFTNumber } from "./nft/fetch.js";

// create LINE SDK config from env variables
import "dotenv/config";
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

// event handler
async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.text === "NFT") {
    const NFT_reply = { type: "text", text: "想買NFT嗎?!" };

    return client.replyMessage(event.replyToken, NFT_reply);
  } else if (event.message.text === "地址") {
    const ethAddress = await getEthAddress(
      "0x909A1228EC026e3100FC700921dcA1c67eA93d63"
    );
    const address = { type: "text", text: ethAddress };

    return client.replyMessage(event.replyToken, address);
  } else if (event.message.text === "數量") {
    const NFTAmount = await getNFTNumber(
      "0x909A1228EC026e3100FC700921dcA1c67eA93d63"
    );
    const amount = { type: "text", text: NFTAmount };

    return client.replyMessage(event.replyToken, amount);
  } else if (event.message.text === "樣式") {
    const asset = await getNFTAsset(
      "0x0928A0B5D4aa6ba63EB807011F7505a00220eaAF"
    );

    return client.replyMessage(event.replyToken, {
      type: "template",
      altText: "Show your NFT asset",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
            imageBackgroundColor: "#FFFFFF",
            title: `${asset.nameArray}`,
            text: `${asset.typeArray}`,
            actions: [
              {
                type: "postback",
                label: "Sell",
                data: "sell NFT",
              },
              {
                type: "uri",
                label: "Check Etherscan",
                uri: "https://tw.yahoo.com/",
              },
            ],
          },
        ],
        imageAspectRatio: "rectangle",
        imageSize: "cover",
      },
    });
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
