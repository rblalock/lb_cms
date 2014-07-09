var loopback = require("loopback");
var ds = loopback.createDataSource("memory");

var Product = ds.createModel("product", {
	id: { type: Number, id: true },
	name: { type: String },
	description: { type: String, fieldType: "Textarea" }
});

// Dummy Data
Product.create([
	{ name: "Some Product", description: "product description here" },
	{ name: "Some Other Product", description: "product description here" },
	{ name: "Some Really Other Product", description: "product description here" }
]);

module.exports = Product;