import React from "react"
import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <div id="error-page" className="container">
      <h1>Sorry, an unexpected error has occurred.</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
