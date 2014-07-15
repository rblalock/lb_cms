/**
 * @class fields
 */

var CMS = require("../");

module.exports = {
	/**
	 * Textfield component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value (optional) The value to set for this component
	 * @param {Object} _properties The field schema properties
	 * @param {Object} _model Loopback model
	 * @return {String} Returns the html field template
	 */
	Textfield: function(_name, _value, _properties, _model) {
		_value = _value || "";

		return {
			key: _name,
			html: '<input name="' + _name + '" ' +
						'type="text" ' +
						'class="form-control" ' +
						'id="' + _name + '" ' +
						'placeholder="Enter ' + _name + '" ' +
						'value="' + _value + '">'
		};
	},
	/**
	 * Textarea component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value The value to set for this component
	 * @param {Object} _properties The field schema properties
	 * @param {Object} _model Loopback model
	 * @return {String} Returns the html field template
	 */
	Textarea: function(_name, _value, _properties, _model) {
		_value = _value || "";

		return {
			key: _name,
			html: '<textarea name="' + _name + '" ' +
						'class="form-control" ' +
						'id="' + _name + '" ' +
						'placeholder="Enter ' + _name + '">' + _value + '</textarea>'
		};
	},
	/**
	 * Select component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value The value to set for this component
	 * @param {Object} _properties The field schema properties
	 * @param {Object} _model Loopback model
	 * @return {String} Returns the html field template
	 */
	Select: function(_name, _value, _properties, _model) {
		var select = '<select name="' + _name + '" id="' + _name + '" class="form-control">';

		if(_properties.cms.selectOptions) {
			_properties.cms.selectOptions.forEach(function(_option) {
				var selected = "";

				if(_value === _option) {
					selected = 'selected="selected"';
				}

				select += '<option ' + selected + '>' + _option + '</option>';
			});
		}

		select += '</select>';

		return {
			key: _name,
			html: select
		};
	},
	/**
	 * Relation component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value (optional) The value to set for this component
	 * @param {Object} _properties The field schema properties
	 * @param {Object} _model Loopback model
	 * @return {String} Returns the html field template
	 */
	Relation: function(_name, _value, _properties, _model) {
		var select = "";
		
		for(var prop in _model.relations) {
			if(_model.relations[prop].keyFrom && _model.relations[prop].keyFrom === _name) {
				var name = _value;

				if(CMS.App.models[prop]) {
					var modelSchema = CMS.App.models[prop].definition.properties;

					for(modelProps in modelSchema) {
						if(modelSchema[modelProps].cms.reference) {
							name = modelSchema[modelProps].cms.reference;
						}
					}
				}

				select = '<select data-model-name="' + prop + '" data-type="relation" name="' + _name + '" id="' + _name + '" class="form-control">';
				select += '<option value="' + _value + '" selected>' + name + '</option>';
				select += '<option>loading...</option>';
				select += '</select>';
			}
		}

		return {
			key: _name,
			html: select
		};
	}
};