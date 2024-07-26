import {useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {SignIn} from "../../features/user/userSlice"


import Loading from "../../components/Loading"

export default function Login() {
	document.title = "Write | Login"
	const {errorMessage,loading} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [login,setLogin] = useState({email:"",passw:""})
	
	const LoginProcess = (e) => {
		setLogin(prev => ({...prev, [e.target.name] : e.target.value}))
	}
	
	
	const LoginWithPressEnter = (e) => {
		if(e.key === "Enter"){
			dispatch(SignIn(login))
		}
	}
	
  return (
    <>
		<div className="loginPage poppins-extralight">
			<div className="loginPageContent">
				<div className="loginPageUpperSide">
					Write
				</div>
				<div className="loginPageForm">
					<input 
						type="text" 
						className="poppins-extralight" 
						placeholder="Mail Address" 
						name="email" 
						onChange={LoginProcess} 
						onKeyPress={LoginWithPressEnter}
					/>
					<input 
						type="password" 
						className="poppins-extralight" 
						placeholder="Password" 
						name="passw" 
						onChange={LoginProcess} 
						onKeyPress={LoginWithPressEnter}
					/>
					<button type="button" onClick={() => dispatch(SignIn(login))} disabled={loading ? true : false}>Login</button>
					<div className="loginPageWarning">{errorMessage ? errorMessage : null}</div>
					<div className="formLoading">
						<Loading condition={loading} />
					</div>
				</div>
				<div className="loginPageLowerSide">
					<div className="toRegisterPage">Do not you have an account? <Link to="/register">Register</Link></div>
				</div>
			</div>
		</div>
    </>
  )
}