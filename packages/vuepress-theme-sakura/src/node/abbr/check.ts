let crcRes = new Array<number>();

let checkCrc = function (res: number) {
    if (crcRes.indexOf(res) > -1) {
        res++;
        return checkCrc(res);
    } else {
        return res;
    }

}
let thisAdd = function (value: number) {
    crcRes.push(value);
}
exports.add = thisAdd;
exports.check = checkCrc;
