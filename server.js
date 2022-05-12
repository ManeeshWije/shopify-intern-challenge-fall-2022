// require and init everything
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3001;
const InventoryItem = require("./models/InventoryItem");
const Location = require("./models/Location");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

// connect to db
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(err);
	});

// base url
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

// get all items in the database
app.get("/items", (req, res) => {
	InventoryItem.find()
		.then((items) => {
			res.json(items);
		})
		.catch((err) => {
			res.json(err);
		});
});

// get all locations in the database
app.get("/locations", (req, res) => {
	Location.find()
		.then((locations) => {
			res.json(locations);
		})
		.catch((err) => {
			res.json(err);
		});
});

// create a new item and add to database
app.post("/createItem", (req, res) => {
	const item = new InventoryItem({
		name: req.body.name,
		quantity: req.body.quantity,
	});
	item.save()
		.then(() => {
			res.json(item);
		})
		.catch((err) => {
			res.json(err);
		});
});

// create a new location and add to database
app.post("/createLocation", (req, res) => {
	const location = new Location({
		name: req.body.name,
	});
	location
		.save()
		.then(() => {
			res.json(location);
		})
		.catch((err) => {
			res.json(err);
		});
});

// update an item in the database
app.put("/updateItem/:id", (req, res) => {
	if (req.body.location) {
		Location.findOne({ name: req.body.location })
			.then((location) => {
				if (location) {
					InventoryItem.findByIdAndUpdate(
						req.params.id,
						{
							name: req.body.name,
							quantity: req.body.quantity,
							location: req.body.location,
						},
						{ new: true }
					)
						.then((item) => {
							res.json(item);
						})
						.catch((err) => {
							res.json(err);
						});
				} else {
					res.json({ message: "Location does not exist" });
				}
			})
			.catch((err) => {
				res.json(err);
			});
	} else {
		InventoryItem.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				quantity: req.body.quantity,
				location: req.body.location,
			},
			{ new: true }
		)
			.then((item) => {
				res.json(item);
			})
			.catch((err) => {
				res.json(err);
			});
	}
});

app.put("/updateLocation/:id", (req, res) => {
	// update location items array with items that have the same location as the item being updated
	Location.findOne({ name: req.body.location })
		.then((location) => {
			if (location) {
				InventoryItem.find({ location: req.body.location })
					.then((items) => {
						location.items = items;
						location
							.save()
							.then(() => {
								res.json(location);
							})
							.catch((err) => {
								res.json(err);
							});
					})
					.catch((err) => {
						res.json(err);
					});
			} else {
				res.json({ message: "Location does not exist" });
			}
		})
		.catch((err) => {
			res.json(err);
		});
});

// delete an item from the database
app.delete("/deleteItem/:id", (req, res) => {
	InventoryItem.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ message: "Item Deleted" });
		})
		.catch((err) => {
			res.json(err);
		});
});

// delete a location from the database
app.delete("/deleteLocation/:id", (req, res) => {
	Location.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ message: "Location Deleted" });
		})
		.catch((err) => {
			res.json(err);
		});
});

// listen on port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
