import { PiTagSimple } from "react-icons/pi";
import { LuStickyNote } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import {NavLink} from "react-router-dom"

export default function Sidebar(){
	return(
		<aside className="sidebar poppins-extralight">
			<input type="checkbox" name="sidebarOpener" id="sidebarOpener"/>
			<nav className="options">
				<NavLink className="option" to="/" >
					<span className="optionTitle" title="Notes">
						<LuStickyNote className="optionIcon"  />
					</span>
					<span className="optionName">Notes</span>
				</NavLink>
				<NavLink className="option" title="Family" to="/categories/family" >
					<span className="optionTitle" title="Family">
						<PiTagSimple className="optionIcon" />
					</span>	
					<span className="optionName">Family</span>
				</NavLink>
				<NavLink className="option" title="Work" to="/categories/work" >
					<span className="optionTitle" title="Work">
						<PiTagSimple className="optionIcon" />
					</span>
					<span className="optionName">Work</span>
				</NavLink>
				<NavLink className="option" title="Personal" to="/categories/personal" >
					<span className="optionTitle" title="Personal">
						<PiTagSimple className="optionIcon" />
					</span>
					<span className="optionName">Personal</span>
				</NavLink>
				<NavLink className="option" title="Archive" to="/categories/archive" >
					<span className="optionTitle" title="Archive">
						<IoArchiveOutline className="optionIcon" />
					</span>
					<span className="optionName">Archive</span>
				</NavLink>
			</nav>
		</aside>
	)
}