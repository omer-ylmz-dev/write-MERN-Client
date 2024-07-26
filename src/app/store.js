import {configureStore} from "@reduxjs/toolkit"
import noteSlice from "../features/note/noteSlice"
import windowSlice from "../features/windows/windowSlice"
import userSlice from "../features/user/userSlice"

export const store = configureStore({
	reducer:{
		note: noteSlice,
		windows: windowSlice,
		user:userSlice
	}
})

