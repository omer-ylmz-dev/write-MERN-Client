import { IoReorderThreeOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { MdViewCompact } from "react-icons/md";
import { IoRefreshSharp } from "react-icons/io5";
import { MdOutlineViewAgenda } from "react-icons/md";
import { LuSettings } from "react-icons/lu";

import {useState} from "react"
import {useSelector,useDispatch} from "react-redux"

import UserOptions from "./UserOptions"

import useClickOutside from "../hooks/useClickOutside"
import useMatchMedia from "../hooks/useMatchMedia"

import {searchingNote} from "../features/note/noteSlice"

import Loading from "./Loading"

export default function Navbar(){
	const isMobile = useMatchMedia(625)
	const {loading} = useSelector(state => state.note)
	const dispatch = useDispatch()
	const reference = useClickOutside(() => setUserOptions(false));
	const [userOptions,setUserOptions] = useState(false);
	
	const Search = (e) => {
		dispatch(searchingNote(e.target.value));
	}
	
	const Open = (e) => {
		e.stopPropagation()
		setUserOptions(true)
	}
	
	return(
	<>
		<nav className="navbar poppins-extralight">
			<header className="navbarLeft">
			{	isMobile ? null : 
				<label className="navbarLeftOptionsButton" htmlFor="sidebarOpener">
					<IoReorderThreeOutline className="optionsButton" />
				</label>
			}
				<div className="brand">Write</div>
			</header>
			<section className="navbarCenter">
				<AiOutlineSearch className="searchButton" />
				<input type="text" placeholder="Search" className="poppins-extralight" onChange={Search} />
			</section>
			<div className="navbarLoading">
				<Loading condition={loading} />
			</div>
			<footer className="navbarRight">
				<div className="navbarRightProfile" onClick={Open}>
					<img src="profile.jpg" width="40" height="40" />
				</div>
				{userOptions && <UserOptions ref={reference} />}
			</footer>
		</nav>
	</>
	)
}