var should = require("should");
var app = require("../../../app.js");
var helpers = require("../lib/helpers");
var testModel = require("./testmodel");

describe("helpers.js", function () {
	before(function(done) {
		app.on("started", function() {
			done();
		});

		if(!app._didStart) {
			app.start();
		} else {
			done();
		}
	});

	it("Should return the correct ID field of a model", function () {
		var idField = helpers.determineIdField("testproduct");
		idField.should.be.equal("id");
	});

	it("Should return an object with the name and HTML of the field", function () {
		testModel.find(function(_err, _data) {
			if(_err) {
				throw Error(_err);
			} else {
				var fields = helpers.renderFields(_data, testModel.definition.properties, testModel);

				fields.should.be.an.Array;
				fields[0].should.have.properties("key", "html");
			}
		});
	});

	it("Should replace the relation field with it's reference field", function () {
		var data = [{
			id: 1,
		    name: '1 Some Product',
		    description: 'product description here',
		    type: 'Beverage',
		    categoryId: 1,
		    category: function() {
			    return { id: 1, name: 'Food' }
		    }
		}];

		data = helpers.handleRelationFields(testModel, data, true);

		data[0].categoryId.should.be.an.String;
		data[0].categoryId.should.be.equal("Food");
	});

	it("Should replace the relation field with it's reference data object", function () {
		var data = [{
			id: 1,
		    name: '1 Some Product',
		    description: 'product description here',
		    type: 'Beverage',
		    categoryId: 1,
		    category: function() {
			    return { id: 1, name: 'Food' }
		    }
		}];

		data = helpers.handleRelationFields(testModel, data, false);

		data[0].categoryId.should.be.an.Object;
		data[0].categoryId.should.have.properties("id", "name");
	});

	it("Should define the header fields by their key and user defined values", function () {
		var headers = helpers.defineHeaderFields(testModel);
		
		headers[0].should.be.an.Object;
		headers[0].should.have.properties("key", "value");
	});

	it("Should grab any fields with a special reference / alias", function () {
		var references = helpers.defineReferenceFields(testModel);

		references.should.have.properties("categoryId");
		references.categoryId.should.be.equal("name");
	});
});