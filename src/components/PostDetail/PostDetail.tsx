import * as S from "./PostDetail.Styles"
import * as GS from "@/components/Modal/ModalGlobal.Styles"

import { useParams } from "react-router-dom"

import Modal from "../Modal/Modal"
import PostDetailInfo from "./components/PostDetailInfo/PostDetailInfo"
import PostDetailViewer from "./components/PostDetailViewer/PostDetailViewer"
import useGetPost from "./hooks/useGetPost"
import usePostDetailModalStore from "./stores/usePostDetailModalStore"

interface PostDetailProps {
  onClose: () => void
}

const PostDetail = ({ onClose }: PostDetailProps) => {
  const { isShowPostDetail } = usePostDetailModalStore()
  const { id } = useParams()
  const { post, isLoading } = useGetPost({ postId: id })

  if (!id) {
    onClose()
    return
  }

  if (isLoading) {
    return
  }

  return (
    <Modal
      isShow={isShowPostDetail}
      onClose={onClose}
      clickAwayEnable={true}
    >
      {post && (
        <GS.PostModalGlobalLayout>
          <GS.PostModalGlobalContainer>
            <PostDetailViewer post={post} />
          </GS.PostModalGlobalContainer>

          <S.PostDetailBoundary />

          <GS.PostModalGlobalContainer>
            <PostDetailInfo
              onClose={onClose}
              post={post}
            />
          </GS.PostModalGlobalContainer>
        </GS.PostModalGlobalLayout>
      )}
    </Modal>
  )
}

export default PostDetail
