import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from "../services/socket.service.js"

import { useState, useEffect, useRef } from 'react'

import {Icon} from 'monday-ui-react-core'
import { Info, Close } from 'monday-ui-react-core/icons'
export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>
      <Icon iconType={Icon.type.SVG} icon={Close} iconSize={14} />
      </button>
      <Icon iconType={Icon.type.SVG} icon={Info} iconSize={26} />
      {msg.txt}
    </section>
  )
}