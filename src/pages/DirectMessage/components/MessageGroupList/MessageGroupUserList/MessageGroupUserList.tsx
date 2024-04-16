import * as S from "./MessageGroupUserList.Styles"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { AUTH_API } from "@/apis/Api"
import decideChatUserName from "@/pages/DirectMessage/utils/decideChatUserName"
import { Conversation, User } from "@/types"

import { handleMessageGroupClickProps } from "../../../DirectMessage.Types"
import MessageGroupItem from "./MessageGroupItem/MessageGroupItem"

interface MessageGroupUserListProps {
  MessageGroupList: Conversation[]
}

const MessageGroupUserList = ({
  MessageGroupList,
}: MessageGroupUserListProps) => {
  const [selectedMessageGroupId, setSelectedMessageGroupId] = useState("")
  const navigate = useNavigate()

  const updateSeenMessage = async (others: User) => {
    await AUTH_API.put("/messages/update-seen", {
      sender: others._id,
    })
  }

  const handleMessageGroupClick = ({
    myId,
    receiver,
    sender,
  }: handleMessageGroupClickProps) => {
    const others = decideChatUserName({ myId, receiver, sender })
    navigate(`/directmessage/${others._id}`)
    setSelectedMessageGroupId(others._id)
    updateSeenMessage(others)
  }

  return (
    <S.MessageGroupListContainer>
      {MessageGroupList?.map((messageGroupItem: Conversation) => {
        return (
          <MessageGroupItem
            handleMessageGroupClick={handleMessageGroupClick}
            messageGroupItem={messageGroupItem}
            selectedMessageGroupId={selectedMessageGroupId}
          />
        )
      })}
    </S.MessageGroupListContainer>
  )
}

export default MessageGroupUserList
