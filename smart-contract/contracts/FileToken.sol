// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract FileToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _idToken;
    using Strings for uint256;

    mapping(uint256 => mapping(uint256 => uint256)) private _tokenList;
    mapping(uint256 => uint256) private _tokenCounter;

    event TokenMinted(address indexed owner, string uri, uint256 id);

    constructor() ERC721( "FileToken", "FTK") {}

    function create
    (
        address owner,
        string memory uri
    )
        public
        returns (uint256 id)
    {
        _idToken.increment();
        uint256 idNewToken = _idToken.current();

        _mint(owner, idNewToken);
        _setTokenURI(idNewToken, uri);

        emit TokenMinted(owner, uri, idNewToken);
        
        return idNewToken;
    }    
}