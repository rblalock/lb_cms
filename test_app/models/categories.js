var app = require("../app");
var ds = app.dataSources.db;

var Model = ds.createModel("category", {
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
			fieldType: "Textfield", reference: "name"
		}
	}
});

app.model( Model );

// Dummy Data
Model.create([
	{ name: "Food" },
	{ name: "Paper Goods" },
	{ name: "Lawn" },
	{ name: "Pets" }
]);