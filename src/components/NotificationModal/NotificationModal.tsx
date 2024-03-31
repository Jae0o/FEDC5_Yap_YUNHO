import * as S from "./NotificationModal.Styles"

import useGetNotification from "@/components/NotificationModal/hooks/useGetNotification"

import CustomModal from "../Modal/components/CustomModal/CustomModal"
import NotificationList from "./components/NotificationList/NotificationList"
import NotificationTitle from "./components/NotificationTitle/NotificationTitle"

interface NotificationModalProps {
  isShow: boolean
  onClose: () => void
}

const NotificationModal = ({ isShow, onClose }: NotificationModalProps) => {
  const { NotificationListData } = useGetNotification()
  return (
    <CustomModal
      isShow={isShow}
      onClickAway={onClose}
      $width={44}
      $height={54}
    >
      <S.NotificationContainer>
        <NotificationTitle NotificationListData={NotificationListData} />
        <NotificationList
          NotificationListData={NotificationListData}
          onClose={onClose}
        />
      </S.NotificationContainer>
    </CustomModal>
  )
}
export default NotificationModal
