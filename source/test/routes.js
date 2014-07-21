var should = require("should");
var supertest = request = require('supertest');
var app = require("../../../app.js");
var testModel = require("./testmodel");
var token;

describe("routes.js", function () {

	before(function(done) {
		app.on("started", function() {
			// Need to create a user first
			var User = app.models.user;
			User.create({ email: "foo@bar.com", password: "bar" }, function (err, user) {
				app.models.user.login({ email: "foo@bar.com", password: "bar" }, function(err, accessToken) {
					if(accessToken) {
						token = accessToken;
					}

					done();
				});
			});
		});

		if(!app._didStart) {
			app.start();
		} else {
			done();
		}
	});

	it("GET /administrator", function (done) {
		supertest(app)
			.get("/administrator?cms-auth=" + token)
			.expect(200, done);
	});

	it("GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct&cms-auth=" + token)
			.expect(200, done);
	});

	it("JSON Response GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct&format=json&cms-auth=" + token)
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("Search GET /administrator/list", function (done) {
		supertest(app)
			.get("/administrator/list?model=testproduct&format=json&search=Food&searchFilterValue=name&cms-auth=" + token)
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("GET /administrator/detail", function (done) {
		supertest(app)
			.get("/administrator/detail?model=testproduct&id=1&cms-auth=" + token)
			.expect(200, done);
	});

	it("DELETE /administrator/detail", function (done) {
		supertest(app)
			.get("/administrator/detail?model=testproduct&id=1&action=delete&cms-auth=" + token)
			.expect(302, done);
	});

	it("POST /administrator/detail", function (done) {
		var postData = {
			name: "Test Post",
			description: "Description....",
			type: "Yum"
		};

		supertest(app)
			.post("/administrator/detail?model=testproduct&cms-auth=" + token)
			.send(postData)
			.expect(302, done);
	});

});