import * as S from "./PostDetailUser.Styles"

import { useEffect, useMemo, useRef, useState } from "react"

import standardImage from "@/assets/standard.jpeg"
import useFetchFollow from "@/hooks/useFetchFollow"
import useFetchUnFollow from "@/hooks/useFetchUnFollow"
import useAuthUserStore from "@/stores/useAuthUserStore"
import { Post } from "@/types"
import { getConvertedCount } from "@/util/getConvertedCount"
import { debounce } from "@mui/material"

interface PostDetailInfoUserProps {
  isMyPost: boolean
  post: Post
  onClick?: () => void
}

interface ChangeFollowProps {
  nextState: boolean
  isFollow: boolean
  followId?: string
}

const PostDetailUser = ({
  post,
  isMyPost,
  onClick,
}: PostDetailInfoUserProps) => {
  const { user, isLoggedIn } = useAuthUserStore()
  const { fetchFollowMutate, FollowErrorAlertModal } = useFetchFollow()
  const { fetchUnFollowMutate, UnFollowErrorAlertModal } = useFetchUnFollow()

  const [followState, setFollowState] = useState(false)

  const { author } = post
  const { image, fullName, followers } = author

  const hasFollowingData = useMemo(
    () => user.following.find((following) => following.user === author._id),
    [author._id, user.following],
  )
  const isFollowUser = useMemo(() => !!hasFollowingData, [hasFollowingData])

  useEffect(() => {
    setFollowState(isFollowUser)
  }, [isFollowUser])

  const handleClickFollow = () => {
    setFollowState((prevState) => {
      changeFollow({
        nextState: !prevState,
        isFollow: isFollowUser,
        followId: hasFollowingData?._id,
      })

      return !prevState
    })
  }

  const changeFollow = useRef(
    debounce(({ nextState, isFollow, followId }: ChangeFollowProps) => {
      if (nextState === isFollow) {
        return
      }

      if (!nextState && followId) {
        fetchUnFollowMutate.mutate(followId)
        return
      }

      if (nextState) {
        fetchFollowMutate.mutate(author._id)
      }
    }, 1000),
  ).current

  const imageSrc = image ? image : standardImage

  const followerCount = useMemo(() => {
    if (!followState && isFollowUser) {
      return getConvertedCount(followers.length - 1)
    }

    if (followState && !isFollowUser) {
      return getConvertedCount(followers.length + 1)
    }

    return getConvertedCount(followers.length)
  }, [followState, followers.length, isFollowUser])

  return (
    <S.PostDetailUserLayout>
      <S.PostDetailUserContainer>
        <S.PostDetailUserProfile
          onClick={onClick}
          $src={imageSrc}
        />
        <S.PostDetailUserInfo>
          <S.PostDetailUserName onClick={onClick}>
            {fullName}
          </S.PostDetailUserName>

          <S.PostDetailUserFollower>
            {`팔로워 ${followerCount}`}
          </S.PostDetailUserFollower>
        </S.PostDetailUserInfo>
      </S.PostDetailUserContainer>

      {isLoggedIn && !isMyPost && (
        <S.PostDetailFollowButton
          disabled={
            fetchFollowMutate.isPending || fetchUnFollowMutate.isPending
          }
          onClick={handleClickFollow}
        >
          {followState ? "언 팔로우" : "팔로우"}
        </S.PostDetailFollowButton>
      )}

      {FollowErrorAlertModal}
      {UnFollowErrorAlertModal}
    </S.PostDetailUserLayout>
  )
}

export default PostDetailUser
