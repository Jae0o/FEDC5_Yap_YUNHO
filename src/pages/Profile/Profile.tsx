import * as S from "./Profile.Styles"

import UserPosts from "@/pages/Profile/components/UserPosts/UserPosts"
import UserProfile from "@/pages/Profile/components/UserProfile/UserProfile"

const Profile = () => {
  return (
    <S.UserProfileLayout>
      <UserProfile />
      <UserPosts />
    </S.UserProfileLayout>
  )
}

export default Profile
