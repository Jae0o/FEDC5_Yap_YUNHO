import * as S from "./PostEditInput.Styles"

import { ChangeEvent } from "react"

import { HandleEditPost } from "@/components/PostEdit/PostEdit.Types"
import { POST_EDIT_PLACEHOLDER_MESSAGE } from "@/constants/placeholderMessage"

interface PostEditInputProps {
  text: string
  onEdit: HandleEditPost
}

const PostEditInput = ({ text, onEdit }: PostEditInputProps) => {
  const handleEditInput = ({ target }: ChangeEvent) => {
    if (!(target instanceof HTMLTextAreaElement)) {
      return
    }
    onEdit({
      type: "content",
      value: target.value,
    })
  }

  return (
    <S.PostEditInputLayout>
      <S.PostEditInputTitle>제목</S.PostEditInputTitle>
      <S.PostEditInput
        value={text}
        placeholder={POST_EDIT_PLACEHOLDER_MESSAGE.CONTENT_INPUT}
        onChange={handleEditInput}
      />
    </S.PostEditInputLayout>
  )
}

export default PostEditInput
