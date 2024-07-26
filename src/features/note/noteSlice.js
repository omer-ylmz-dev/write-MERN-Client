import {createSlice,createAsyncThunk,createSelector} from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
	notes : [],
	loading: null,
	searchingKeyword : "",
	selectedCategory: ""
}

export const GetNotes = createAsyncThunk("note/GetNotes", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/getNotes`,initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const WriteNote = createAsyncThunk("note/WriteNote", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/createNote`,initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const DeleteNote = createAsyncThunk("note/DeleteNote", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/deleteNote/${initialPost}`)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const UpdateNote = createAsyncThunk("note/UpdateNote", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/editNote/${initialPost._id}`, initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const ChangeCategory = createAsyncThunk("note/ChangeCategory", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.put(`${import.meta.env.VITE_SERVER_URL}/changeCategory/${initialPost.id}`, initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})

export const ArchiveNote = createAsyncThunk("note/ArchiveNote", async(initialPost,thunkAPI) => {
	try{
		const {data} = await axios.put(`${import.meta.env.VITE_SERVER_URL}/archiveNote/${initialPost.id}`, initialPost)
		return data
	}catch(err){
		return thunkAPI.rejectWithValue({error: err.message})
	}
})


export const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers:{
		searchingNote: (state, action) => {
			state.searchingKeyword = action.payload
		},
		selectCategory: (state, action) => {
			state.selectedCategory = action.payload			
		}
	},
	extraReducers: (builder) => {
		builder.addCase(GetNotes.fulfilled, (state,action) => {
			// console.log(action.payload)
			if(action.payload){
				state.notes = action.payload
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.message
			}
		})
		builder.addCase(GetNotes.pending, (state,action) => {
			// console.log("GetNotes.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(GetNotes.rejected, (state,action) => {
			// console.log("GetNotes.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.message
		})
		builder.addCase(WriteNote.fulfilled, (state,action) => {
			// console.log("WriteNote.fulfilled",action.payload)
			if(action.payload._id){
				state.notes = [...state.notes, action.payload]
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.messsage
			}
		})
		builder.addCase(WriteNote.pending, (state,action) => {
			// console.log("WriteNote.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(WriteNote.rejected, (state,action) => {
			console.log("WriteNote.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.error
		})
		builder.addCase(DeleteNote.fulfilled, (state,action) => {
			// console.log("DeleteNote.fulfilled : ",action.payload)
			if(action.payload){
				state.notes = [...state.notes.filter(n => n._id !== action.payload.id)]
				state.loading = false
				// state.statusMessage = action.payload.message
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.message
			}
		})
		builder.addCase(DeleteNote.pending, (state,action) => {
			// console.log("DeleteNote.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(DeleteNote.rejected, (state,action) => {
			// console.log("DeleteNote.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.error
		})
		builder.addCase(UpdateNote.fulfilled, (state,action) => {
			// console.log("UpdateNote.fulfilled : ",action.payload)
			if(action.payload._id){
				state.notes = [...state.notes.map(n => n._id === action.payload._id ? ({...n, ...action.payload}) : n)]
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.message
			}
		})
		builder.addCase(UpdateNote.pending, (state,action) => {
			// console.log("UpdateNote.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(UpdateNote.rejected, (state,action) => {
			// console.log("UpdateNote.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.error
		})
		builder.addCase(ChangeCategory.fulfilled, (state,action) => {
			// console.log("ChangeCategory.fulfilled : ",action.payload)
			if(action.payload.id){
				state.notes = [...state.notes.map(n => n._id === action.payload.id ? ({...n, category: action.payload.category}) : n)]
				state.loading = false
				// state.statusMessage = action.payload.message
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.message
			}
		})
		builder.addCase(ChangeCategory.pending, (state,action) => {
			// console.log("ChangeCategory.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(ChangeCategory.rejected, (state,action) => {
			// console.log("ChangeCategory.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.error
		})
		builder.addCase(ArchiveNote.fulfilled, (state,action) => {
			// console.log("ArchiveNote.fulfilled : ",action.payload)
			if(action.payload.id){
				state.notes = [...state.notes.map(n => n._id === action.payload.id ? ({...n, isArchived: action.payload.archived}) : n)]
				state.loading = false
				// state.statusMessage = action.payload.message
				// state.errorMessage = null
			}else{
				state.loading = false
				// state.statusMessage = null
				// state.errorMessage = action.payload.message
			}
		})
		builder.addCase(ArchiveNote.pending, (state,action) => {
			// console.log("ArchiveNote.pending : ",action.payload)
			state.loading = true
			// state.statusMessage = null
			// state.errorMessage = null
		})
		builder.addCase(ArchiveNote.rejected, (state,action) => {
			// console.log("ArchiveNote.rejected : ",action.payload)
			state.loading = false
			// state.statusMessage = null
			// state.errorMessage = action.payload.error
		})
	}
})

export const {searchingNote,selectCategory} = noteSlice.actions
export default noteSlice.reducer

export const filteredNotes = createSelector(state => state.note.notes,state => state.note.searchingKeyword,(notes,searchingKeyword) => notes.filter(n => n.title.toLowerCase().includes(searchingKeyword.toLowerCase())));