var loopback = require("loopback");
var ds = loopback.createDataSource("memory");

var Product = ds.createModel("product", {
	id: {
		type: Number,
		id: true,
		cms: {
			fieldType: "Textfield"
		}
	},
	name: {
		type: String,
		cms: {
			fieldType: "Textfield"
		}
	},
	description: {
		type: String,
		cms: {
			fieldType: "Textarea"
		}
	},
	type: {
		type: String,
		cms: {
			fieldType: "Select",
			selectOptions: ["Beverage", "Torta", "Dessert"]
		}
	}
});

// Dummy Data
Product.create([
	{ name: "Some Product", description: "product description here", type: "Beverage" },
	{ name: "Some Other Product", description: "product description here", type: "Dessert" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" }
]);

module.exports = Product;