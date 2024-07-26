import {useDispatch,useSelector} from "react-redux"
import {useState} from "react"
import {WriteNote} from "../features/note/noteSlice"
import NoteEditor from "./NoteEditor"
import SidebarMobile from "./SidebarMobile"

import useMatchMedia from "../hooks/useMatchMedia"

export default function CreateNote(){
	const isMobile = useMatchMedia(625)
	const dispatch = useDispatch()
	const {user} = useSelector(state => state.user)
	const [newNote,setNewNote] = useState({title:"", note:"", author:user?.userLogin?.username, isArchived:false, category:"all"})
	
	const Writing = (e) => {
		setNewNote(prev => ({...prev, [e.target.name] : e.target.value}))
	}
	const Create = () => {		
		if(newNote.title.length !== 0 && newNote.note.length !== 0){
			dispatch(WriteNote(newNote))
			setNewNote({title:"", note:"", author:user?.userLogin?.username, isArchived:false, category:"all"})
		}else{
			alert("Please fill in the blanks")
		}
		
		
		
	}
	return(
		<div className="createNote">
			{isMobile ? <SidebarMobile /> : null}
			<NoteEditor 
				content={newNote}
				firstFunction={Create}
				secondFunction={Writing}
			/>
		</div>
	)
}