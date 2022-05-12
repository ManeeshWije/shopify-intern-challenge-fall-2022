import Create from "./Components/Create";
import View from "./Components/View";
import "./index.css";
function App() {
	return (
		<>
			<div className="heading">
				<h1>Inventory Tracker</h1>
				<p>By: Maneesh Wijewardhana</p>
			</div>
			<Create />
			<View />
		</>
	);
}

export default App;
