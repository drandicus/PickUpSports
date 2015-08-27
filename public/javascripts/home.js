var map;


var options = {
	enableHighAccuracy: true,
  	timeout: 5000,
  	maximumAge: 0
}
/*
var location = {
	latitude: 40.1150,
	longitude: 88.2728
};*/


/*
function geoSuccess(pos){
	var crds = pos.coords;
	console.log(crds);
	/*
	location = crds;
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: crds.latitude, lng: crds.longitude},
		zoom: 15
	});
}

function geoFailure(pos){
	//map = new google.maps.Map(document.getElementById('map'), {center: {lat: -34.397, lng: 150.644},zoom: 8});
}*/

function initMap(){
	//navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, options);
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 40.1150, 
			lng: -88.2728
		},
		zoom: 14
	});
}

function getMarkers(){

}

function initAutocomplete(){

	autocomplete = new google.maps.places.Autocomplete(
		document.getElementById('autocomplete'),
      {types: ['geocode']});
	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		map.setCenter(place.geometry.location);
		var location = place.geometry.location;
		//recenter();
	});
}

$(document).ready(function(){
	initMap();
	initAutocomplete();
});