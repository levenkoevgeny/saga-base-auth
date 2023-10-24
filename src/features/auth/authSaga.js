import { put, takeEvery, all, call, select, take } from "redux-saga/effects"
import { authAPI } from "../../api/authAPI"
import store from "../../app/store"
import { getLocalToken, removeLocalToken, saveLocalToken } from "../../utils"

export function* checkLoggedIn() {
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
          yield put({ type: "auth/userIsLoggedChange", payload: true })
        } catch (error) {
          yield logOut()
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

export function* fetchToken(username, password) {
  try {
    const response = yield call(authAPI.logInGetToken, username, password)
    return response.data
  } catch (error) {}
}

export function* userLogin(action) {
  try {
    let { username, password } = action.payload
    const data = yield call(fetchToken, username, password)

    const token = data.access
    const refresh = data.refresh

    if (token) {
      saveLocalToken(token)
      yield put({ type: "auth/userTokenChange", payload: token })
      yield put({ type: "auth/userIsLoggedChange", payload: true })
    }
  } catch (error) {}
}

export function* loginFlow() {
  const {
    payload: { username, password },
  } = yield take("LOGIN_REQUESTED")
  const data = yield call(fetchToken, username, password)
  const token = data.access
  const refresh = data.refresh
  if (token) {
    saveLocalToken(token)
    yield put({ type: "auth/userTokenChange", payload: token })
    yield put({ type: "auth/userIsLoggedChange", payload: true })
  }
}

export function* logOutFlow() {
  yield take("LOGOUT")
  yield logOut()
}

export function* watchCheckLoggedIn() {
  yield takeEvery("AUTH_CHECK_LOGIN", checkLoggedIn)
}

export function* watchUserLogin() {
  yield takeEvery("AUTH_USER_LOGIN", userLogin)
}

export default function* authSaga() {
  yield all([watchCheckLoggedIn(), watchUserLogin(), loginFlow(), logOutFlow()])
}
