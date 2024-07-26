import {logout} from "../features/user/userSlice"

import {forwardRef} from "react";
import {useDispatch,useSelector} from "react-redux";


const UserOptions = forwardRef((props,ref) => {
	const {user} = useSelector(state => state.user)
	const dispatch = useDispatch()
	
	const Logout = () => {
		dispatch(logout())
	}
	
	return(
		<div className="userOptions" ref={ref}>
			<div className="userOption">{user?.userLogin?.username}</div>	
			<div className="userOption" onClick={Logout}>Log Out</div>	
		</div>
	)
})

export default UserOptions