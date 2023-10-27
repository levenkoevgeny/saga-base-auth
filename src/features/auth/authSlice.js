import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { authAPI } from "../../api/authAPI"
import { getLocalToken, removeLocalToken, saveLocalToken } from "../../utils"

const initialState = {
  token: null,
  isLoggedIn: null,
  isLogInError: null,
  isRegistrationError: null,
  user: null,
  isLoading: true,
}

export const checkLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async (_, { getState, dispatch }) => {
    const state = getState()
    const isLoggedIn = state.auth.isLoggedIn
    if (!isLoggedIn) {
      let token = state.auth.token
      if (!token) {
        const localToken = getLocalToken()
        if (localToken) {
          dispatch(userTokenChange(localToken))
          token = localToken
        }
        if (token) {
          try {
            const userDataResponse = await authAPI.getUserData(token)
            const userData = await userDataResponse.data
            dispatch(userDataChange(userData))
            dispatch(userIsLoggedChange(true))
          } catch (error) {
            removeLocalToken()
            dispatch(userTokenChange(null))
            dispatch(userIsLoggedChange(null))
          }
        }
      }
    }
  },
)

export const removeLoggedIn = createAsyncThunk(
  "auth/removeLoggedIn",
  async (_, { getState, dispatch }) => {
    removeLocalToken()
    dispatch(userTokenChange(null))
    dispatch(userIsLoggedChange(null))
  },
)

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.logInGetToken(username, password)
      const data = await response.data
      const token = data.access
      if (token) {
        saveLocalToken(token)
        dispatch(userTokenChange(token))
        dispatch(userIsLoggedChange(true))
        const userDataResponse = await authAPI.getUserData(token)
        const userData = await userDataResponse.data
        dispatch(userDataChange(userData))
      }
      return
    } catch (error) {
      dispatch(userIsErrorChange(true))
    }
  },
)

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
