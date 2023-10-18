export function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const authAPI = {}
