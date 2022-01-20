// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; 

import "./ERC721.sol";

string constant name = "LeoToken";

string constant symbol = "LEO";

contract LeoToken is ERC721(name, symbol) {

}