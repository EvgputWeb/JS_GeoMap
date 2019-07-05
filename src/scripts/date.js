export default function unixToDateStr(timestamp) {
    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDay();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    // let seconds = date.getSeconds();

    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    return day+'-'+month+'-'+year+', '+ hours+':'+minutes;
}
