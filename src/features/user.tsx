import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store/store'

interface UserData {
    userId?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    role?: string;
}

interface UserState {
    loggedIn: boolean,
    token: string | null;
    userData: UserData | null;
}

// const initialState: UserState = {
//     loggedIn: false,
//     token: null,
//     userData: null,
// }

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        token: null,
        userData: null,
    },
    reducers: {
        login: (state, action: PayloadAction<{ token: any, userData: any }>) => {
            state.loggedIn = true;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
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

