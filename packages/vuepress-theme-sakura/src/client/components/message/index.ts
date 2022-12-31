type Props = {
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  duration?: number
}
export default function Message({
  type,
  message,
  duration = 3000,
}: Props): void {
  if (!message) {
    return
  }
  const element = document.createElement('div')
  element.setAttribute('class', 'tip')
  element.classList.add(type)
  element.innerHTML = message
  document.body.appendChild(element)
  setTimeout(function () {
    element.classList.add('hide')
    setTimeout(function () {
      document.body.removeChild(element)
    }, 300)
  }, duration)
}
Message.info = (message: string, duration?: number) => {
  Message({ type: 'info', message, duration })
}

Message.success = (message: string, duration?: number) => {
  Message({ type: 'success', message, duration })
}

Message.warning = (message: string, duration?: number) => {
  Message({ type: 'warning', message, duration })
}

Message.error = (message: string, duration?: number) => {
  Message({ type: 'error', message, duration })
}
