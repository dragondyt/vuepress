export function getSymbols(post): number {
  return post.length || post.content?.length || 0
}

export function getSymbolsTotal(database): number {
  let symbolsResultCount = 0
  database
    .model('Post')
    .find({})
    .forEach((post) => {
      symbolsResultCount += getSymbols(post)
    })
  return symbolsResultCount
}

export function getSymbolsCountTotal(database): string {
  const symbolsResultTotal = getSymbolsTotal(database)
  return symbolsResultTotal < 1000000
    ? Math.round(symbolsResultTotal / 1000) + 'k' // < 999k => 111k
    : Math.round(symbolsResultTotal / 100000) / 10 + 'm' // > 999k => 1.1m
}

export function getFormatTime(minutes, suffix): string {
  const fHours = Math.floor(minutes / 60)
  let fMinutes = Math.floor(minutes - fHours * 60)
  if (fMinutes < 1) {
    fMinutes = 1 // 0 => 1
  }
  return fMinutes + ''
}

export function symbolsTimeTotal(database): string {
  const minutes = Math.round(getSymbolsTotal(database) / (4 * 275))
  return getFormatTime(minutes, 'mins.')
}

export function symbolsCount(post): string {
  const symbolsResult = getSymbols(post)
  if (symbolsResult > 9999) {
    return Math.round(symbolsResult / 1000) + 'k' // > 9999 => 11k
  } else if (symbolsResult > 999) {
    return Math.round(symbolsResult / 100) / 10 + 'k' // > 999 => 1.1k
  } // < 999 => 111
  return symbolsResult + ' '
}

export function symbolsTime(
  post,
  awl = 4,
  wpm = 275,
  suffix = 'mins.'
): string {
  const minutes = Math.round(getSymbols(post) / (awl * wpm))
  return getFormatTime(minutes, suffix)
}
