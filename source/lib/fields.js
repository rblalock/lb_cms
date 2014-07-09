/**
 * @class helpers.fields
 */

module.exports = {
	/**
	 * Textfield component
	 * @param {String} _name The key / name of the field
	 * @param {String} _value (optional) The value to set for this component
	 * @return {String} Returns the html field template
	 */
	Textfield: function(_name, _value) {
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
	 * @param {String} _value (optional) The value to set for this component
	 * @return {String} Returns the html field template
	 */
	Textarea: function(_name, _value) {
		return {
			key: _name,
			html: '<textarea name="' + _name + '" ' +
						'class="form-control" ' +
						'id="' + _name + '" ' +
						'placeholder="Enter ' + _name + '">' + _value + '</textarea>'
		};
	}
};