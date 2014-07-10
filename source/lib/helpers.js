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
	determineIdField: function (_model) {
		var properties = CMS.App.models[_model].definition.properties;
		var idField = "";

		for (var prop in properties) {
			if (properties[prop].id == true) {
				idField = prop;
			}
		}

		return idField;
	},
	/**
	 * Render fields for data set
	 * @param {Array} _data
	 * @param {Object} _properties
	 * @return {Array}
	 */
	renderFields: function (_data, _properties) {
		var fields = [];
		_data = _data || {};

		for (var prop in _properties) {
			var obj = _properties[prop];

			if (obj.cms.fieldType) {
				fields.push(
					CMS.FieldGenerator[obj.cms.fieldType](prop, _data[prop] || null, _properties[prop])
				);
			}
		}

		return fields;
	}
};