import * as S from "./SearchResult.Styles"
import * as SS from "./components/SearchResultList.Styles"

import { SEARCH_RESULT_COUNT } from "../../SearchModal.Constants"
import {
  SearchQueryResult,
  SearchResultProps,
  TypeProp,
} from "../../SearchModal.Types"
import useSearchResult from "../../hooks/useSearchResult"
import SearchResultItem from "./components/SearchResultItem/SearchResultItem"

const SearchResult = ({
  keyword,
  selectedFilter,
  onClickResultItem,
}: SearchResultProps) => {
  const results = useSearchResult({ keyword, selectedFilter })

  if (!keyword) {
    return
  }

  const users = results
    ?.filter(({ type }: TypeProp) => type === "user")
    .map((userInfo: SearchQueryResult) => (
      <SearchResultItem
        key={userInfo.id}
        resultInfo={userInfo}
        onClickResultItem={onClickResultItem}
      />
    ))

  const posts = results
    ?.filter(({ type }: TypeProp) => type === "post")
    .map((postInfo: SearchQueryResult) => (
      <SearchResultItem
        key={postInfo.id}
        resultInfo={postInfo}
        onClickResultItem={onClickResultItem}
      />
    ))

  const userResultElemntList = () => {
    return (
      <SS.SearchResultListLayout $isSelected={selectedFilter === "users"}>
        <SS.SearchResultListTitle>{"사용자"}</SS.SearchResultListTitle>
        {users?.length > 0 ? (
          users.slice(0, SEARCH_RESULT_COUNT)
        ) : (
          <S.SearchNoResultConatiner>
            {keyword && "검색 결과가 없습니다"}
          </S.SearchNoResultConatiner>
        )}
      </SS.SearchResultListLayout>
    )
  }

  const postResultElemntList = () => {
    return (
      <SS.SearchResultListLayout $isSelected={selectedFilter === "posts"}>
        <SS.SearchResultListTitle>{"포스트"}</SS.SearchResultListTitle>
        {posts?.length > 0 ? (
          posts.slice(0, SEARCH_RESULT_COUNT)
        ) : (
          <S.SearchNoResultConatiner>
            {"검색 결과가 없습니다"}
          </S.SearchNoResultConatiner>
        )}
      </SS.SearchResultListLayout>
    )
  }

  return (
    <S.SearchResultLayout>
      {selectedFilter !== "posts" && userResultElemntList()}
      {selectedFilter !== "users" && postResultElemntList()}
    </S.SearchResultLayout>
  )
}

export default SearchResult
