const $ = function (selector: string, element?: Document): any {
  element = element || document
  if (selector.indexOf('#') === 0) {
    return element.getElementById(selector.replace('#', ''))
  }
  return element.querySelector(selector)
}
$.all = function (selector: string, element) {
  element = element || document
  return element.querySelectorAll(selector)
}
$.each = function (selector: string, callback, element?) {
  return $.all(selector, element).forEach(callback)
}
if (!__VUEPRESS_SSR__) {
  Object.assign(HTMLElement.prototype, {
    _class: function (type, className, display?) {
      const classNames = className.indexOf(' ')
        ? className.split(' ')
        : [className]
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that: any = this
      classNames.forEach(function (name) {
        if (type === 'toggle') {
          that.classList.toggle(name, display)
        } else {
          that.classList[type](name)
        }
      })
    },
    addClass: function (className) {
      this._class('add', className)
      return this
    },
    hasClass: function (this: any, className) {
      return this.classList.contains(className)
    },
  })
}
export default $
