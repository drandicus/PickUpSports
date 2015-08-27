$(document).ready(function(){
	$('#loginButton').on('click', login);
	$('#registerButton').on('click', register);
})


function login(e){
	e.preventDefault();

	var email = $('#loginEmail').val(),
		password = $('#loginPassword').val();

	if((email === "") || (password === "")){
		$('#loginError').text('Please Fill in all the text fields');
		$('#loginError').attr('class', 'error');
		return;
	}

	$('#login').submit();
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

	$('#register').submit();
}