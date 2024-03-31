import { Navigate } from "react-router-dom"

import useAuthUserStore from "@/stores/useAuthUserStore"

import * as S from "./Login.styles"
import LoginComponent from "./components/Login/LoginComponent"
import ServiceInfoComponent from "./components/ServiceInfo/ServiceInfoComponent"

export default function Login() {
  const { isLoggedIn } = useAuthUserStore()

  return (
    <>
      {isLoggedIn ? (
        <Navigate
          to="/"
          replace={true}
        />
      ) : (
        <S.LoginLayout>
          <S.LoginComponentContainer>
            <ServiceInfoComponent />
            <LoginComponent />
          </S.LoginComponentContainer>
        </S.LoginLayout>
      )}
    </>
  )
}
