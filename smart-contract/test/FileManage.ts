import assert = require('assert');
import {
    accounts,
    contract
} from '@openzeppelin/test-environment';

const truffleAssert = require('truffle-assertions');
const FileManage = contract.fromArtifact('FileManage');

const [_owner, _sender] = accounts;
const _content = "QmW8LsLjznWHQs2GDrxJkem6dc93dVQj9xLDT1uAK6Yugd";
const _name = "arquivo-teste.pdf";
const _type = "application/pdf";
const _dateTime = (new Date()).getTime();

describe("Alexandria-File-Manage-Test", () => {

    it("Ao adicionar um novo arquivo, deverá retornar o evento: fileAdded", async () => {
        let fileManage = await FileManage.new();
        let file = await fileManage.add(_content, _name, _type, _dateTime, { from: _sender });

        truffleAssert.eventEmitted(file, 'fileAdded', (ev: { sender: string; content: any; }) => {
            return ev.sender === _sender && ev.content === _content;
        });
    });

    it("Deverá retornar informações do arquivo", async () => {
        let fileManage = await FileManage.new();
        await fileManage.add(_content, _name, _type, _dateTime, { from: _sender });
        let file = await fileManage.read(0, { from: _sender });

        assert.equal(_content, file.fileContent);
        assert.equal(_name, file.fileName);
        assert.equal(_type, file.fileType);
        assert.equal(_dateTime, file.dateTime);
    });

    it("Deverá retornar o total de arquivos", async () => {
        let fileManage = await FileManage.new();
        await fileManage.add(_content, _name, _type, _dateTime, { from: _sender });
        let arquivos = await fileManage.total({ from: _sender });
        
        assert.equal(arquivos, 1);
    });    
});