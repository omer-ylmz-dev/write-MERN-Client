import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
	user : JSON.parse(localStorage.getItem("user")),
	errorMessage: null,
	loading: null
}

export const SignUp = createAsyncThunk("user/SignUp", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/register`,initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const SignIn = createAsyncThunk("user/SignIn", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`,initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers:{
		logout: (state) => {
			localStorage.clear()
			window.location.reload()
		}
	},
	extraReducers: (builder) => {
		builder.addCase(SignUp.fulfilled, (state,action) => {
			console.log(action.payload)
			if(action.payload.status === "OK"){
				state.loading = false
				state.errorMessage = null
				localStorage.setItem("user",JSON.stringify(action.payload))
				// window.location.reload()
				window.location.href = "/"
			}else{
				state.loading = false
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(SignUp.pending, (state,action) => {
			state.errorMessage = null
			state.loading = true
		})
		builder.addCase(SignUp.rejected, (state,action) => {
			console.log(action.payload)
			state.errorMessage = action.payload.message
			state.loading = false
		})
		builder.addCase(SignIn.fulfilled, (state,action) => {
			console.log(action.payload)
			if(action.payload.status === "OK"){
				state.loading = false
				state.errorMessage = null
				localStorage.setItem("user",JSON.stringify(action.payload))
				// window.location.reload()
				window.location.href = "/"
			}else{
				state.loading = false
				state.errorMessage = action.payload.message
				
			}
		})
		builder.addCase(SignIn.pending, (state,action) => {
			console.log(action.payload)
			state.errorMessage = null
			state.loading = true
		})
		builder.addCase(SignIn.rejected, (state,action) => {
			console.log(action.payload)
			state.errorMessage = action.payload.message
			state.loading = false
		})
	}
})

export const {logout} = userSlice.actions

export default userSlice.reducer