import { put, takeEvery, all } from "redux-saga/effects"
import { usersAPI } from "../../api/usersAPI"

export function* fetchUsers(action) {
  try {
    yield put({ type: "users/statusChanged", payload: "loading" })
    const result = yield usersAPI.getItemsList("", action.payload)
    yield put({ type: "users/statusChanged", payload: "succeeded" })
    yield put({ type: "users/itemsAdded", payload: result.data })
  } catch (error) {
    yield put({ type: "users/statusChanged", payload: "failed" })
    yield put({ type: "users/errorChanged", payload: error.message })
  }
}

export function* watchIncrementAsync() {
  yield takeEvery("USERS_ALL_FETCH", fetchUsers)
}

export default function* rootSaga() {
  yield all([watchIncrementAsync()])
}
