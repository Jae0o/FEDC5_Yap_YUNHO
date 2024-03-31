import * as S from "./LoginInputContainer.Styles"

import type { UpdateUserInfo } from "../../../types"
import LoginInputItem from "./LoginInputItem"

interface LoginInputContainerProps {
  updateUserInfo: UpdateUserInfo
  type: string
  name: string
  placeholder: string
}

const LoginInputContainer = ({
  updateUserInfo,
  type,
  name,
  placeholder,
}: LoginInputContainerProps) => {
  return (
    <S.LoginInputContainerLayout>
      <LoginInputItem
        updateUserInfo={updateUserInfo}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </S.LoginInputContainerLayout>
  )
}

export default LoginInputContainer
