// alchemy-nft-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.ALCHEMY_API;

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-rinkeby.alchemyapi.io/v2/-9ADjLXwgWeJJFdhWDROIT5QKGzA-2jz`
);

// The wallet address we want to query for NFTs
const ownerAddress = "0x909A1228EC026e3100FC700921dcA1c67eA93d63";

const nfts = await web3.alchemy.getNfts({
  owner: ownerAddress,
});

// Print owner's wallet address:
console.log("fetching NFTs for address:", ownerAddress);
console.log("...");

// Print total NFT count returned in the response:
console.log("number of NFTs found:", nfts.totalCount);
console.log("...");

// Print contract address and tokenId for each NFT:
for (const nft of nfts.ownedNfts) {
  console.log("===");
  console.log("contract address:", nft.contract.address);
  console.log("token ID:", nft.id.tokenId);
}
console.log("===");

// Fetch metadata for a particular NFT:
console.log("fetching metadata for a crypto coven NFT...");
const response = await web3.alchemy.getNftMetadata({
  contractAddress: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  tokenId: "1590",
});

// Uncomment this line to see the full api response:
// console.log(metadata);

// Print some commonly used fields:
console.log("NFT name: ", response.title);
console.log("token type: ", response.id.tokenMetadata.tokenType);
console.log("tokenUri: ", response.tokenUri.gateway);
console.log("image url: ", response.metadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("===");
