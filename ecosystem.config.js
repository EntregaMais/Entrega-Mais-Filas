module.exports = {
	apps : [{
	  name   : "consumidor",
	  script : "./src/consumidor.js",
	  instances  : 1,
	},{
	  name   : "produtor",
	  script : "./src/produtor.js",
	  instances  : 1,

	}]
  }