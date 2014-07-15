var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

/**
 * The CMS singleton
 * @class cms
 */
var CMS = {
	/**
	 * The express app instance - i.e. var app = loopback();
	 * @type {Object}
	 */
	App: {},
	/**
	 * The static loopback module reference - i.e. var loopback = require("loopback");
	 * @type {Object}
	 */
	Loopback: {},
	/**
	 * Properties set to this CMS
	 * @type {Object}
	 */
	Params: {},
	/**
	 * The field generator module.  This is exposed here so it can be overwritten by the developer.
	 * @type {Object}
	 */
	FieldGenerator: {},
	/**
	 * Inits the app
	 * @param {Object} _app The express app instance
	 * @param {Object} _loopback The static loopback reference
	 * @param {Object} _params Params for this CMS
	 * @param {String} _params.title The title of this CMS
	 * @param {String} _params.viewsOverride The views directory override for the admin interface
	 * @param {String} _params.viewEngineOverride The view engine / system
	 * @param {String} _params.templateOverride The override path for the admin UI template
	 */
	init: function (_app, _loopback, _params) {
		_params = _params || {};

		// Setup the singleton
		CMS.App = _app;
		CMS.Loopback = _loopback;
		CMS.FieldGenerator = require("./lib/fields");
		CMS.params = _params;

		// Setup up the body parser TODO should this be optional or let user define?
		CMS.App.use(bodyParser.urlencoded({
			extended: true
		}));
		CMS.App.use(bodyParser.json());

		// Handle the view directory override for the admin interface
		if(_params.viewsOverride) {
			CMS.App.set("views", _params.viewsOverride);
		} else {
			CMS.App.set("views", __dirname + "/views");
		}

		// Template files override
		if(_params.templateOverride) {
			CMS.App.use(CMS.Loopback.static(_params.templateOverride));
		} else {
			CMS.App.use(CMS.Loopback.static(path.join(__dirname, "public")));
		}

		// Handle view engine override
		if(_params.viewEngineOverride) {
			CMS.App.set("view engine", _params.viewEngineOverride);
		} else {
			CMS.App.set("view engine", "ejs");
		}

		// Setup admin routes
		require("./routes")();
	}
};

module.exports = CMS;