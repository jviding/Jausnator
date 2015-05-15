var DateStr = require('./dateStr');
var http = require('http');

var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Helsinki&mode=json&units=metric&cnt=1';

module.exports = {
  weatherToday: function(callback) {
    getJsonToday(callback);
  }
}

function getJsonToday(callback) {
	http.get(url, function(res) {
    	var body = '';
    	res.on('data', function(chunk) {
        	body += chunk;
    	});
    	res.on('end', function() {
        	createStringArray(JSON.parse(body), callback);
    	});
    }).on('error', function(e) {
      	console.log("Got error: ", e);
    });
}

function createStringArray(data, callback) {
	var array = [];
	var day = data["list"][0];
	array.push("Weather in Helsinki today:");
	array.push(" "+day["weather"][0]["main"]+" ("+day["weather"][0]["description"]+")");
	array.push(" Temperatures:");
	array.push("   min:     "+day["temp"]["min"]+"    max:   "+day["temp"]["max"]);
	array.push("   morning: "+day["temp"]["morn"]+ "    day:   "+day["temp"]["day"]);
	array.push("   evening: "+day["temp"]["eve"]+ "    night: "+day["temp"]["night"]);
	callback(array);
}