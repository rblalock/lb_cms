var app = require("../../../app.js");
var ds = app.dataSources.db;

// Test model
var TestModel = ds.createModel("testproduct", {
	id: { type: Number, id: true, cms: { fieldType: "Textfield" } },
	name: { type: String, cms: { fieldType: "Textfield" } },
	description: { type: String, cms: { fieldType: "Textarea" } },
	type: { type: String, cms: { fieldType: "Select", selectOptions: ["Beverage", "Torta", "Dessert"] } },
	categoryId: { type: Number, cms: { fieldType: "Relation", reference: "name" } }
});

TestModel.belongsTo(app.models.category.modelName, {
	as: "category",
	foreignKey: "categoryId"
});

app.model( TestModel );

TestModel.create([
	{ name: "1 Some Product", description: "product description here", type: "Beverage", categoryId: 1 }
]);

module.exports = TestModel;