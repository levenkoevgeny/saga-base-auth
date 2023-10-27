import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { isLoggedIn, userLogin } from "../../features/auth/authSlice"
import { Navigate } from "react-router-dom"

export default function LoginPage() {
  const dispatch = useDispatch()
  const location = useLocation()

  const isLoggedInState = useSelector(isLoggedIn)

  const from = location.state?.from?.pathname || "/"

  const submitForm = () => {
    dispatch(userLogin({ username: "levenko", password: "1986" }))
  }

  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (
        <div>
          Login page
          <button onClick={submitForm}>Login</button>
        </div>
      )}
    </div>
  )
}
