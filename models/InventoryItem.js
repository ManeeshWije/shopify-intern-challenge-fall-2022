const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	quantity: {
		type: Number,
	},
	location: {
		type: String,
		default: "No Location",
	},
});

const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItem;
