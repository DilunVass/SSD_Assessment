import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {

	loading: false,
	isDefaultPassword: 'true',
	userId: null,
	userImage: null,
	userFirstName: null,
	userLastName: null,
	userRole: null,
	showMessage: false,
	redirect: '',
	token: null,
	globalSearchKey: ''
}

export const signOut = createAsyncThunk('auth/logout',async () => {
	console.log("loged out");
})

export const authSlice = createSlice({
	
	name: 'auth',
	initialState,
	reducers: {
		setGlobalSearchKey: (state, action) => {
			state.globalSearchKey = action.payload;
		},
		setUserImage: (state, action) => {
			state.userImage = action.payload
		},
		setIsDefaultPassword: (state, action) => {
			state.isDefaultPassword = action.payload
		},
		setUser: (state, action) => {
			state.user = action.payload
		},
		setUserId: (state, action) => {
			state.userId = action.payload
		},
		setUserFirstName: (state, action) => {
			state.userFirstName = action.payload
		},
		setUserLastName: (state, action) => {
			state.userLastName = action.payload
		},
		setUserRole: (state, action) => {
			state.userRole = action.payload
		},
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		stopLoading: (state) => {
			state.loading = false
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signOut.fulfilled, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
	},
})

export const {
	setGlobalSearchKey, 
	setUser,
	setUserImage,
	setUserId,
	setUserFirstName,
	setUserLastName,
	setUserRole,
	setIsDefaultPassword,
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	stopLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer