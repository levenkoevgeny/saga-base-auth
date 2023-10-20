import { createSlice } from "@reduxjs/toolkit"

import {} from "../../utils"

const initialState = {
  token: null,
  isLoggedIn: null,
  isLogInError: null,
  isRegistrationError: null,
  user: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userTokenChange(state, action) {
      state.token = action.payload
    },
    userIsLoggedChange(state, action) {
      state.isLoggedIn = action.payload
    },
    userIsErrorChange(state, action) {
      state.isLogInError = action.payload
    },
    userIsRegistrationErrorChange(state, action) {
      state.isRegistrationError = action.payload
    },
    userDataChange(state, action) {
      state.user = action.payload
    },
    isLoadingChange(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {
  userTokenChange,
  userIsLoggedChange,
  userDataChange,
  userIsRegistrationErrorChange,
  userIsErrorChange,
  isLoadingChange,
} = authSlice.actions

export const isLoggedIn = (state) => state.auth.isLoggedIn
export const isAuthLoading = (state) => state.auth.isLoading
export const authUser = (state) => state.auth.user
export default authSlice.reducer
