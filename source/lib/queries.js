/**
 * Query builder
 * @class queries
 */

module.exports = {
	/**
	 * Builds the query / filter object for lists
	 * @param {Object} _req The standard express req object
	 */
	list: function(_req) {
		var query = {
			limit: parseInt(_req.query.limit) || 25,
			skip: parseInt(_req.query.skip) || 0
		};

		if(_req.query.search) {
			query.where = {};
			query.where[_req.query.searchFilterValue] = {
				like: (typeof _req.query.search === "number") ? parseInt(_req.query.search) : _req.query.search
			};
		}

		return query;
	}
};