import { put, takeEvery, all, call, select } from "redux-saga/effects"
import { authAPI } from "../../api/authAPI"
import store from "../../app/store"
import { getLocalToken, removeLocalToken, saveLocalToken } from "../../utils"

export function* checkLoggedIn() {
  const token_ = yield select((state) => state.auth.token)

  const isLoggedIn = yield select((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    let token = yield select((state) => state.auth.token)
    if (!token) {
      const localToken = getLocalToken()
      if (localToken) {
        yield put({ type: "auth/userTokenChange", payload: localToken })
        token = localToken
      }
      if (token) {
        try {
          authAPI
            .getUserData(token)
            .then((userDataResponse) => userDataResponse.data)
            .then((userData) => {
              put({ type: "auth/userDataChange", payload: userData })
            })

          // const userDataResponse = yield call(authAPI.getUserData(token))
          // const userData = yield userDataResponse.data
          // yield put({ type: "auth/userDataChange", payload: userData })
          yield put({ type: "auth/userIsLoggedChange", payload: true })
        } catch (error) {
          logOut()
        }
      } else {
        yield put({ type: "auth/userIsLoggedChange", payload: false })
      }
    }
    yield put({ type: "auth/isLoadingChange", payload: false })
  }
}

function* logOut() {
  removeLocalToken()
  yield put({ type: "auth/userTokenChange", payload: "" })
  yield put({ type: "auth/userIsLoggedChange", payload: false })
}

export function* userLogin(action) {
  try {
    let { username, password } = action.payload
    const response = yield authAPI.logInGetToken(username, password)
    const data = yield response.data
    const token = data.access
    const refresh = data.refresh
    if (token) {
      console.log("token", token)
      saveLocalToken(token)
      yield put({ type: "auth/userTokenChange", payload: token })
      yield put({ type: "auth/userIsLoggedChange", payload: true })
      console.log("logIn", store.getState().auth.isLoggedIn)
    }
  } catch (error) {}
}

export function* watchCheckLoggedIn() {
  yield takeEvery("AUTH_CHECK_LOGIN", checkLoggedIn)
}

export function* watchUserLogin() {
  yield takeEvery("AUTH_USER_LOGIN", userLogin)
}

export default function* authSaga() {
  yield all([watchCheckLoggedIn(), watchUserLogin()])
}
