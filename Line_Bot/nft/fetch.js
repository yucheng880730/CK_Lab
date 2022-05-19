// https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-quickstart-guide
// alchemy-nft-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import dotenv from "dotenv";

// print user wallet address
export async function getEthAddress(_address) {
  // The wallet address want to query for NFTs
  const ownerAddress = _address;
  return ownerAddress;
}

// get NFT amounts of given address
export async function getNFTNumber(_address) {
  // Initialize an alchemy-web3 instance:
  const web3 = createAlchemyWeb3(
    `https://eth-rinkeby.alchemyapi.io/v2/-9ADjLXwgWeJJFdhWDROIT5QKGzA-2jz`
  );
  const ownerAddress = _address;
  const nfts = await web3.alchemy.getNfts({
    owner: ownerAddress,
  });
  return nfts.totalCount;
}

// getNFT function for NFT metadata
export async function getNFTAsset(_address) {
  dotenv.config();
  const API_KEY = process.env.ALCHEMY_API;

  // Initialize an alchemy-web3 instance:
  const web3 = createAlchemyWeb3(
    `https://eth-rinkeby.alchemyapi.io/v2/-9ADjLXwgWeJJFdhWDROIT5QKGzA-2jz`
  );

  // The wallet address want to query for NFTs
  const ownerAddress = _address;

  const nfts = await web3.alchemy.getNfts({
    owner: ownerAddress,
  });

  for (const nft of nfts.ownedNfts.slice(0, 5)) {
    const name = nft.metadata.name;
    const tokenType = nft.id.tokenMetadata.tokenType;
    const image_url = nft.media[0].raw;

    // return name, tokenType, image_url;
    console.log(name);
    console.log(tokenType);
    console.log(image_url);
  }
}
