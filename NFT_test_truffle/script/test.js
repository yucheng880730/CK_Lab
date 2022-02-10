const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const MNEMONIC = process.env.MNEMONIC;
const API_KEY = process.env.NODE_URL;

const NFT_CONTRACT_ADDRESS = "0xf08c5E60e3e2a1c0F8D1a7A4c4ED6Fe9D6dc1159";
const OWNER_ADDRESS = "0x909A1228EC026e3100FC700921dcA1c67eA93d63";
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`;
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`;
const NUM_ITEMS = 5;

let rawdata = fs.readFileSync(
  path.resolve(__dirname, "../build/contracts/LeoToken.json")
);
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi;

async function test() {
  try {
    const provider = new HDWalletProvider(MNEMONIC, MUMBAI);
    const web3Instance = new web3(provider);

    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );

    //? Edit: Check the uri of token 1.

    await nftContract.methods
      .tokenURI(1)
      .call()
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
}

test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
