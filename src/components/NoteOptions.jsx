import {forwardRef} from "react";
import {useDispatch} from "react-redux";

import {ChangeCategory} from "../features/note/noteSlice"
import {OptionsScreen} from "../features/windows/windowSlice"

const NoteOptions = forwardRef(({noteID},ref) => {
	const dispatch = useDispatch()
	
	const ChooseCategory = (category) => {
		dispatch(ChangeCategory({id:noteID, selectedCategory:category}))
		dispatch(OptionsScreen(false))
	}
	
	return(
		<div className="noteOptions" ref={ref}>
			<div className="noteOption" onClick={() => ChooseCategory("all")}>Add to All</div>	
			<div className="noteOption" onClick={() => ChooseCategory("family")}>Add to Family</div>
			<div className="noteOption" onClick={() => ChooseCategory("work")}>Add to Work</div>
			<div className="noteOption" onClick={() => ChooseCategory("personal")}>Add to Personal</div>
		</div>
	)
})

export default NoteOptions