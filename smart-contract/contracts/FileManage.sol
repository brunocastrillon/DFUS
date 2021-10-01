// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract FileManage {
    struct File {
        string Content;
        string Name;
        string Type;
        uint DateTime;
    }
    mapping(address => File[]) _files;

    event fileAdded(address sender, string content);

    constructor() { }

    function add
    (
        string memory fileContent,
        string memory fileName,
        string memory fileType,
        uint dateTime,
    )
        public
    {
        _files[msg.sender].push(File({
            Content: fileContent,
            Name: fileName,
            Type: fileType,
            DateTime: dateTime,
        }));

        emit fileAdded(msg.sender, fileContent);
    }

    function read
    (
        uint index
    )
        public
        view
        returns
        (
            string memory fileContent,
            string memory fileName,
            string memory fileType,
            uint dateTime
        )
    {
        File memory file = _files[msg.sender][index];
        return (
            file.Content,
            file.Name,
            file.Type,
            file.DateTime
        );
    }

    function total()
        public
        view
        returns (uint)
    {
        return _files[msg.sender].length;
    }    
}