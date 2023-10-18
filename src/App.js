import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UserList from "./components/admin/UserList"
import ErrorPage from "./components/ErrorPage"

const router = createBrowserRouter([
  {
    id: "root",
    path: "/admin",
    children: [{ index: true, Component: UserList }],
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
