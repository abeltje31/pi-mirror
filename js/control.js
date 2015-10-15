jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function roundVal(temp)
{
	return parseFloat(Math.round(temp * 100) / 100).toFixed(1);
}

function kmh2beaufort(kmh)
{
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}

jQuery(document).ready(function($) {

    moment.lang('nl');

    (function checkVersion()
    {
        $.getJSON('gitversion.php', {}, function(json, textStatus) {
            if (json) {
                if (json.gitversion != currentgitversion) {
                    window.location.reload();
                    window.location.href=window.location.href;
                }
            }
        });
        setTimeout(function() {
            checkVersion();
        }, 10000);
    })();
	
	(function updateTime()
	{
        var now = moment();
        var date = now.format('LLLL').split(' ',4);
        date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">'+now.format('ss')+'</span>');

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();
	
	(function updateNS()
	{
		var now = moment();
		var nsURL;
		var filterStation;
		
		if (now.format("HH")<"12")
		{
			nsURL = 'ns.php?station=HT';
			startStation = "/'s-Hertogenbosch";
			filterStation = "Eindhoven";
		}
		else
		{
			nsURL = 'ns.php?station=EHV';
			startStation = "Eindhoven";
			filterStation = "s-Hertogenbosch";
		}
		
		$.getJSON(nsURL, function(json, textStatus){
			var nsTable = $('<table />').addClass('ns-table').addClass('small');
			var nsData = json.VertrekkendeTrein;
			var opacity = 1;
			
			var startRow = $('<tr />');
			startRow.append($('<td colspan="4"/>').html("Vertrektijden vanaf " + startStation));
			nsTable.append(startRow);
			$.each(nsData, function(idx, obj){
				
				var addToTable = false;
				
				if(obj.EindBestemming !== undefined)
				{
					if(obj.EindBestemming==filterStation)
					{
						addToTable = true;
					}
				}
					
				if(obj.RouteTekst !== undefined)
				{
					if(obj.RouteTekst.indexOf(filterStation)>=0)
					{
						addToTable = true;
					}
					
				}
				
				if(addToTable)
				{
					var row = $('<tr />').css('opacity', opacity);
					
					switch(obj.TreinSoort)
					{
						case "Intercity":
							row.append($('<td/>').addClass('icon-small').addClass('train-ic'));
							break;
						case "Sprinter":
							row.append($('<td/>').addClass('icon-small').addClass('train-sprinter'));
							break;
						default:
							row.append($('<td/>'));
							break;
					}
					
					
					if(obj.VertrekSpoor !== undefined)					
					{
						row.append($('<td/>').html(obj.VertrekSpoor));
					}
					else
					{
						row.append($('<td/>'));
					}
					
					if(obj.EindBestemming !== undefined)
					{
						row.append($('<td/>').html(obj.EindBestemming));
					}
					else
					{
						row.append($('<td/>'));
					}
					
					if(obj.VertrekTijd !== undefined)
					{
						row.append($('<td/>').html(moment(obj.VertrekTijd).format("HH:mm")));
					}
					else
					{
						row.append($('<td/>'));
					}
					
					if(obj.VertrekVertragingTekst !== undefined)
					{
						row.append($('<td/>').html(obj.VertrekVertragingTekst));
					}
					else
					{
						row.append($('<td/>'));
					}	
				
					nsTable.append(row);
					opacity -= 0.1;
				}
			});
		
			$('.ns').updateWithText(nsTable, 1000);
		});
	
		setTimeout(function() {
			updateNS();
		}, 60000);
	
	})();
	
	
	// 118.7
	// 134,4

	(function updateTraffic()
	{
		$.getJSON('traffic.php', function(json, textStatus){
			var trafficTable = $('<table />').addClass('traffic-table').addClass('small');
			var filedata = json.filedata;
			var meldingen = filedata.meldingen;
			var melding = meldingen.melding;
			var opacity = 1;
			$.each(melding, function(idx, obj){
				if((obj.wegnr=="A59"))
				{
					if(((parseFloat(obj.hectostart)<=134.3)&&(parseFloat(obj.hectostart)>=118.7))||
					   ((parseFloat(obj.hectoeind)<=134.3)&&(parseFloat(obj.hectoeind)>=118.7))||
					   ((parseFloat(obj.hectostart)>=134.3)&&(parseFloat(obj.hectoeind)<=118.7))||
					   ((parseFloat(obj.hectoeind)>=134.3)&&(parseFloat(obj.hectostart)<=118.7)))
					{
						var row = $('<tr />').css('opacity', opacity);
						row.append($('<td/>').html(obj.wegnr));
						row.append($('<td/>').html(obj.hectostart));	
						row.append($('<td/>').html(obj.hectoeind));
						row.append($('<td/>').html(obj.van));
						row.append($('<td/>').html(obj.naar));
						row.append($('<td/>').html(obj.afstand + " km"));
						trafficTable.append(row);
						opacity -= 0.1;
					}
				}
			});
		
			$('.traffic').updateWithText(trafficTable, 1000);
		});
	
		setTimeout(function() {
			updateTraffic();
		}, 60000);
	
	})();
	
	(function updateCurrentWeather()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}


		$.getJSON('weather.php?type=weather', function(json, textStatus) {

			var temp = roundVal(json.main.temp);
			var temp_min = roundVal(json.main.temp_min);
			var temp_max = roundVal(json.main.temp_max);

			var wind = roundVal(json.wind.speed);

			var iconClass = iconTable[json.weather[0].icon];
			var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
			$('.temp').updateWithText(icon.outerHTML()+temp+'&deg;', 1000);

			// var forecast = 'Min: '+temp_min+'&deg;, Max: '+temp_max+'&deg;';
			// $('.forecast').updateWithText(forecast, 1000);

			var now = new Date();
			var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
			var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);

			var windString = '<span class="wi wi-strong-wind xdimmed"></span> ' + wind;
			var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
			if (json.sys.sunrise*1000 < now && json.sys.sunset*1000 > now) {
				sunString = '<span class="wi wi-sunset xdimmed"></span> ' + sunset;
			}

			$('.windsun').updateWithText(windString + ' ' + sunString, 1000);
		});

		setTimeout(function() {
			updateCurrentWeather();
		}, 300000);
	})();
	
		(function updateWeatherForecast()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}
			$.getJSON('weather.php?type=forecast', function(json, textStatus) {

			var forecastData = {};

			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey  = forecast.dt_txt.substring(0, 10);

				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp':forecast.dt * 1000,
						'icon':forecast.weather[0].icon,
						'temp_min':forecast.main.temp,
						'temp_max':forecast.main.temp
					};
				} else {
					forecastData[dateKey]['icon'] = forecast.weather[0].icon;
					forecastData[dateKey]['temp_min'] = (forecast.main.temp < forecastData[dateKey]['temp_min']) ? forecast.main.temp : forecastData[dateKey]['temp_min'];
					forecastData[dateKey]['temp_max'] = (forecast.main.temp > forecastData[dateKey]['temp_max']) ? forecast.main.temp : forecastData[dateKey]['temp_max'];
				}

			}


			var forecastTable = $('<table />').addClass('forecast-table');
			var opacity = 1;
			for (var i in forecastData) {
				var forecast = forecastData[i];
			    var iconClass = iconTable[forecast.icon];
				var dt = new Date(forecast.timestamp);
				var row = $('<tr />').css('opacity', opacity);

				row.append($('<td/>').addClass('day').html(moment.weekdaysShort(dt.getDay())));
				row.append($('<td/>').addClass('icon-small').addClass(iconClass));
				row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)));
				row.append($('<td/>').addClass('temp-min').html(roundVal(forecast.temp_min)));

				forecastTable.append(row);
				opacity -= 0.1;
			}


			$('.forecast').updateWithText(forecastTable, 1000);
		});

		setTimeout(function() {
			updateWeatherForecast();
		}, 60000);
	})();
});
