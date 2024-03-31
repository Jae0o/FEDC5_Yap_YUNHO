import * as S from "./SearchModal.Styles"

import { useState } from "react"

import Modal from "../Modal/Modal"
import { SearchFilter } from "./SearchModal.Types"
import SearchInput from "./components/SearchInput/SearchInput"
import SearchResult from "./components/SearchResult/SearchResult"
import useSearchModalStore from "./stores/useSearchModalStore"

const SearchModal = () => {
  const [keyword, setKeyword] = useState("")
  const [searchFilter, setSearchFilter] = useState<SearchFilter>("all")
  const { isShowSearchModal, closeSearchModal } = useSearchModalStore()

  const handleCloseModal = () => {
    closeSearchModal()
    setKeyword("")
  }

  return (
    <Modal
      isShow={isShowSearchModal}
      onClose={handleCloseModal}
      clickAwayEnable={true}
    >
      <S.SearchLayout>
        <SearchInput
          handleKeyword={(keyword: string) => setKeyword(keyword)}
          onSelectFilter={(filter: SearchFilter) => setSearchFilter(filter)}
        />
        <SearchResult
          keyword={keyword}
          selectedFilter={searchFilter}
          onClickResultItem={() => setKeyword("")}
        />
      </S.SearchLayout>
    </Modal>
  )
}

export default SearchModal
