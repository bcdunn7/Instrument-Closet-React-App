import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Routing from './Routes';
import Footer from './Footer';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';

function App() {
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
