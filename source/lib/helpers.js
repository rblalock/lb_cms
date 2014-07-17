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
	 * @param {Object} _data
	 * @param {Object} _properties
	 * @param {Object} _model
	 * @return {Array}
	 */
	renderFields: function (_data, _properties, _model) {
		var fields = [];
		_data = _data || {};

		for (var prop in _properties) {
			var obj = _properties[prop];
			var fieldType, field;

			// TODO for maintenance this will probably need to be abstracted out.  I imagine
			// we'll need to start using this check a lot when it comes to CRUD operations...
			// unless LB does the checks for us already - need to investigate.
			if (obj.cms && obj.cms.fieldType) {
				fieldType = obj.cms.fieldType;
			} else {
				fieldType = (typeof obj.type === "function") ? typeof obj.type() : typeof obj.type;
			}
			
			if(CMS.FieldGenerator[fieldType]) {
				field = CMS.FieldGenerator[fieldType](prop, _data[prop] || null, _properties[prop], _model);
			} else {
				field = CMS.FieldGenerator.Textarea(prop, _data[prop] || null, _properties[prop], _model);
			}
			
			fields.push(field);
		}

		return fields;
	},
	/**
	 * Find and return reference fields
	 * @param {Object} _model Loopback model
	 * @return {Object}
	 */
	defineReferenceFields: function(_model) {
		var references = {};
		var modelSchema = _model.definition.properties;

		for (modelProps in modelSchema) {
			if (modelSchema[modelProps].cms && modelSchema[modelProps].cms.reference) {
				references[modelProps] = modelSchema[modelProps].cms.reference;
			}
		}

		return references;
	},
	/**
	 * Handle header fields default vs. user defined
	 * @param {Object} _model
	 * @return {Array}
	 */
	defineHeaderFields: function(_model) {
		var fields = _model.definition.properties;
		var headers = [];

		for(var prop in fields) {
			if(fields[prop].cms && fields[prop].cms.readableName) {
				headers.push({
					key: prop,
					value: fields[prop].cms.readableName
				});
			} else {
				headers.push({
					key: prop,
					value: prop
				});
			}
		}
		
		return headers;
	},
	/**
	 * Handles swapping out the relational data with relevant info
	 * @param {Object} _model
	 * @param {Array} _data
	 * @param {Boolean} _reference Whether to just return the value from the reference property
	 * @return {Array}
	 */
	handleRelationFields: function(_model, _data, _reference) {
		var relations = _model.relations;
		var data = [];

		_data.forEach(function(_row) {
			var row = {};

			for(var rowProp in _row) {
				var flag;

				for(var prop in relations) {
					if(_row[relations[prop].keyFrom] !== undefined) {
						var relationObject = _row[relations[prop].name]();
						var schema = _model.definition.properties[relations[prop].keyFrom];

						if(_reference && schema.cms && schema.cms.reference) {
							relationObject = relationObject[schema.cms.reference];
						} else if(_reference) {
							relationObject = _row[relations[prop].keyFrom];
						}

						row[relations[prop].keyFrom] = relationObject;
						flag = relations[prop].keyFrom;
					}
				}
				
				if(rowProp !== flag) {
					row[rowProp] = _row[rowProp];
				}
			}

			data.push(row);
		});

		return data;
	}
};