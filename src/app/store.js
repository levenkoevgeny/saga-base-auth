import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import userReducer from "../features/users/usersSlice"
import authReducer from "../features/auth/authSlice"

import authSaga from "../features/auth/authSaga"

import rootSaga from "../features/users/usersSaga"
const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: { users: userReducer, auth: authReducer },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(authSaga)
