import { MdOutlinePalette } from "react-icons/md";
import { LuImage, LuUserPlus, LuBellPlus } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiArrowCounterClockwiseFill, PiArrowClockwiseFill } from "react-icons/pi";


export default function NoteEditor({content,firstFunction,secondFunction}){
	return(
		<section className="noteEditor">
			<input type="text" value={content?.title} className="titleInput poppins-extralight" placeholder="Title" name="title" onChange={secondFunction}/>
			<textarea  value={content?.note} className="textInput poppins-extralight" placeholder="Take a note" name="note" onChange={secondFunction}></textarea>
			<footer className="noteEditorOptions">
				<div className="saveButton" onClick={firstFunction}>Save</div>
			</footer>
		</section>
	)
}