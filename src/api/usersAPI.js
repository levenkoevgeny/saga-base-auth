import axios from "axios"
import { authHeaders } from "./authAPI"

let base_url = "users"

export const usersAPI = {
  async getItemsList(
    token = "",
    searchForm = {
      username: "",
      last_name: "",
      is_superuser: "",
      is_active: "",
    },
  ) {
    let { username, last_name, is_superuser, is_active } = searchForm
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${base_url}/?username__icontains=${username}&last_name__icontains=${last_name}&is_superuser=${is_superuser}&is_active=${is_active}`,
    )
  },
  async addItem(token, itemData) {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${base_url}/`,
      itemData,
      authHeaders(token),
    )
  },
}
