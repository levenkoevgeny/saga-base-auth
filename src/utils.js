const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const setCookie = (name, value, options = {}) => {
  options = {
    path: "/",
    ...options,
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue
    }
  }
  document.cookie = updatedCookie
}

const deleteCookie = (name) => {
  setCookie(name, "", {
    "max-age": -1,
  })
}

export const getLocalToken = () => localStorage.getItem("token")

export const saveLocalToken = (token) => localStorage.setItem("token", token)

export const removeLocalToken = () => localStorage.removeItem("token")

export const getLocalRefreshToken = () => getCookie("refresh-token")

export const saveLocalRefreshToken = (refreshToken) => {
  setCookie("refresh-token", refreshToken, { httpOnly: true })
}

export const removeLocalRefreshToken = () => deleteCookie("refresh-token")

export const toastOptions = {
  timeout: 500,
  closeOnClick: true,
}

export const getFormattedDate = (dateTime) => {
  return new Date(dateTime).toLocaleDateString()
}
export const getFormattedTime = (dateTime) => {
  return new Date(dateTime).toLocaleTimeString()
}
