var should = require("should");
var app = require("../../../app.js");
var queries = require("../lib/queries");
var testModel = require("./testmodel");
var sampleQuery = {
	format: 'json',
	model: 'product',
	search: '22',
	searchFilterValue: 'id',
	limit: '10',
	skip: '0',
	sortName: 'description',
	sortOrder: 'desc'
};

describe("queries.js", function () {

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
		var results = queries.list({ query: sampleQuery });
		
		results.should.be.an.Object;
		results.should.have.properties("limit", "skip", "include", "order", "fields", "where");
		results.order.should.be.an.String;
		results.where.should.have.properties("id");
		results.where.id.should.have.properties("like");
	});

});