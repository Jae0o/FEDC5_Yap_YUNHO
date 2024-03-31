import * as S from "./UserPosts.Styles"

import { useState } from "react"

import UserPostFilter from "./components/UserPostFilter/UserPostFilter"
import MyLikePostList from "./components/UserPostList/MyLikePostList"
import UserCreatePostList from "./components/UserPostList/UserCreatePostList"
import useCreatePostList from "./hooks/useCreatePostList"

const UserPosts = () => {
  const [isSelectedLikeFilter, setIsSelectedLikeFilter] = useState(false)
  const { isLoading, createPostInfoList } = useCreatePostList()

  if (isLoading || !createPostInfoList) {
    return
  }
  return (
    <S.UserPostsLayout>
      <UserPostFilter
        handlePostList={(filter) => {
          setIsSelectedLikeFilter(filter)
        }}
      />

      {isSelectedLikeFilter ? (
        <MyLikePostList />
      ) : (
        <UserCreatePostList
          createPostInfoList={createPostInfoList}
          isLoading={isLoading}
        />
      )}
    </S.UserPostsLayout>
  )
}

export default UserPosts
