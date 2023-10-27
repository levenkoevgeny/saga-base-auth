import { divide, replace } from "lodash"
import React from "react"
import { useDispatch } from "react-redux"
import { removeLoggedIn } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export default function UserList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(removeLoggedIn())
    navigate("/login", { replace: true })
  }
  return (
    <div>
      <button onClick={logout}>log out</button>
      <h1>Admin page</h1>
    </div>
  )
}
