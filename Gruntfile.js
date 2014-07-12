var fs = require("fs");
var wrench = require("wrench");

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		shell: {
			sampleapp: {
				command: "nodemon test_app/app.js"
			},
			test: {
				command: "mocha test_app/node_modules/lb_cms/test --reporter spec"
			}
		}
	});

	grunt.registerTask("sampleapp", function () {
		wrench.copyDirSyncRecursive("source", "test_app/node_modules/lb_cms", {
			forceDelete: true
		});

		grunt.task.run("shell");
	});

	grunt.registerTask("mocha", function () {
		wrench.copyDirSyncRecursive("source", "test_app/node_modules/lb_cms", {
			forceDelete: true
		});

		grunt.task.run("shell:test");
	});

	grunt.loadNpmTasks("grunt-shell");
};