import { PiTagSimple } from "react-icons/pi";
import { LuStickyNote } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import {NavLink} from "react-router-dom"

export default function SidebarMobile(){
	return(
		<aside className="sidebarMobile poppins-extralight">
			<nav className="mobileOptions">
				<NavLink className="mobileOption" to="/" >
					<LuStickyNote className="mobileOptionIcon" />
					<span className="mobileOptionName">Notes</span>
				</NavLink>
				<NavLink className="mobileOption" to="/categories/family" >
					<PiTagSimple className="mobileOptionIcon" />
					<span className="mobileOptionName">Family</span>
				</NavLink>
				<NavLink className="mobileOption" to="/categories/work" >
					<PiTagSimple className="mobileOptionIcon" />
					<span className="mobileOptionName">Work</span>
				</NavLink>
				<NavLink className="mobileOption" to="/categories/personal" >
					<PiTagSimple className="mobileOptionIcon" />
					<span className="mobileOptionName">Personal</span>
				</NavLink>
				<NavLink className="mobileOption" to="/categories/archive" >
					<IoArchiveOutline className="mobileOptionIcon" />
					<span className="mobileOptionName">Archive</span>
				</NavLink>
			</nav>
		</aside>
	)
}