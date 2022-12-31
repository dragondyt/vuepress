const crcRes = new Array<number>()
export const check = function (res: number): number {
  if (crcRes.indexOf(res) > -1) {
    res++
    return check(res)
  } else {
    return res
  }
}
export const add = function (value: any): void {
  crcRes.push(value)
}
