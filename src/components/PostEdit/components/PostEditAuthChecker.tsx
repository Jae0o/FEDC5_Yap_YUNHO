import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import AlertModal from "@/components/Modal/components/AlertModal/AlertModal"
import useModal from "@/components/Modal/hooks/useModal"
import { POST_EDIT_ERROR_MESSAGE } from "@/constants/errorMessage"
import useAuthUserStore from "@/stores/useAuthUserStore"

interface PostEditAuthCheckerProps {
  children: React.ReactNode
  authorId: string
  onCloseInnerModal: () => void
}

const PostEditAuthChecker = ({
  children,
  onCloseInnerModal,
  authorId,
}: PostEditAuthCheckerProps) => {
  const navigate = useNavigate()
  const { isShowModal, showModal } = useModal()
  const [alertMessage, setAlertMessage] = useState("")
  const { isLoggedIn, user } = useAuthUserStore()

  const handleCloseModal = useCallback(() => {
    onCloseInnerModal()
    navigate("/")
  }, [navigate, onCloseInnerModal])

  useEffect(() => {
    if (!isLoggedIn) {
      setAlertMessage(POST_EDIT_ERROR_MESSAGE.AUTH_CHECKER.NOT_LOGIN)
      showModal()
      return
    }

    if (authorId !== "newPost" && authorId !== user._id) {
      setAlertMessage(POST_EDIT_ERROR_MESSAGE.AUTH_CHECKER.NO_PERMISSION)
      showModal()
      return
    }
  }, [authorId, isLoggedIn, showModal, user._id])

  return (
    <>
      {!alertMessage && <>{children}</>}

      <AlertModal
        isShow={isShowModal}
        alertMessage={alertMessage}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default PostEditAuthChecker
