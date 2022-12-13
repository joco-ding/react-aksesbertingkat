import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Pages } from "./constants"
import jwt_decode from "jwt-decode"

const initialState = {
  alert: { variant: 'error', label: '' },
  pages: [Pages.Dashboard.path, Pages.Operator.path, Pages.Admin.path],
  activePage: Pages.Dashboard.path,
  login: {}
}

const defaultSlice = createSlice({
  name: 'default',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setPage: (state, action) => {
      state.activePage = action.payload
    },
    logout: (state, action) => {
      console.log('logout')
      state.login = initialState.login
      state.activePage = initialState.activePage
    },
    login: (state, action) => {
      localStorage.setItem('token', action.payload)
      const decodedData = jwt_decode(action.payload)
      state.login = decodedData
      let tempPages = []
      for (const p in Pages) {
        const dataPage = state.login.kapabilitas.find(a => a === Pages[p].path)
        if (typeof dataPage === 'string') tempPages.push(p)
      }
      state.pages = tempPages
    }
  }
})

export const { setAlert, setPage, login, logout } = defaultSlice.actions
export const store = configureStore({ reducer: defaultSlice.reducer })