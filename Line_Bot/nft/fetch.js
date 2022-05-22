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

  // nfts.ownedNfts.slice(0);
  // console.log(nfts);

  // NFTname = nfts.metadata.name;
  // TokenType = nfts.metadata.name;
  // Image_url = nfts.media[0].raw;

  let nameArray = [];
  let typeArray = [];
  let imageArray = [];
  let contractAddressArray = [];

  for (const nft of nfts.ownedNfts.slice(0, 5)) {
    const name = nft.metadata.name;
    const tokenType = nft.id.tokenMetadata.tokenType;
    const image_url = nft.media[0].gateway;
    const contractAddress = nft.contract;

    nameArray.push(name);
    typeArray.push(tokenType);
    imageArray.push(image_url);
    contractAddressArray.push(contractAddress.address);

    // console.log(name);
    // console.log(tokenType);
    // console.log(image_url);
  }
  return { nameArray, typeArray, imageArray, contractAddressArray };
}

// const test = await getNFTAsset("0x0928A0B5D4aa6ba63EB807011F7505a00220eaAF");
// console.log(test.imageArray);
// console.log(test.nameArray);
// console.log(test.typeArray);
// console.log(test.contractAddressArray);
