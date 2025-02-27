import { NavbarMenuList } from "./../NavbarRightList.Styles"

import { NavbarMenuProps } from "@/components/Navbar/Navbar.Types"

import NavbarMenuItem from "../NavbarMenuItem/NavbarMenuItem"

const NavbarLoggedInMenu = ({
  handleMenuClick,
  $isToggle,
}: NavbarMenuProps) => {
  return (
    <NavbarMenuList $isToggle={$isToggle}>
      <NavbarMenuItem
        handleMenuClick={handleMenuClick}
        menu="게시물 생성"
      />
      <NavbarMenuItem
        handleMenuClick={handleMenuClick}
        menu="DM"
      />
      <NavbarMenuItem
        handleMenuClick={handleMenuClick}
        menu="알림"
      />

      <NavbarMenuItem
        handleMenuClick={handleMenuClick}
        menu="로그아웃"
      />
    </NavbarMenuList>
  )
}

export default NavbarLoggedInMenu
