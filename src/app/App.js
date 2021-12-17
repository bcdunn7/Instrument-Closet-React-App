import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Routing from './Routes';
import Footer from './Footer';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import ClosetAPI from '../services/api';
import { getUserData } from '../features/users/userSlice';

function App() {
	const token = useSelector(state => state.user.token);
	const dispatch = useDispatch();

	useEffect(() => {
		const lsToken = localStorage.getItem('token');
		if (lsToken) {
			dispatch({type: 'user/setTokenFromLocalStorage', payload: lsToken});
		}
	}, [dispatch])

	useEffect(() => {
		if (token) {
			const { username } = jwt.decode(token);
			ClosetAPI.token = token;
			dispatch(getUserData(username));
		}
	}, [token, dispatch])

	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<Navbar/>
					<div className="App-content-div">
						<Routing/>
					</div>
					<Footer/>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
