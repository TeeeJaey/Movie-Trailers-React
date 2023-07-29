function pad(number, length) {
    var str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

export function DateToString(date) {
    var yyyy = date.getFullYear().toString();
    var MM = pad(date.getMonth() + 1, 2);
    var dd = pad(date.getDate(), 2);
    var hh = pad(date.getHours(), 2);
    var mm = pad(date.getMinutes(), 2);
    var ss = pad(date.getSeconds(), 2);

    return yyyy + MM + dd + hh + mm + ss;
}

export function splitList(list, parts) {
    let pages = [];
    let currPage = [];
    for (let i = 0; i < list.length; i++) {
        if (i % parts === 0) {
            pages.push(currPage);
            currPage = [];
        }
        currPage.push(list[i]);
    }

    if (currPage !== []) pages.push(currPage);

    return pages;
}
