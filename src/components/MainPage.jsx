import CreateNote from "./CreateNote"
import Notes from "./Notes"


export default function MainPage() {
	return(
		<main className="mainPageContainer poppins-extralight">
			<CreateNote />
			<Notes />
		</main>
	)
}