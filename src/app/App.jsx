import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import HomeLayout from "../pages/home/HomeLayout"
import Home from "../pages/home/Home"

import Login from "../pages/user/Login"
import Register from "../pages/user/Register"

import {useSelector} from "react-redux"

export default function App() {
	const {user} = useSelector(state => state.user)
	
	
	
	return (
		<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomeLayout/>}>
					<Route index={true} element={user ? <Home /> : <Navigate to="/login" />} />
					<Route path="categories/:category" element={user ? <Home /> : <Navigate to="/login" />} />
				</Route>
				<Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
				<Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
			</Routes>
		</BrowserRouter>
		</>
	)
}