import { createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store/store'

interface UserState {
    loggedIn: boolean
}

const initialState: UserState = {
    loggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
    },
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    }
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.loggedIn
export default userSlice.reducer

