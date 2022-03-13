const sdk = require("api")("@opensea/v1.0#1j3wv35kyd6wqwc");

sdk["retrieving-a-single-contract-testnets"]({
  asset_contract_address: "0xa305620131981F309aB4FCe645c474AcF004B69d",
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
