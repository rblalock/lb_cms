var should = require("should");
var supertest = request = require('supertest');
var app = require("../../../app.js");
var testModel = require("./testmodel");

describe("routes.js", function () {

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

	it("GET /administrator", function (done) {
		supertest(app)
			.get("/administrator")
			.expect(200, done);
	});

	it("GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct")
			.expect(200, done);
	});

	it("JSON Response GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct&format=json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("Search GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct&format=json&search=Food&searchFilterValue=name")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("GET /administrator/detail", function (done) {
		supertest(app)
			.get("/administrator/detail?model=testproduct&id=1")
			.expect(200, done);
	});

	it("DELETE /administrator/detail", function (done) {
		supertest(app)
			.get("/administrator/detail?model=testproduct&id=1&action=delete")
			.expect(302, done);
	});

	it("POST /administrator/detail", function (done) {
		var postData = {
			name: "Test Post",
			description: "Description....",
			type: "Yum"
		};

		supertest(app)
			.post("/administrator/detail?model=testproduct")
			.send(postData)
			.expect(302, done);
	});

});