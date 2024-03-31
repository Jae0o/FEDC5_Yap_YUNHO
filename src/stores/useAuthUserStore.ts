import { AUTH_USER_INITIAL_USER_DATA } from "../constants/stores"
import { User } from "../types"
import authToken from "./authToken"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const PERSIST_STORAGE_KEY = "userLoginStore"

interface AuthUserStore {
  isLoggedIn: boolean
  user: User

  setLogin: (user: User, token: string) => void
  setLogout: () => void
  updateUser: (user: User) => void
}

const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: AUTH_USER_INITIAL_USER_DATA,

      setLogin: (user, token) => {
        authToken.setToken(token)
        set(() => ({
          isLoggedIn: true,
          user: user,
        }))
      },
      setLogout: () => {
        authToken.removeToken()
        set(() => ({
          isLoggedIn: false,
          user: AUTH_USER_INITIAL_USER_DATA,
        }))
      },

      updateUser: (user) => set(() => ({ user })),
    }),
    {
      name: PERSIST_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
)

export default useAuthUserStore
