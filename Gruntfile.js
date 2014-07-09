var fs = require("fs");
var wrench = require("wrench");

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		shell: {
			testapp: {
				command: "nodemon test_app/app.js"
			}
		}
	});

	grunt.registerTask("testapp", function () {
		wrench.copyDirSyncRecursive("source", "test_app/node_modules/lb_cms", {
			forceDelete: true
		});

		grunt.task.run("shell");
	});

	grunt.loadNpmTasks("grunt-shell");
};