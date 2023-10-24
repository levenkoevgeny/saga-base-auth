import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { isLoggedIn } from "../../features/auth/authSlice"
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch()
  let location = useLocation()

  const isLoggedInState = useSelector(isLoggedIn)

  let from = location.state?.from?.pathname || "/"
  const submitForm = () => {
    console.log('submit')
    dispatch({
      type: "LOGIN_REQUESTED",
      payload: { username: "levenko", password: "1986" },
    })
  }
  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (<div>
        Login page
        <button onClick={submitForm}>Login</button>
      </div>)}
    </div>

  )
}
