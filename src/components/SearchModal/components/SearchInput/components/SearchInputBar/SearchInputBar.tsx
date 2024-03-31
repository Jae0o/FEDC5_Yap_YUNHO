import * as S from "./SearchInputBar.Styles"

import { useState } from "react"

import {
  SEARCH_INPUT_BAR_CHANGE_TIMER_DELAY,
  SEARCH_INPUT_BAR_PLACEHOLDER,
} from "@/components/SearchModal/SearchModal.Constants"
import { SearchInputBarProp } from "@/components/SearchModal/SearchModal.Types"
import { Search } from "@mui/icons-material"

const SearchInputBar = ({ handleKeyword }: SearchInputBarProp) => {
  const [isFocusOnBar, setIsFocusOnBar] = useState(false)

  let timer: number | null | undefined = null
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      handleKeyword(e.target.value)
    }, SEARCH_INPUT_BAR_CHANGE_TIMER_DELAY)
  }

  return (
    <S.SearchBarForm onSubmit={(e) => e.preventDefault()}>
      <S.SearchBarInput
        type="search"
        placeholder={SEARCH_INPUT_BAR_PLACEHOLDER}
        name="searchbar"
        onChange={handleInputChange}
        onFocus={() => setIsFocusOnBar(true)}
        onBlur={() => setIsFocusOnBar(false)}
      />
      {!isFocusOnBar && (
        <S.SearchIconLayout>
          <Search />
        </S.SearchIconLayout>
      )}
    </S.SearchBarForm>
  )
}

export default SearchInputBar
