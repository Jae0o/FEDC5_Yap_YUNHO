import * as S from "./UserPostFilter.Styles"

import { useState } from "react"
import { useParams } from "react-router-dom"

import { USER_POST_FILTER_LIST } from "@/pages/Profile/constants/UserPost.Constants"
import useAuthUserStore from "@/stores/useAuthUserStore"

import UserPostFilterButton from "./UserPostFilterButton"

interface UserPostFilterProps {
  handlePostList: (isLikeFilter: boolean) => void
}

const UserPostFilter = ({ handlePostList }: UserPostFilterProps) => {
  const { userId } = useParams()
  const { user: authUser } = useAuthUserStore()
  const isMyPage = userId === authUser._id

  const [selectedButton, setSelectedButton] = useState(
    USER_POST_FILTER_LIST.create,
  )

  const handlePostFilterButton = (isLikeFilter = false) => {
    if (isLikeFilter) {
      setSelectedButton(USER_POST_FILTER_LIST.like)
      handlePostList(true)
    } else {
      setSelectedButton(USER_POST_FILTER_LIST.create)
      handlePostList(false)
    }
  }

  return (
    <S.UserPostFilterLayout $isMyPage={isMyPage}>
      <UserPostFilterButton
        $isSelected={selectedButton === USER_POST_FILTER_LIST.create}
        onClick={() => handlePostFilterButton(false)}
        title="작성한 게시물"
      />
      {isMyPage && (
        <UserPostFilterButton
          $isSelected={selectedButton === USER_POST_FILTER_LIST.like}
          onClick={() => handlePostFilterButton(true)}
          title="좋아요한 게시물"
        />
      )}
    </S.UserPostFilterLayout>
  )
}

export default UserPostFilter
