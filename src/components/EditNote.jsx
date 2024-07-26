import {useDispatch,useSelector} from "react-redux"
import {UpdateNote} from "../features/note/noteSlice"
import {EditingScreen} from "../features/windows/windowSlice"
import NoteEditor from "./NoteEditor"

import { MdClose } from "react-icons/md";

export default function EditNote({chosenNote,setChosenNote}){
	const dispatch = useDispatch()
	
	const Editing = (e) => {
		setChosenNote(prev => ({...prev, [e.target.name] : e.target.value}))
	}
	
	const Close = () => {
		let choice = confirm("Are you sure you want to exit?");
			if(choice === true){
				dispatch(EditingScreen(false))
			}
		
	}
	
	const Edit = () => {		
		dispatch(UpdateNote(chosenNote))
		dispatch(EditingScreen(false))
	}
	return(
		<div className="editNote">
			<div className="editNoteContainer">
				<MdClose size={30} className="editNoteCloseButton" onClick={Close}/>
				<NoteEditor 
					content={chosenNote}
					firstFunction={Edit}
					secondFunction={Editing}
				/>
			</div>
		</div>
	)
}