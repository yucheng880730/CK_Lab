pragma solidity 0.4.17;

contract EthPriceOracleInterface {
  function getLatestEthPrice() public returns (uint256);
}