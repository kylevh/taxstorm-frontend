import { createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store/store'

interface UserState {
    loggedIn: boolean,
    token: string | null;
}

const initialState: UserState = {
    loggedIn: false,
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.token = null;
        }
    }
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.loggedIn
export default userSlice.reducer

