import { MdClose } from "react-icons/md";

import {ReadingScreen} from "../features/windows/windowSlice"
import {useDispatch} from "react-redux"

export default function NoteReader({note,Edit,Delete}){
	const dispatch = useDispatch()
	return(
		<div className="noteReader">
			<div className="noteReaderContainer">
				<header className="noteReaderHeader">
					<div className="noteReaderTitle">{note.title}</div>
					<MdClose size={30} className="noteReaderCloseButton" onClick={() => dispatch(ReadingScreen(false))}/>
				</header>
				<section className="noteReaderText">
					{note.note}
				</section>
				<footer className="noteReaderFooter">
					<div className="noteReaderDetails">
						{new Date(note?.createdAt).toLocaleDateString() + " - " + new Date(note?.createdAt).toLocaleTimeString()}
					</div>
					<div className="noteReaderOptions">
						<div className="noteReaderOption" onClick={Edit}>Edit</div>
						<div className="noteReaderOption" onClick={Delete}>Delete</div>
					</div>
				</footer>
			</div>
		</div>
	)
}