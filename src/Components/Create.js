import React from "react";
import { useState } from "react";

const API = "http://localhost:3001";

function Create() {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [location, setLocation] = useState("");

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const handleLocationNameChange = (e) => {
		setLocation(e.target.value);
	};

	const createItem = () => {
		fetch(API + "/createItem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				quantity: quantity,
			}),
		}).then((res) => {
			console.log("Item created");
			window.location.reload();
			res.json();
		});
	};

	const createLocation = () => {
		fetch(API + "/createLocation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: location,
			}),
		}).then((res) => {
			console.log("Location created");
			window.location.reload();
			res.json();
		});
	};
	return (
		<>
			<div className="inventory">
				<form>
					<h4>Create Inventory Items</h4>
					<div className="form-group">
						<label htmlFor="item">Item Name</label>
						<input
							type="text"
							className="form-control"
							id="item"
							value={name}
							placeholder="Enter Item Name"
							onChange={handleNameChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="quantity">Quantity</label>
						<input
							type="number"
							className="form-control"
							id="quantity"
							value={quantity}
							placeholder="Enter Quantity"
							onChange={handleQuantityChange}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							createItem();
						}}
					>
						Create Item
					</button>
				</form>
			</div>
			<div className="location">
				<form>
					<h4>Create Location</h4>

					<div className="form-group">
						<label htmlFor="location">Name of Location</label>
						<input
							value={location}
							onChange={handleLocationNameChange}
							type="text"
							className="form-control"
							id="location"
							placeholder="Enter Location"
						/>
					</div>
					<button
						onClick={() => {
							createLocation();
						}}
						type="button"
						className="btn btn-primary"
					>
						Create Location
					</button>
				</form>
			</div>
		</>
	);
}

export default Create;
