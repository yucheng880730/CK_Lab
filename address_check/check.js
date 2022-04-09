const createKeccakHash = require("keccak");

function toChecksumAddress(address) {
  address = address.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }
  console.log(ret);
  return ret;
}

toChecksumAddress("0x909a1228ec026e3100fc700921dca1c67ea93d63");
