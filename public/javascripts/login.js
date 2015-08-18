$(document).ready(function(){
	$('#loginButton').on('click', login);
	$('#registerButton').on('click', register);
})


function login(e){
	e.preventDefault();
}

function register(e){
	e.preventDefault();

	var firstname = $('#registerFirstName').val(),
		lastname = $('#registerLastName').val(),
		email = $('#registerEmail').val(),
		password = $('#registerPassword').val(),
		confirmP = $('#registerConfirmPassword').val();

	if((firstname === "") || (lastname === "")||(email === "") || (password === "")){
		$('#registerError').text("Please fill in all of the text fields");
		$('#registerError').attr('class', 'error');
		return;
	}

	if(password !== confirmP){
		$('#registerError').text("Password and Confirm Password not equal");
		$('#registerError').attr('class', 'error');
		return;
	}

	var newUser = {
		'firstname': firstname,
		'lastname': lastname,
		'email': email,
		'password': password
	}

	$.ajax({
		type:"POST",
		data: newUser,
		url:'/api/register',
		dataType: 'JSON'
	})
}