import Sidebar from "../../components/Sidebar"
import SidebarMobile from "../../components/SidebarMobile"
import MainPage from "../../components/MainPage"
import {useParams} from "react-router-dom"
import {useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {selectCategory} from "../../features/note/noteSlice"

import useMatchMedia from "../../hooks/useMatchMedia"

export default function Home() {
	const isMobile = useMatchMedia(625)
	const dispatch = useDispatch()
	const {category} = useParams()
	
	useEffect(() => {
		dispatch(selectCategory(category))
	},[category])
	
  return (
    <div className="mainPage">
		{!isMobile ? <Sidebar /> : null}
		<MainPage />
    </div>
  )
}