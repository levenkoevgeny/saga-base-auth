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

import { checkLoggedIn } from "./features/auth/authSlice"

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
  store.dispatch(checkLoggedIn())
  const state = store.getState()
  const isLoggedIn = state.auth.isLoggedIn

  console.log(isLoggedIn)

  if (!isLoggedIn) {
    let params = new URLSearchParams()
    params.set("from", new URL(request.url).pathname)
    return redirect("/login?" + params.toString())
  }
  return null
}
