$(document).ready(function(){
	
	var city;
	
	
	getLocation();
	function getLocation(){
		$.get("http://ipinfo.io", function(response) {
		    $("#address").html(response.city + ", " + response.region);
		    city = response.city;
		    var units = getUnits(response.country);
		    getWeather(response.loc, units);
		    
		}, "jsonp");
	
	}
	
	function getWeather(loc, units) {
	    lat = loc.split(",")[0];
	    lon = loc.split(",")[1];
	
	    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units;
	
	    console.log(weatherApiUrl);
	
	    $.get(weatherApiUrl, function(weather) {
	      var windDir = convertWindDirection(weather.wind.deg);
	      var temperature = weather.main.temp;
	      var unitLabel;
	
	      //label based in imperial vs metric units
	      if (units === "imperial") {
	        unitLabel = "F";
	      } else {
	        unitLabel = "C";
	      }
	
	      temperature = parseFloat((temperature).toFixed(1));
	
	      console.log(weather);
	
	      $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
	
	      $('#temp').append(temperature + " " + unitLabel);
	      $('#conditions').append(weather.weather[0].description);
	      $('#min').append(weather.main.temp_min + " "+unitLabel);
	      $('#max').append(weather.main.temp_max + " "+unitLabel);
	      $('#humidity').append(weather.main.humidity + "%");
	      $('#wind').append(windDir + ", " + weather.wind.speed + " knots");
	      $('#postal').append(postal);

    }, "jsonp");

  };
  
   function convertWindDirection(dir) {
    var rose = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }

  function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }


});

