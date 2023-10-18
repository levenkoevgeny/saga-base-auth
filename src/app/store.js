import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import userReducer from "../features/users/usersSlice"

import rootSaga from "../features/users/usersSaga"
const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: { users: userReducer },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)
