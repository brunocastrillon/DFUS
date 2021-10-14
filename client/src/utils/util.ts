import CryptoJS from "crypto-js";

export function formatTimeStamp(dateTime: number) {
    var timestamp = new Date(+dateTime);
    var date = timestamp.getDate();
    var month = timestamp.getMonth()+1;
    var year = timestamp.getFullYear();
    // var hours = timestamp.getHours();
    // var minutes = "0" + timestamp.getMinutes();
    // var seconds = "0" + timestamp.getSeconds();
    console.log(month);        
    var formattedTime = date + '-' + month + '-' + year;

    return formattedTime;
}

export async function generateHash(file: any) {
    // const data = file.buffer;
    const SHA256 = CryptoJS.algo.SHA256.create();
    const wordBuffer = CryptoJS.lib.WordArray.create(file);

    SHA256.update(wordBuffer);

    const encrypted = SHA256.finalize().toString();

    return encrypted;
}