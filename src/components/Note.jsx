import { RiEditBoxLine,RiDeleteBinLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArchiveOutline } from "react-icons/io5";

import {DeleteNote,ArchiveNote} from "../features/note/noteSlice"
import {EditingScreen,ReadingScreen,OptionsScreen} from "../features/windows/windowSlice"

import useClickOutside from "../hooks/useClickOutside"

import {useDispatch,useSelector} from "react-redux"
import {useEffect,useState} from "react"

import NoteReader from "./NoteReader"
import EditNote from "./EditNote"
import NoteOptions from "./NoteOptions"

export default function Note({note}){
	const {notes} = useSelector(state => state.note);
	const reference = useClickOutside(() => dispatch(OptionsScreen(false)))
	const {readingScreenStatus,editingScreenStatus,optionsScreenStatus} = useSelector(state => state.windows)
	const dispatch = useDispatch()
	
	const [noteIDNumber,setNoteIDNumber] = useState(0);
	const [chosenNote,setChosenNote] = useState();
	
	useEffect(()=>{
		setNoteIDNumber(note._id)
		setChosenNote(notes.find(n => n._id === noteIDNumber))
	},[notes,note._id,noteIDNumber])
	
	const Delete = () => {
		let choice = confirm("Are you sure you want to delete?")
		if(choice === true){
			dispatch(DeleteNote(note._id))
		}
	}
	
	const Edit = () => {		
		if(readingScreenStatus !== false){
			dispatch(ReadingScreen(false))
		}
		dispatch(EditingScreen(note._id))
	}
	
	const Read = () => {
		if(editingScreenStatus !== false){
			dispatch(EditingScreen(false))
		}

		dispatch(ReadingScreen(note._id))
	}
	
	const Options = (e) => {
		e.stopPropagation()
		dispatch(OptionsScreen(note._id))
	}
	
	const Archive = () => {		
		dispatch(ArchiveNote({id:note._id, archived:note.isArchived ? false : true}))
	}
	
	return(
			<>
				<article className="note">
					<header className="noteTitle" onClick={Read}>
						{note?.title}
					<div className="noteCategory">
						{note?.category}
					</div>	
					</header>
					<section className="noteText">
						{note?.note}		
					</section>
					<footer className="noteBottom">
						<div className="noteOptionsLeft">
							<RiEditBoxLine className="noteOption" onClick={Edit} />
							<RiDeleteBinLine className="noteOption" onClick={Delete} />
							<IoArchiveOutline className="noteOption" onClick={Archive} />
							<div className="noteSharedDate" >
								{new Date(note?.createdAt).toLocaleDateString() + " - " + new Date(note?.createdAt).toLocaleTimeString()}
							</div>
						</div>
						<div className="noteOptionsRight">
							<BsThreeDotsVertical className="noteOption" onClick={Options}  />
							{optionsScreenStatus === noteIDNumber && <NoteOptions noteID={note._id} ref={reference} />}
						</div>
					</footer>
				</article>
				{readingScreenStatus ===  noteIDNumber ? <NoteReader note={note} Edit={Edit} Delete={Delete} /> : null}
				{editingScreenStatus ===  noteIDNumber ? <EditNote chosenNote={chosenNote} setChosenNote={setChosenNote} /> : null}
			</>
	)
}