## Data Editor / CMS for Loopback

This **early alpha** provides the base for a CMS-like app built on [Loopback][1].  The concept is similar to some "scaffolding" apps available in other languages / frameworks or as a base CMS to built a user-centric data management product from.  This is a work in progress of course so things could change at any point.  I'm putting it out there right now for others to use and hopefully contribute.

## Code Example

Giving a Loopback app a CMS / Admin interface is as easy as dropping this in your Loopback app (presumably app.js and before you start the server, of course):

    var cms = require("lb_cms");
    
    cms.init(app, loopback, {
	    title: "Data Management" // Title shown at top of admin
    });
    
Then visit your server URL (e.g. `localhost:3000`) and append `/administrator` to it and you're off to the races.

## Setup

Below are the *temporary* steps to get the cms up and running.  Once this library gets its own NPM, it will be one step and not several (I just haven't got there yet).

 1. Download the repo in whichever manner you prefer
 2. In the root of the project, `npm install -d` (this will install the dependencies for running grunt, unit tests, etc.)
 3. In the `source` of the project, `npm install -d` (this will install the dependencies for the source code, which is needed at this point to build the sample app)
 4. In the `test_app` of the project, `npm install -d` (this will install all dependencies for the sample app).

Doing the steps above will set you up for developing on the source code, testing the sample app, running unit tests, etc.

#### Run the Sample Project

- run: `grunt sampleproject`
- visit: `0.0.0.0:3000/administrator`
- login:
    - username: `foo@foobar.com` 
    - password: `bar`
 
#### Run the Unit Tests

- run: `grunt mocha`

## Other Code Examples

#### CMS Init

In addition to the example above, you can add a few more params to the CMS init:

`ignoreModels`: Takes an array of strings which are the names of the models to ignore.  Use this to skip models that aren't real models users should be editing.  Sample:

    ignoreModels: ["email", "user", "application", "acl", "roleMapping", "role", "scope", "push", "installation", "notification"]
    
`viewsOverride`: This will override the `views` of the admin UI.  Use this to create your own views for the admin  Sample:

    viewsOverride: __dirname + "/views/adminlte"

`templateOverride`: Along the lines with the `viewsOverride`, this will let you overwrite the JS, CSS, and other assets of the admin template.  Sample:

    templateOverride: __dirname + "/public"
    
The override params are great if you want to have a custom admin theme, use something other than the standard view system I implemented (like using AngularJS instead), etc.

#### Model Configuration

The CMS should work out of the box with no changes to Loopback models.  However, if you want to customize each field so it has a specific form field in the admin, there are a few currently available.  Reference the sample app's "product" model as an example:

    var app = require("../app");
    var ds = app.dataSources.db;
    
    var Model = ds.createModel("product", {
    	id: {
    		type: Number,
    		id: true,
    		cms: { fieldType: "Textfield" }
    	},
    	name: {
    		type: String,
    		cms: { fieldType: "Textfield" }
    	},
    	description: {
    		type: String,
    		cms: { fieldType: "Textarea" }
    	},
    	type: {
    		type: String,
    		cms: { fieldType: "Select", selectOptions: ["Beverage", "Torta", "Dessert"] }
    	},
    	categoryId: {
    		type: Number,
    		cms: { fieldType: "Relation", reference: "name", readableName: "category" }
    	},
    	boolTest: {
    		type: Boolean,
    		cms: { fieldType: "Checkbox" }
    	}
    });
    
    Model.belongsTo(app.models.category.modelName, {
    	as: "category",
    	foreignKey: "categoryId"
    });
    
    app.model( Model );

Which gives you:  [https://db.tt/8MDcIOmG][2]

## Special Notes
I've only tested this against Loopback's memory data connector.  Alledgely it will work against any data source without any changes in code but the devil's in the details there.

The library is written as a singleton, so one usage per Loopback instance.

The library works for Loopback 1.9.1.  Migration to Loopback 2.0 is planned.

## Roadmap and Plans
I'll work to have a wiki up soon to get this more fleshed out.  Big ticket items are: It's own NPM (so its easy to install), better security for login (such as CSFR token check, etc), multiple data source, more field types, etc.

## Contributing

Fork and pull requests please.

The project uses the git flow method for branching and such - check it out here if you're not familiar with it: [http://danielkummer.github.io/git-flow-cheatsheet/][3]

## Credits

Thanks to [https://github.com/almasaeed2010/AdminLTE][4] for the great open source admin theme!

## License

This project is licensed under Apache 2.0 (see the attached LICENSE file).


  [1]: loopback.io
  [2]: https://db.tt/8MDcIOmG
  [3]: http://danielkummer.github.io/git-flow-cheatsheet/
  [4]: https://github.com/almasaeed2010/AdminLTE