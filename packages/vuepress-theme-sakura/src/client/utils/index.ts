import $ from './dom.js'

export const getDocHeight = function (): number {
  return $('main > .inner').offsetHeight
}
export * from './dom.js'
export * from './useLazyComp.js'
export * from './animationUtil.js'
