import { useNavigate } from "react-router-dom"

import AlertModal from "@/components/Modal/components/AlertModal/AlertModal"
import useModal from "@/components/Modal/hooks/useModal"
import { SIGNUP_ERROR_MESSAGE } from "@/constants/errorMessage"
import useAuthUserStore from "@/stores/useAuthUserStore"
import { useMutation } from "@tanstack/react-query"

import { signupUploadPhoto } from "../apis/signupUploadPhoto"

const SIGNUP_SECOND_FORM_MUTATION_QUERY_KEY =
  "SIGNUP_SECOND_FORM_MUTATION_QUERY_KEY"

const useSignupSecondForm = () => {
  const { updateUser } = useAuthUserStore()
  const navigate = useNavigate()

  const {
    isShowModal: isShowAlertModal,
    showModal: showAlertModal,
    closeModal: closeAlertModal,
  } = useModal()

  const AlertModalComponent = isShowAlertModal && (
    <AlertModal
      isShow={isShowAlertModal}
      alertMessage={
        SIGNUP_ERROR_MESSAGE.SECOND_SIGNUP_REQUEST_ERROR.PROFILE_IMAGE
      }
      onClose={closeAlertModal}
    />
  )

  const SignupSecondForm_API = useMutation({
    mutationKey: [SIGNUP_SECOND_FORM_MUTATION_QUERY_KEY],
    mutationFn: signupUploadPhoto,
    onSuccess: (user) => {
      updateUser(user)
      navigate("/", { replace: true })
    },
    onError: () => {
      showAlertModal()
    },
  })

  return {
    AlertModalComponent,
    SignupSecondForm_API,
  }
}

export default useSignupSecondForm
