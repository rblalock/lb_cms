/**
 * @class helpers.fields
 */

module.exports = {
	/**
	 * Textfield component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value (optional) The value to set for this component
	 * @param {Object} _properties The field schema properties
	 * @return {String} Returns the html field template
	 */
	Textfield: function(_name, _value, _properties) {
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
	 * @return {String} Returns the html field template
	 */
	Textarea: function(_name, _value, _properties) {
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
	 * @return {String} Returns the html field template
	 */
	Select: function(_name, _value, _properties) {
		var select = '<select name="' + _name + '" id="' + _name + '" class="form-control">';

		if(_properties.selectOptions) {
			_properties.selectOptions.forEach(function(_option) {
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
	}
};