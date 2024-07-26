import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {Link,useNavigate} from "react-router-dom"
import {SignUp} from "../../features/user/userSlice"

import Loading from "../../components/Loading"

export default function Register() {
	document.title = "Write | Register"
	const {errorMessage,loading,user} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const navigation = useNavigate()
	const [register,setRegister] = useState({email:"",username:"",passw:"",isAgreed:false})
	
	
	
	const RegisterProcess = (e) => {
		if(e.target.type === "checkbox"){
			setRegister(prev => ({...prev, [e.target.name] : e.target.checked}))
		}else{
			setRegister(prev => ({...prev, [e.target.name] : e.target.value}))
		}
		
	}
	
	const Registration = () => {
		dispatch(SignUp(register))
	}
	
  return (
    <>
		<div className="registerPage poppins-extralight">
			<div className="registerPageContent">
				<div className="registerPageUpperSide">
					Write
				</div>
				<div className="registerPageForm">
					<input type="text" className="poppins-extralight" placeholder="Mail Address" name="email" onChange={RegisterProcess}/>
					<input type="text" className="poppins-extralight" placeholder="Username" name="username" onChange={RegisterProcess} />
					<input type="password" className="poppins-extralight" placeholder="Password" name="passw" onChange={RegisterProcess} />
					<div className="aboutPassword">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, no space, and it must be 8-16 characters long.</div>
					<div className="registerPageFormTerms"><input type="checkbox" name="isAgreed" onChange={RegisterProcess} />I agree your terms</div>
					<button type="button" onClick={Registration} disabled={loading ? true : false}>Register</button>
					<div className="registerPageWarning">{errorMessage ? errorMessage : null}</div>
					<div className="formLoading">
						<Loading condition={loading} />
					</div>
				</div>
				<div className="registerPageLowerSide">
					<div className="toLoginPage">Have an account? <Link to="/login">Login</Link></div>
				</div>
			</div>
		</div>
    </>
  )
}