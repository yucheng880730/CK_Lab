pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Color is ERC721Full {
    
  string[] public colors;
  uint public timeStamp;

  mapping(string => bool) _colorExists;

  constructor() ERC721Full("Color", "COLOR") public {
  }

  function Time_call() public returns (uint256) {
    return now;
  }

  function burn(uint256 tokenId) public {
    burn(tokenId);
  }

  // E.G. color = "#FFFFFF"(white)
  // Require unique color
  // Color - add it
  // Call the mint function
  // Color - track it
  function mint(string memory _color) public {
    require(!_colorExists[_color]);
    uint _id = colors.push(_color);
    _mint(msg.sender, _id);
    timeStamp = block.timestamp;
    _colorExists[_color] = true;
  }

}