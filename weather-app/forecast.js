


$(document).ready(function(){

	$("#submitForecast").click(function(){
		return getForecast();
	});
});



function getForecast(){
	var	weather = 'q'
	var city = $("#city").val();
	var country = $("#CountryCode").val();
	var appID ='9e1f6d31dab593653f0f8cef7e0668f4';
	var units = 'imperial';

	

	if(city != '' && country != ''){

		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/forecast?${weather}=${city},${country}&units=${units}&appid=${appID}`,
			type:"GET",
			dataType: "jsonp",
			success: function(data){
				console.log(data);
				var table='';
				var header=`<h2 style="font-weight:bold;">Weather forecast for ${city}</h2>`
				for(var i = 0; i < data.list.length; i++){
					var time = data.list[i].dt_txt;
					var timeFormatted = moment(time).format("MMM Do YYYY hh:mm a");

					table += "<tr>";
						table += "<td> <img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>"
						table += "<td>" + data.list[i].weather[0].main+ "</td>"
						table += "<td>" + data.list[i].weather[0].description+ "</td>"
						table += "<td>" + data.list[i].clouds.all + " %</td>"
						table += "<td>" + Math.floor(data.list[i].main.temp) + "&deg;C</td>"
						table += "<td>" + Math.floor(data.list[i].main.temp_min) + "&deg;C</td>"
						table += "<td>" + Math.floor(data.list[i].main.temp_max) + "&deg;C</td>"
						table += "<td>" + timeFormatted 
						table += "<td>" + data.list[i].main.humidity + "%</td>"
						table += "<td>" + Math.floor(data.list[i].wind.speed) + "mph</td>"
						table += "<td>" + data.list[i].wind.deg + "&deg;</td>"
			
					table += "</tr>"
				}
				$("#forecastWeather").html(table);
				$("#header").html(header);
				$("#city").val('');
				$("#days").val('');

			}
		});

	}
	else
	{
		$("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
	}
}