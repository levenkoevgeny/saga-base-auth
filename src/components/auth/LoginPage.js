import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const dispatch = useDispatch()
  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || "/"
  const submitForm = () => {
    dispatch({
      type: "AUTH_USER_LOGIN",
      payload: { username: "levenko", password: "1986" },
    })
    navigate(from, { replace: true })
  }
  return (
    <div>
      Login page
      <button onClick={submitForm}>Login</button>
    </div>
  )
}
