import { useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { MessageInputProps } from "../components/MessageList/MessageInput/MessageInput"
import useSendMessage from "./useSendMessage"

type EventType =
  | React.KeyboardEvent<HTMLTextAreaElement>
  | React.FormEvent<HTMLFormElement>

const useTextArea = ({
  scrollRef,
  setMessageListHeight,
}: MessageInputProps) => {
  const [textValue, setTextValue] = useState("")
  const { AlertModalComponent, sendMessage } = useSendMessage()
  const { userId: othersUserId } = useParams()
  const textRef = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    const { current } = textRef
    if (!current) {
      return
    }

    current.style.height = "0px"

    const scrollHeight = current.scrollHeight
    const style = window.getComputedStyle(current)
    const borderTop = parseInt(style.borderTop)
    const borderBottom = parseInt(style.borderBottom)

    current.style.height = scrollHeight + borderTop + borderBottom + "px"
    if (scrollRef.current) {
      setMessageListHeight(scrollRef.current.clientHeight)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { value } = e.target
    const { current } = textRef

    if (!current) {
      return
    }

    setTextValue(value)
    resize()
  }

  const handleSubmit = (e: EventType): void => {
    e.preventDefault()
    if (!othersUserId) {
      return
    }

    const messageSubmission = {
      message: textValue,
      receiver: othersUserId,
    }

    setTextValue("")
    sendMessage.mutate(messageSubmission)

    // 제출 후 원레 높이로 재조정
    if (textRef.current) {
      textRef.current.style.height = "18px"
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 조합중일 경우 이벤트 막음
    if (e.nativeEvent.isComposing) {
      return
    }

    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return {
    textValue,
    handleInputChange,
    handleSubmit,
    AlertModalComponent,
    textRef,
    handleEnter,
  }
}

export default useTextArea
