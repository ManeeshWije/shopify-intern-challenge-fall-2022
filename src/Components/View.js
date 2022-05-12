import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Popup from "./Popup";

const API = "http://localhost:3000";

function View() {
	const [items, setItems] = useState([]);
	const [locations, setLocations] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState();
	const [quantity, setQuantity] = useState();
	const [location, setLocation] = useState();

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const handleLocationNameChange = (e) => {
		setLocation(e.target.value);
	};

	const getItems = async () => {
		await fetch(API + "/items")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setItems(data);
			});
	};

	const getLocations = async () => {
		await fetch(API + "/locations")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setLocations(data);
			});
	};

	const deleteItem = (id) => {
		fetch(API + "/deleteItem/" + id, {
			method: "DELETE",
		}).then(() => {
			window.location.reload();
		});
	};

	const deleteLocation = (id) => {
		fetch(API + "/deleteLocation/" + id, {
			method: "DELETE",
		}).then(() => {
			window.location.reload();
		});
	};

	const updateItem = (id) => {
		fetch(API + "/updateItem/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				quantity: quantity,
				location: location,
			}),
		}).then(() => {
			window.location.reload();
		});
	};

	const updateLocation = (id) => {
		fetch(API + "/updateLocation/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				location: location,
			}),
		}).then(() => {
			window.location.reload();
		});
	};

	useEffect(() => {
		getItems();
		getLocations();
	}, []);

	return (
		<>
			<h4>View Inventory Items</h4>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Item Name</th>
						<th scope="col">Quantity</th>
						<th scope="col">Location</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => {
						return (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.quantity}</td>
								<td>{item.location}</td>
								<td>
									<button onClick={() => deleteItem(item._id)} className="btn btn-danger">
										X
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button id="edit-btn" onClick={togglePopup} className="btn btn-secondary">
				Edit
			</button>

			<div>
				{isOpen && (
					<Popup
						content={
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th scope="col">Item Name</th>
											<th scope="col">Quantity</th>
											<th scope="col">Location</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{items.map((item) => {
											return (
												<tr key={item._id}>
													<td>
														<textarea
															defaultValue={item.name}
															onChange={handleNameChange}
														></textarea>
													</td>
													<td>
														<textarea
															defaultValue={item.quantity}
															onChange={handleQuantityChange}
														></textarea>
													</td>
													<td>
														<textarea
															defaultValue={item.location}
															onChange={handleLocationNameChange}
														></textarea>
													</td>
													<td>
														<button
															type="button"
															className="btn btn-secondary"
															onClick={() => {
																updateItem(item._id);
																updateLocation(item._id);
															}}
														>
															Update
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</>
						}
						handleClose={togglePopup}
					/>
				)}
			</div>

			<h4>View Locations</h4>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Location</th>
						<th scope="col">Items Inside</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{locations.map((location) => {
						console.log(location);
						return (
							<tr key={location._id}>
								<td>{location.name}</td>
								<td>{location.items + ","}</td>
								<td>
									<button onClick={() => deleteLocation(location._id)} className="btn btn-danger">
										X
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default View;
