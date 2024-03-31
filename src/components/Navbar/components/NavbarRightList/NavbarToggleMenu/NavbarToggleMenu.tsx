import * as S from "./NavbarToggleMenu.Styles"

import { NavbarMenuProps } from "@/components/Navbar/Navbar.Types"
import useAuthUserStore from "@/stores/useAuthUserStore"

import NavbarLoggedInMenu from "../NavbarLoggedInMenu/NavbarLoggedInMenu"
import NavbarNotLoggedInMenu from "../NavbarNotLoggedInMenu/NavbarNotLoggedInMenu"

const NavbarToggleMenu = ({
  $isToggle = false,
  handleMenuClick,
}: NavbarMenuProps) => {
  const { isLoggedIn } = useAuthUserStore()
  return (
    <S.NavbarToggleMenuLayout $isToggle={$isToggle}>
      {isLoggedIn ? (
        <NavbarLoggedInMenu
          handleMenuClick={handleMenuClick}
          $isToggle={$isToggle}
        />
      ) : (
        <NavbarNotLoggedInMenu
          handleMenuClick={handleMenuClick}
          $isToggle={$isToggle}
        />
      )}
    </S.NavbarToggleMenuLayout>
  )
}

export default NavbarToggleMenu
