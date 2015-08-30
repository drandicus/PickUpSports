//Once the document loads, set the navigation elements
//TODO: Figure out how to do this on jade
$(document).ready(function(){
	$('#add').on('click', function(){
		window.location = "/add";
	});
	$('#games').on('click', function(){
		window.location = "/search"
	});
	$('#profile').on('click', function(){
		window.location = "/profile"
	});
	$('#history').on('click', function(){
		window.location = "/history"
	});
	$('#settings').on('click', function(){
		window.location = "/settings"
	});
})