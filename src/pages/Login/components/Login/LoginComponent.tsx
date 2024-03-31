import * as S from "./LoginComponent.Styles"

import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { theme } from "@/styles/theme"

import useLogin from "../../hooks/useLogin"
import LoginInputContainer from "./LoginInput/LoginInputContainer"

const LoginComponent = () => {
  const { userInfoRef, updateUserInfo, AlertModalComponent, loginApi } =
    useLogin()
  const navigate = useNavigate()

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { email, password } = userInfoRef.current

    if (email === "" || password === "") {
      return
    }
    loginApi.mutate({ email, password })
  }

  return (
    <>
      {AlertModalComponent}
      <S.LoginComponentLayout>
        <S.LoginComponentTitle>{"로그인"}</S.LoginComponentTitle>
        <S.LoginForm onSubmit={handleLogin}>
          <LoginInputContainer
            updateUserInfo={updateUserInfo}
            type="text"
            name="email"
            placeholder="이메일"
          />
          <LoginInputContainer
            updateUserInfo={updateUserInfo}
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <S.ButtonContainer>
            <S.Button
              type="submit"
              $color={theme.colors.point}
            >
              {"로그인"}
            </S.Button>
            <S.Button
              type="button"
              $color={theme.colors.sub_alt}
              onClick={() => navigate("/signup")}
            >
              {"회원가입"}
            </S.Button>
          </S.ButtonContainer>
        </S.LoginForm>
      </S.LoginComponentLayout>
    </>
  )
}

export default LoginComponent
