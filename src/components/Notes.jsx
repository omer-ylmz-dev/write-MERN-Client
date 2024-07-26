import Note from "./Note"
import {useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {filteredNotes,GetNotes} from "../features/note/noteSlice"

import Loading from "./Loading"

export default function Notes(){
	const dispatch = useDispatch()
	const {user} = useSelector(state => state.user)
	const {selectedCategory} = useSelector(state => state.note)
	const notes = useSelector(filteredNotes)
	
	useEffect(() => {
		dispatch(GetNotes({username: user.userLogin.username}))
	},[dispatch])
		
	return(
		<div className="notes">	
			{
				notes?.map((note,i) => {
					if(note.author === user.userLogin.username){
						if(note.category === selectedCategory && !note.isArchived){
							return note.category === selectedCategory ? <Note note={note} key={i} /> : null
						}else if(!selectedCategory && !note.isArchived){
							return <Note note={note} key={i} />
						}else if(selectedCategory === "archive"){
							return note.isArchived ? <Note note={note} key={i} /> : null
						}
					}
				})
			}
		</div>
	)
}