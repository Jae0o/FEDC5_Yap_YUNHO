import { useParams } from "react-router-dom"

import sendNotification from "@/apis/sendNotification"
import AlertModal from "@/components/Modal/components/AlertModal/AlertModal"
import useModal from "@/components/Modal/hooks/useModal"
import { DM_ERROR } from "@/constants/errorMessage"
import { Message } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import sendMessageAPI from "../apis/sendMessageAPI"
import { QUERY_KEY_GET_GROUP_MESSAGE_LIST } from "./useMessageGroupList"
import { QUERY_KEY_GET_MESSAGE_LIST } from "./useMessageList"

export const QUERY_KEY_SEND_MESSAGE = "SEND_MESSAGE"

const useSendMessage = () => {
  const queryClient = useQueryClient()
  const { userId: othersUserId } = useParams()
  const { isShowModal, showModal, closeModal } = useModal()

  const AlertModalComponent = isShowModal ? (
    <AlertModal
      isShow={isShowModal}
      alertMessage={DM_ERROR.SEND_MESSAGE}
      onClose={closeModal}
    />
  ) : null

  const sendMessage = useMutation({
    mutationKey: [QUERY_KEY_SEND_MESSAGE],
    mutationFn: sendMessageAPI,
    onSuccess: (response: Message) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_GET_MESSAGE_LIST] })
      if (!othersUserId) {
        return
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GET_GROUP_MESSAGE_LIST],
      })

      sendNotification({
        notificationType: "MESSAGE",
        notificationTypeId: response._id,
        userId: othersUserId,
      })
    },
    onError: () => {
      showModal()
    },
  })
  return { AlertModalComponent, sendMessage }
}

export default useSendMessage
