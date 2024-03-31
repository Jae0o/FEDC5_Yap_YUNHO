import * as S from "./UserEdit.Styles"

import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import useAuthUserStore from "@/stores/useAuthUserStore"

import UserEditForm from "./components/UserEditForm"

export default function UserEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuthUserStore()

  useEffect(() => {
    if (!id || !isLoggedIn || id !== user._id) {
      navigate("/", { replace: true })
    }
  }, [id, isLoggedIn, navigate, user._id])

  if (!user) {
    return
  }

  return (
    <S.UserEditLayout>
      <UserEditForm authUser={user} />
    </S.UserEditLayout>
  )
}
