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
	return Math.round(temp * 10) / 10;
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

    moment.lang(lang);

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
		$.getJSON('ns.php', function(json, textStatus){
			var nsTable = $('<table />').addClass('ns-table').addClass('small');
			var nsData = json.VertrekkendeTrein;
			var opacity = 1;
			$.each(nsData, function(idx, obj){
				if((obj.EindBestemming=="Eindhoven")||
				(obj.RouteTekst.indexOf("Eindhoven")>=0))
				{
					var row = $('<tr />').css('opacity', opacity);
					if(obj.TreinSoort=="Intercity")
					{
						row.append($('<td/>').html('<img src="img/logo_ic.png" widht="20px" height="20px" />'));
					}
					else if(obj.TreinSoort=="Sprinter")
					{
						row.append($('<td/>').html('<img src="img/logo_stoptrein.png" widht="20px" height="20px" />'));
					}
					row.append($('<td/>').html(obj.VertrekSpoor));
					row.append($('<td/>').html(obj.EindBestemming));
					row.append($('<td/>').html(moment(obj.VertrekTijd).format("HH:mm")));
					row.append($('<td/>').html(obj.VertrekVertragingTekst));
				
					nsTable.append(row);
					opacity -= 0.05;
				}
			});
		
			$('.ns').updateWithText(nsTable, 1000);
		});
	
		setTimeout(function() {
			updateNS();
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


		$.getJSON('http://api.openweathermap.org/data/2.5/weather', weatherParams, function(json, textStatus) {

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
});
