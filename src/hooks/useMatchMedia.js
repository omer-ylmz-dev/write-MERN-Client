import {useEffect,useState} from "react"

export default function useMediaMatch(width = window.innerWidth){	
	// let width = window.innerWidth

	const [matchStatus,setMatchStatus] = useState(window.matchMedia(`(max-width: ${width}px)`).matches);
	
	useEffect(() => {
		const matchMedia = window.matchMedia(`(max-width: ${width}px)`);
		
		matchMedia.addEventListener("change",(e) => {
			setMatchStatus(e.matches)
		});
		
	},[])
	
	return matchStatus;
}