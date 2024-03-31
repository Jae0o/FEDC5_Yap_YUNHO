import * as GS from "../NavbarRightList.Styles"

import { NavbarMenuProps } from "@/components/Navbar/Navbar.Types"

import NavbarMenuItem from "../NavbarMenuItem/NavbarMenuItem"

const NavbarNotLoggedInMenu = ({
  handleMenuClick,
  $isToggle = false,
}: NavbarMenuProps) => {
  return (
    <GS.NavbarMenuList $isToggle={$isToggle}>
      <NavbarMenuItem
        handleMenuClick={handleMenuClick}
        menu="로그인"
      />
    </GS.NavbarMenuList>
  )
}

export default NavbarNotLoggedInMenu
