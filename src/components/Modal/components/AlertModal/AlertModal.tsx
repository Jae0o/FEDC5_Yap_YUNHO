import * as GS from "../../ModalGlobal.Styles"
import * as S from "./AlertModal.Styles"

import { MouseEvent } from "react"

import CustomModal from "../CustomModal/CustomModal"

interface AlertModalProps {
  isShow: boolean
  alertMessage: string
  onClose: () => void
}

const AlertModal = ({ isShow, onClose, alertMessage }: AlertModalProps) => {
  const handleCloseModal = ({ target, currentTarget }: MouseEvent) => {
    if (target !== currentTarget) {
      return
    }

    onClose()
  }
  return (
    <CustomModal
      isShow={isShow}
      $height={20}
      onClickAway={onClose}
    >
      <S.AlertModalLayout>
        <S.AlertModalMessage>{alertMessage}</S.AlertModalMessage>
        <GS.ModalBottomActions>
          <GS.ModalButton onClick={handleCloseModal}>{"닫기"}</GS.ModalButton>
        </GS.ModalBottomActions>
      </S.AlertModalLayout>
    </CustomModal>
  )
}

export default AlertModal
