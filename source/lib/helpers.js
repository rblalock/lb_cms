/**
 * @class helpers
 */

var CMS = require("../");

module.exports = {
	/**
	 * Determines the ID / Unique key for a model
	 * @param {String} _model The model name
	 * @returns {String}
	 */
	determineIdField: function(_model) {
		var properties = CMS.App.models[_model].definition.properties;
		var idField = "";

		for(var prop in properties) {
			if(properties[prop].id == true) {
				idField = prop;
			}
		}

		return idField;
	}
};