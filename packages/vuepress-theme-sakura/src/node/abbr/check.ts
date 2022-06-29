const crcRes = new Array<number>()

const checkCrc = function (res: number) {
  if (crcRes.indexOf(res) > -1) {
    res++
    return checkCrc(res)
  } else {
    return res
  }
}
const thisAdd = function (value: number) {
  crcRes.push(value)
}
exports.add = thisAdd
exports.check = checkCrc
