import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  status: "idle",
  isError: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    statusChanged(state, action) {
      state.status = action.payload
    },
    itemsAdded(state, action) {
      state.items = action.payload
    },
    itemUpdated(state, action) {
      // state.items = action.payload
    },
    itemDeleted(state, action) {
      // state.items = action.payload
    },
    errorChanged(state, action) {
      state.error = action.payload
    },
  },
})

export const { itemsAdded } = usersSlice.actions
export default usersSlice.reducer
export const selectAllUsers = (state) => state.users.items.results
export const selectStatus = (state) => state.users.status
export const selectError = (state) => state.users.error
