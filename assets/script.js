
navigator.geolocation.getCurrentPosition(function(position) {
  
  var lat = position.coords.latitude;
  var lon =  position.coords.longitude;
  var url2 = 'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+lon;

  var hotUrl = "https://images.unsplash.com/photo-1491336745886-e427fddaa728?auto=format&fit=crop&w=1275&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
  var autumnUrl = "https://images.unsplash.com/photo-1445862579103-f772aa61bd5b?auto=format&fit=crop&w=400&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
  var springUrl = "https://images.unsplash.com/photo-1431444393712-19267bd26144?auto=format&fit=crop&w=891&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
  var coldUrl = "https://images.unsplash.com/photo-1459695452562-46cc57bef5f6?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";


 $.ajax({
	    url: url2,
	    type: "GET",
	    dataType: 'json',
	    cache: true,
	    crossDomain: true,
	    success: function (data, status, error) {
	      console.log('success', data); 
	      var weather =  data["weather"];
	      var weatherIcon = weather[0].icon;
	      var name = data['name']+', '+data['sys']['country'];
	      var temp = data['main']['temp'];
	      var tempText = temp + '  &#8451;';
	      var desc = data['weather'][0].main;
	      var tempText;
	      updateClock();
	      $('#weatherIcon').attr("src",weatherIcon);
	      $("#name").text(name);
	      $("#temp").html(tempText);
	      $("#desc").text(desc);
	      $('#toggle_temp').show();
	      $("#toggle_temp").click(function(){
	      	if(temp === data['main']['temp'] ) {
	      		temp = (1.8 * data['main']['temp']) + 32 ;
	      		tempText = temp + '  &#8457;';
	      		$("#temp").html(tempText);
	      		$("#toggle_temp").text('I Prefer Celsius');
	      	} else {
	      		temp = data['main']['temp'];
	      		tempText = temp + '  &#8451;';
	      		$("#temp").html(tempText);
	      		$("#toggle_temp").text('I Prefer Fahrenheit ');
	      	}
	      });
	      var status = "https://images.unsplash.com/photo-1483611703176-31a1e4306d2c?auto=format&fit=crop&w=1191&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
	      var imageUrl = 'linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url(' + status + ')' ;
	      if (temp >= 32) {
	      	imageUrl = 'linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url(' + hotUrl + ')' ;
	      	$('body').css('background-image',imageUrl );
	      } else if ( temp >= 22 && temp < 32) {
	      	imageUrl = 'linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url(' + springUrl + ')' ;
	      	$('body').css('background-image',imageUrl );
	      } else if ( temp >= 12 && temp < 22) {
	      	imageUrl = 'linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url(' + autumnUrl + ')' ;
	      	$('body').css('background-image',imageUrl );

	      } else if ( temp < 12) {
	      	imageUrl = 'linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),url(' + coldUrl + ')' ;
	      	$('body').css('background-image',imageUrl );

	      } else {
	      	$('body').css('background-image',imageUrl );
	      }

	
	    },
	    error: function (data, status, error) {
	      console.log('error', data, status, error);
	  }
	});

});




function updateClock() {
	var date = new Date();
	var now = (date + '').slice(0, 24);
	setTimeout(updateClock, 1000);
	$("#time").text(now);
	
}


