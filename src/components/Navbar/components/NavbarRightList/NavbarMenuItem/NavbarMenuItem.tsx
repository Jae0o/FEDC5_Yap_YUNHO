import * as S from "./NavbarMenuItem.Styles"

import Button from "@/components/Button/Button"
import { NavbarMenuProps } from "@/components/Navbar/Navbar.Types"
import useGetNotification from "@/components/NotificationModal/hooks/useGetNotification"
import Brightness1Icon from "@mui/icons-material/Brightness1"

const NavbarMenuItem = ({ menu, handleMenuClick }: NavbarMenuProps) => {
  const { NotificationListData } = useGetNotification()
  const handleMenuItemClick = () => {
    if (!menu) {
      return
    }
    handleMenuClick(menu)
  }

  return (
    <S.NavbarMenuContainer>
      <Button
        $fontSize={"2rem"}
        onClick={handleMenuItemClick}
      >
        <p>{menu}</p>
        {menu === "알림" &&
          NotificationListData &&
          NotificationListData.length > 0 && <Brightness1Icon />}
      </Button>
      <S.NavbarMenuDivider />
    </S.NavbarMenuContainer>
  )
}

export default NavbarMenuItem
