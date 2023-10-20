import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from "lodash"
import {
  selectAllUsers,
  selectStatus,
  selectError,
} from "../../features/users/usersSlice"

const UserForm = ({ debouncedSearch }) => {
  const [searchForm, setSearchForm] = useState({
    username: "",
    last_name: "",
    is_superuser: "",
    is_active: "",
  })

  const onSearchFormChange = (formField, newValue) => {
    let newState = { ...searchForm }
    newState[formField] = newValue
    setSearchForm(newState)
    debouncedSearch(formField, newValue)
  }

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={searchForm.username}
          name="username"
          onChange={(e) => onSearchFormChange(e.target.name, e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last name</label>
        <input
          type="text"
          className="form-control"
          value={searchForm.last_name}
          name="last_name"
          onChange={(e) => onSearchFormChange(e.target.name, e.target.value)}
        />
      </div>
    </form>
  )
}
const UserItem = ({ user, counter }) => {
  return (
    <tr>
      <td>{counter}</td>
      <td>{user.last_name}</td>
      <td>{user.first_name}</td>
      <td>{user.username}</td>
      <td>{user.last_login}</td>
      <td>{user.date_joined}</td>
      <td>{user.is_superuser ? "True" : "False"}</td>
      <td>{user.is_active ? "True" : "False"}</td>
    </tr>
  )
}

export default function UserList() {
  const dispatch = useDispatch()

  const users = useSelector(selectAllUsers)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)

  const [debouncedState, setDebouncedState] = useState({
    username: "",
    last_name: "",
    is_superuser: "",
    is_active: "",
  })

  const debounce = useCallback(
    _.debounce((_formField, _newValue) => {
      let _newState = { ...debouncedState }
      _newState[_formField] = _newValue
      setDebouncedState(_newState)
    }, 500),
    [],
  )

  useEffect(() => {
    dispatch({ type: "USERS_ALL_FETCH", payload: debouncedState })
  }, [debouncedState, dispatch])

  let content

  if (status === "loading") {
    content = <div>Loading ...</div>
  } else if (status === "succeeded") {
    if (users.length > 0) {
      content = (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Lastname</th>
              <th scope="col">Firstname</th>
              <th scope="col">Username</th>
              <th scope="col">Last login</th>
              <th scope="col">Date joined</th>
              <th scope="col">Is superuser</th>
              <th scope="col">Is active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, counter) => (
              <UserItem key={user.id} user={user} counter={++counter} />
            ))}
          </tbody>
        </table>
      )
    } else {
      content = <div>List is empty</div>
    }
  } else if (status === "failed") {
    content = <div>{error}</div>
  }

  return (
    <div className="container">
      <div className="my-3"></div>
      <h1>Users list</h1>
      <div>
        <UserForm debouncedSearch={debounce} />
      </div>
      <div>{content}</div>
    </div>
  )
}
