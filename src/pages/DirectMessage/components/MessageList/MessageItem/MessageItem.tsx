import { MessageProps } from "../../../DirectMessage.Types"
import MyMessage from "./MyMessage/MyMessage"
import OthersMessage from "./OthersMessage/OthersMessage"

const MessageItem = ({ messageData, othersUserId }: MessageProps) => {
  const isMyMessage = othersUserId === messageData.receiver?._id

  if (isMyMessage) {
    return <MyMessage messageData={messageData} />
  }

  return <OthersMessage messageData={messageData} />
}

export default MessageItem
