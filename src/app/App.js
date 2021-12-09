import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Routing from './Routes';
import Footer from './Footer';
import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar/>
				<div className="App-content-div">
					<Routing/>
				</div>
				<Footer/>
			</BrowserRouter>
		</div>
	);
}

export default App;
