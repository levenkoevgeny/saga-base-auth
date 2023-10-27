import { configureStore } from "@reduxjs/toolkit"

import userReducer from "../features/users/usersSlice"
import authReducer from "../features/auth/authSlice"

export default configureStore({
  reducer: { users: userReducer, auth: authReducer },
})
