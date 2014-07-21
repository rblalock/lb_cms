/**
 * Standard admin routes
 */

var CMS = require("../");
var _ = require("lodash");
var helpers = require("../lib/helpers");
var query = require("../lib/queries");

// For the model menus TODO should go elsewhere
var modelsMenu = [];
CMS.App.models().forEach(function(_model) {
	if(!_.contains(CMS.params.ignoreModels, _model.modelName)) {
		modelsMenu.push( _model.modelName );
	}
});

module.exports = function() {
	// Token check middleware
	function tokenCheck(_req, _res, next) {
		// WHY DON'T THESE WORK?!
		if(_req.signedCookies.access_token) {
			CMS.App.models.accessToken.findForRequest(_req, {}, function(_err, _token) {
				console.log(_token);
			});
		}

		CMS.App.models.accessToken.validate(function(_err, _isValid) {
			console.log(_err, _isValid);
		});
		
		// TODO how does LB handle expired tokens?  Null the object out?  Place something inside?
		// Also any convenience methods for checking for stale tokens and such?
		// HOW DO WE CHECK IF VALID USER?!  None of the above methods work!
		var isLoggedIn = true;

		if(!isLoggedIn) {
			// TODO Should render JSON or the login screen depending on request
			_res.render("login");
		} else {
			next();
		}
	}
	
	/**
	 * The main admin home screen
	 */
	CMS.App.get("/administrator", tokenCheck, function(_req, _res) {
		_res.render("home", {
			title: CMS.params.title,
			modelsMenu: modelsMenu
		});
	});

	/**
	 * The login screen
	 */
	CMS.App.get("/login", tokenCheck, function(_req, _res) {
		_res.render("login");
	});

	CMS.App.post("/login", function(_req, _res) {
		CMS.App.models.user.login({
			email: _req.body.userid,
			username: _req.body.userid,
			password: _req.body.password
		}, function(err, accessToken) {
			if(accessToken) {
				_res.cookie("access_token", accessToken, { signed: true });
				_res.redirect("/administrator");
			} else {
				_res.render("login");
			}
		});
	});

	/**
	 * Logout routine
	 */
	CMS.App.get("/logout", function(_req, _res) {
		CMS.App.models.user.logout(_req.signedCookies.access_token, function (err) {
			console.log(err);

			_res.clearCookie("access_token");
			_res.render("login");
		});
	});

	/**
	 * The model list screen
	 */
	CMS.App.get("/administrator/list", tokenCheck, function(_req, _res) {
		if(CMS.App.models[_req.query.model]) {
			CMS.App.models[_req.query.model].count(query.list(_req).where, function(_countErr, _countData) {
				CMS.App.models[_req.query.model].find(query.list(_req), function(_err, _data) {
					var idField = helpers.determineIdField(_req.query.model);
					var headers = helpers.defineHeaderFields(CMS.App.models[_req.query.model]);
					var references = helpers.defineReferenceFields(CMS.App.models[_req.query.model]);
					_data = helpers.handleRelationFields(CMS.App.models[_req.query.model], _data, true);

					if(_req.query.format === "json") {
						_res.send({
							total: _countData,
							references: references,
							rows: _data
						});
					} else {
						_res.render("list", {
							title: CMS.params.title,
							data: _data,
							headers: headers,
							modelName: _req.query.model,
							idField: idField,
							modelsMenu: modelsMenu,
							filters: {
								key: _req.query.searchFilterValue || headers[0].key,
								text: _req.query.search ||  ""
							}
						});
					}
				});
			});
		}
	});

	/**
	 * The model record detail screen
	 */
	CMS.App.get("/administrator/detail", tokenCheck, function(_req, _res) {
		if(CMS.App.models[_req.query.model]) {
			// Handle the delete action
			if(_req.query.action && _req.query.action === "delete") {
				CMS.App.models[_req.query.model].deleteById(_req.query.id, function(_err) {
					_res.redirect("administrator/list?model=" + _req.query.model);
				});
			} else {
				// Handle getting record by ID
				CMS.App.models[_req.query.model].findById(_req.query.id, function(_err, _data) {
					if(!_err) {
						var properties = CMS.App.models[_req.query.model].definition.properties;
						var headers = helpers.defineHeaderFields(CMS.App.models[_req.query.model]);
						var fields = helpers.renderFields(_data, properties, CMS.App.models[_req.query.model]);
						var idField = helpers.determineIdField(_req.query.model);

						_res.render("detail", {
							title: CMS.params.title,
							data: _data,
							fields: fields,
							headers: headers,
							modelName: _req.query.model,
							idField: idField,
							id: _req.query.id,
							modelsMenu: modelsMenu,
							success: _req.query.success
						});
					} else {

					}
				});
			}
		}
	});

	/**
	 * The model record post
	 */
	CMS.App.post("/administrator/detail", tokenCheck, function(_req, _res) {
		if(CMS.App.models[_req.query.model]) {
			var idField = helpers.determineIdField(_req.query.model);
			
			if(_req.query.id !== "null") { // <-- ewww
				_req.body[idField] = _req.query.id;
			}
			
			// Update and redirect to the detail screen again
			CMS.App.models[_req.query.model].upsert(_req.body, function(_err, _data) {
				var query = (_req.query.id === "null") ? "&id=" + _data[idField] : "";

				if(!_err) {
					_res.redirect(_req.get("referrer") + "&success=true" + query);
				} else {
					_res.redirect(_req.get("referrer") + "&success=false" + query);
				}
			});
		}
	});
};