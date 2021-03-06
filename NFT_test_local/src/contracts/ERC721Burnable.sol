pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract ERC721Burnable is ERC721Full {

  function burn(uint256 tokenId) public {
    require(_isApprovedOrOwner(msg.sender, tokenId));
    _burn(ownerOf(tokenId), tokenId);
  }
  
}