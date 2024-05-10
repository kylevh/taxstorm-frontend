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

interface W2 {
    id: number;
    employer: string;
    year: number;
    wages: number;
    federalTaxesWithheld: number;
    socialSecurityTaxesWithheld: number;
    medicareTaxesWithheld: number;
    userId: number;
    imageKey: string | null;
}

export interface TaxForm {
    id: number;
    user: UserData | null;
    year: number;
    totalWages: number;
    totalFederalTaxesWithheld: number;
    totalSocialSecurityTaxesWithheld: number;
    totalMedicareTaxesWithheld: number;
    credits: number;
    deductions: number;
    refund: number;
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

export const decodeToken = (token: string) => {
    const decoded = atob(token); // Decode the Base64 token
    const [email, password] = decoded.split(':'); // Split the decoded string into email and password
    return { email, password };
}

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer

