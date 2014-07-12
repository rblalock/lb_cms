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
	/**
	 * The main admin home screen
	 */
	CMS.App.get("/administrator", function(_req, _res) {
		_res.render("home", {
			title: CMS.params.title,
			modelsMenu: modelsMenu
		});
	});

	/**
	 * The model list screen
	 */
	CMS.App.get("/administrator/list", function(_req, _res) {
		if(CMS.App.models[_req.query.model]) {
			CMS.App.models[_req.query.model].count(query.list(_req).where, function(_countErr, _countData) {
				CMS.App.models[_req.query.model].find(query.list(_req), function(_err, _data) {
					var idField = helpers.determineIdField(_req.query.model);
					var headers = Object.keys(CMS.App.models[_req.query.model].definition.properties);
					_data = helpers.handleRelationFields(CMS.App.models[_req.query.model], _data, true);
					
					if(_req.query.format === "json") {
						_res.send({
							total: _countData,
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
								key: _req.query.searchFilterValue || headers[0],
								text: _req.body.search ||  ""
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
	CMS.App.get("/administrator/detail", function(_req, _res) {
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
						var headers = Object.keys(properties);
						var fields = helpers.renderFields(_data, properties);
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
	CMS.App.post("/administrator/detail", function(_req, _res) {
		if(CMS.App.models[_req.query.model]) {
			var idField = helpers.determineIdField(_req.query.model);
			
			if(_req.query.id !== "null") {
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