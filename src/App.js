import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom"
import UserList from "./components/admin/UserList"
import ErrorPage from "./components/ErrorPage"

import LoginPage from "./components/auth/LoginPage"

import store from "./app/store"

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin" /> },
  {
    id: "root",
    path: "/admin",
    children: [{ index: true, Component: UserList }],
    loader: protectedLoader,
    errorElement: <ErrorPage />,
  },
  { path: "/login", Component: LoginPage },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

function protectedLoader({ request }) {
  store.dispatch({ type: "AUTH_CHECK_LOGIN" })
  const state = store.getState()
  const isLoggedIn = state.auth.isLoggedIn
  const token = state.auth.token

  console.log("App logIn", isLoggedIn)
  console.log("App token", token)

  if (!isLoggedIn) {
    let params = new URLSearchParams()
    params.set("from", new URL(request.url).pathname)
    return redirect("/login?" + params.toString())
  }
  return null
}
