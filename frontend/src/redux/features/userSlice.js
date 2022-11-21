import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        signedIn: null,
        value: null,
    },
    reducers: {
        signIn: (state, action) => {
            state.value = action.payload
            state.signedIn = true
        },
        signOut: (state) => {
            state.value = null
            state.signedIn = false
        }
    },
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer