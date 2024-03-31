import * as S from "./NavbarLeftList.Styles"
import * as GS from "@/components/Navbar/Navbar.Styles"

import { useNavigate } from "react-router-dom"

import SearchModal from "@/components/SearchModal/SearchModal"
import useSearchModalStore from "@/components/SearchModal/stores/useSearchModalStore"
import SearchIcon from "@mui/icons-material/Search"

const NavbarLeftList = () => {
  const navigate = useNavigate()
  const { showSearchModal } = useSearchModalStore()

  return (
    <>
      <S.NavbarLeftListLayout>
        <S.NavbarLogoContainer onClick={() => navigate("/")}>
          <S.NavbarLogo />
        </S.NavbarLogoContainer>
        <GS.NavbarButton onClick={showSearchModal}>
          <SearchIcon />
        </GS.NavbarButton>
      </S.NavbarLeftListLayout>
      <SearchModal />
    </>
  )
}

export default NavbarLeftList
