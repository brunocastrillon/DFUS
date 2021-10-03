function TimestampFormatter(dateTime: number) {

    var timestamp = new Date(+dateTime);
    var date = timestamp.getDate();
    var month = timestamp.getMonth();
    var year = timestamp.getFullYear();
    var hours = timestamp.getHours();
    var minutes = "0" + timestamp.getMinutes();
    var seconds = "0" + timestamp.getSeconds();

    var formattedTime = date + '-' + month + '-' + year; //hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;

}

export default TimestampFormatter;