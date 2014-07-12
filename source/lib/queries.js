/**
 * Query builder
 * @class queries
 */

var CMS = require("../");

module.exports = {
	/**
	 * Builds the query / filter object for lists
	 * @param {Object} _req The standard express req object
	 */
	list: function(_req) {
		var query = {
			limit: parseInt(_req.query.limit) || 25,
			skip: parseInt(_req.query.skip) || 0,
			include: [],
			fields: {}
		};

		var relations = CMS.App.models[_req.query.model].relations;
		
		for(var prop in relations) {
			query.include.push( relations[prop].name );
		}

		if(_req.query.sortOrder && _req.query.sortName) {
			query.order = _req.query.sortName + " " + _req.query.sortOrder
		}

		if(_req.query.search) {
			query.where = {};
			query.where[_req.query.searchFilterValue] = {
				like: (typeof _req.query.search === "number") ? parseInt(_req.query.search) : _req.query.search
			};
		}
		
		return query;
	}
};