import { useCallback, useEffect, useRef, useState } from "react"

export function useAutoScroll(dependencies) {
  const scrollRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [autoScroll, setAutoScroll] = useState(true)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom()
    }
  }, [dependencies, autoScroll, scrollToBottom])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const bottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10
    setIsAtBottom(bottom)
    setAutoScroll(bottom)
  }, [])

  return {
    scrollRef,
    isAtBottom,
    autoScroll,
    scrollToBottom,
    handleScroll,
    setAutoScroll,
  }
}
