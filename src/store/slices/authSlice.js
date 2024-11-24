import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, AUTH_TOKEN, ID_TOKEN, REFRESH_TOKEN, USERINFO } from 'constants/AuthConstant';
import FirebaseService from 'services/FirebaseService';
import AuthService from 'services/AuthService';

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null,
	idtoken: localStorage.getItem(ID_TOKEN) || null,
	accessToken:''
}

export const signIn = createAsyncThunk('auth/login',async (data, { rejectWithValue }) => {
	const { username, password } = data
	try {
		const response = await AuthService.login({username, password})
		const token = response.idToken;
		localStorage.setItem(ID_TOKEN, token);
		localStorage.setItem("NAME", response.firstName+" "+response.lastName);
		localStorage.setItem("USERNAME", response.username);
		window.location.reload(false)
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Something Went Wrong')
	}
})

export const clientsignIn = createAsyncThunk('auth/clientlogin',async (data, { rejectWithValue }) => {
	const { clientId, clientsecret } = data
	try {
	
		const response = await AuthService.clientlogin(	{
			"clientId":"ECOMMERCEADMINPortal",
			"clientsecret":"Ics_portal_40556969"
		})
		const accesstoken = response.accessToken;
		const refreshToken = response.refreshToken;
		const clientId = response.clientId;
		localStorage.setItem(ACCESS_TOKEN, accesstoken);
		localStorage.setItem(REFRESH_TOKEN, refreshToken);
		localStorage.setItem(clientId, clientId);
		 return accesstoken;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const signUp = createAsyncThunk('auth/register',async (data, { rejectWithValue }) => {
	const { email, password } = data
	try {
		const response = await AuthService.register({email, password})
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const signOut = createAsyncThunk('auth/logout',async () => {
    // const response = await AuthService.signOutRequest()
	localStorage.clear()
	window.location.reload(false);
    // return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
    try {
		const response = await AuthService.loginInOAuth()
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async (_, { rejectWithValue }) => {
    try {
		const response = await AuthService.loginInOAuth()
		const token = response.data.token;
		localStorage.setItem(AUTH_TOKEN, token);
		return token;
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload.idToken
			state.idtoken=action.payload.idToken
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
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
				state.idtoken = action.payload.idToken
			})
			.addCase(signIn.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(clientsignIn.pending, (state) => {
				state.loading = false
			})
			.addCase(clientsignIn.fulfilled, (state, action) => {
				state.loading = false
				// state.redirect = '/'
				 state.accessToken = action.payload
			})
			.addCase(clientsignIn.rejected, (state, action) => {
				state.message = action.payload
				// state.showMessage = true
				// state.loading = false
			})
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
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithFacebook.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithFacebook.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithFacebook.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess,
} = authSlice.actions

export default authSlice.reducer