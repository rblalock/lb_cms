var app = require("../app");
var ds = app.dataSources.db;

var Model = ds.createModel("product", {
	id: {
		type: Number,
		id: true,
		cms: { fieldType: "Textfield" }
	},
	name: {
		type: String,
		cms: { fieldType: "Textfield" }
	},
	description: {
		type: String,
		cms: { fieldType: "Textarea" }
	},
	type: {
		type: String,
		cms: { fieldType: "Select", selectOptions: ["Beverage", "Torta", "Dessert"] }
	},
	categoryId: {
		type: Number,
		cms: { fieldType: "Relation", reference: "name" }
	}
});

Model.belongsTo(app.models.category.modelName, {
	as: "category",
	foreignKey: "categoryId"
});

app.model( Model );

// Dummy Data
Model.create([
	{ name: "1 Some Product", description: "product description here", type: "Beverage", categoryId: 1 },
	{ name: "2 Some Other Product", description: "product description here", type: "Dessert" },
	{ name: "3 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "4 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "5 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "6 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "7 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "8 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "9 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "10 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "11 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "12 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "13Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "14Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "15 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "16 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "17 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "18 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "19 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "20 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "21 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "22 Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Other Product", description: "product description here", type: "Dessert" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Other Product", description: "product description here", type: "Dessert" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Other Product", description: "product description here", type: "Dessert" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" },
	{ name: "Some Really Other Product", description: "product description here", type: "Torta" }
]);