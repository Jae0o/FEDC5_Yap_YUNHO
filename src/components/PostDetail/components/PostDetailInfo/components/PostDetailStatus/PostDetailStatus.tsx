import * as S from "./PostDetailStatus.Styles"

import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import sendNotification from "@/apis/sendNotification"
import ConfirmModal from "@/components/Modal/components/ConfirmModal/ConfirmModal"
import useModal from "@/components/Modal/hooks/useModal"
import useLikePost from "@/components/PostDetail/hooks/useLikePost"
import useUnLikePost from "@/components/PostDetail/hooks/useUnLikePost"
import { POST_DETAIL_MODAL_MESSAGE } from "@/constants/modalMessage"
import { Like, Post, User } from "@/types"
import { getConvertedCount } from "@/util/getConvertedCount"
import LinkIcon from "@mui/icons-material/Link"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import { debounce } from "@mui/material"

import PostDetailEditActions from "./components/PostDetailEditActions"

interface PostDetailStatusProps {
  post: Post
  authUser: User
  isMyPost: boolean
  isLogin: boolean
  onClose: () => void
}

interface ChangePostLikeProps {
  nextState: boolean
  isLikePost: boolean
  id: string | undefined
}

const PostDetailStatus = ({
  post,
  authUser,
  isMyPost,
  isLogin,
  onClose,
}: PostDetailStatusProps) => {
  const {
    isShowModal: isShowConfirm,
    closeModal: closeConfirm,
    showModal: showConfirm,
  } = useModal()

  const navigate = useNavigate()
  const { fetchLikeMutate, LikeErrorAlertModal } = useLikePost()
  const { fetchUnlikeMutate, UnLikeErrorAlertModal } = useUnLikePost()
  const { mutate: likeMutate, isPending: isLikePending } = fetchLikeMutate
  const { mutate: unLikeMutate, isPending: isUnLikePending } = fetchUnlikeMutate

  const { likes } = post

  const myLikePost = useMemo(
    () => likes.find((likeData) => likeData.user === authUser._id),
    [authUser._id, likes],
  )
  const isMyLikePost = !!myLikePost

  const [isLike, setIsLike] = useState(false)

  useEffect(() => {
    setIsLike(isMyLikePost)
  }, [isMyLikePost])

  const handleClickLikeButton = () => {
    if (!isLogin) {
      showConfirm()
      return
    }

    if (isLikePending || isUnLikePending) {
      return
    }

    setIsLike((state) => {
      changePostLike({
        nextState: !state,
        isLikePost: isMyLikePost,
        id: myLikePost?._id,
      })
      return !state
    })
  }

  const changePostLike = useRef(
    debounce(({ nextState, isLikePost, id }: ChangePostLikeProps) => {
      if (nextState === isLikePost) {
        return
      }

      if (!nextState && id) {
        unLikeMutate(id)
        return
      }

      likeMutate(post._id, {
        onSuccess: (response: Like) => {
          sendNotification({
            notificationType: "LIKE",
            notificationTypeId: response._id,
            userId: post.author._id,
            postId: post._id,
          })
        },
      })
    }, 1000),
  ).current

  const likeCount = useMemo(() => {
    if (isLike && !isMyLikePost) {
      return likes.length + 1
    }

    if (!isLike && isMyLikePost) {
      return likes.length - 1
    }

    return likes.length
  }, [isLike, isMyLikePost, likes.length])

  const handleConfirm = (isAccept: boolean) => {
    if (isAccept) {
      onClose()
      navigate("/login")
      return
    }

    closeConfirm()
  }

  return (
    <>
      <S.PostDetailStatusLayout>
        <S.PostDetailStatusActions>
          <S.PostDetailLike
            $isMyLikePost={isLike}
            onClick={handleClickLikeButton}
            disabled={isLikePending || isUnLikePending}
          >
            {isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}

            {getConvertedCount(likeCount)}
          </S.PostDetailLike>

          <S.PostDetailLink
            href={post.title.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon />
          </S.PostDetailLink>
        </S.PostDetailStatusActions>

        {isMyPost && (
          <PostDetailEditActions
            onClose={onClose}
            post={post}
          />
        )}
      </S.PostDetailStatusLayout>

      <ConfirmModal
        isShow={isShowConfirm}
        onClose={handleConfirm}
        message={POST_DETAIL_MODAL_MESSAGE.CONFIRM.LIKE_NOT_LOGIN}
      />

      {LikeErrorAlertModal}
      {UnLikeErrorAlertModal}
    </>
  )
}

export default PostDetailStatus
