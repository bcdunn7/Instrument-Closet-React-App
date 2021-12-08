import { BrowserRouter } from 'react-router-dom';
import Routing from './Routes';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				{/* navbar */}
				<div className="App-content-div">
					<Routing/>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
