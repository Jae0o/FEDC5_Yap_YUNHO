import * as S from "./PostDetailInfo.Styles"

import { useNavigate } from "react-router-dom"

import useAuthUserStore from "@/stores/useAuthUserStore"
import { Post } from "@/types"

import PostDetailComment from "./components/PostDetailComment/PostDetailComment"
import PostDetailStatus from "./components/PostDetailStatus/PostDetailStatus"
import PostDetailUser from "./components/PostDetailUser/PostDetailUser"

interface PostDetailInfoProps {
  onClose: () => void
  post: Post
}

const PostDetailInfo = ({ onClose, post }: PostDetailInfoProps) => {
  const { user, isLoggedIn } = useAuthUserStore()
  const navigate = useNavigate()
  const isMyPost = user._id === post.author._id

  return (
    <S.PostDetailInfoLayout>
      <PostDetailUser
        post={post}
        isMyPost={isMyPost}
        onClick={() => navigate(`/profile/${post.author._id}`)}
      />
      <S.PostDetailInfoBoundary />
      <PostDetailStatus
        post={post}
        authUser={user}
        isMyPost={isMyPost}
        isLogin={isLoggedIn}
        onClose={onClose}
      />
      <S.PostDetailInfoBoundary />
      <PostDetailComment post={post} />
    </S.PostDetailInfoLayout>
  )
}

export default PostDetailInfo
