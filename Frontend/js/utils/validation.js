function validator(inputs) {
    let valid = true;
    if ('username' in inputs) {

        if (inputs.username == '') {
            $('#errUsername').html('Username is required');
            valid = false;
        }
        else if (inputs.username.length < 4) {
            $('#errUsername').html('minimum 4 character is required');
            valid = false;
        }
        else {
            $('#errUsername').html('');
        }
    }
    if ('email' in inputs) {

        if (inputs.username == '') {
            $('#errEmail').html('Email is required');
            valid = false;
        }
        else {
            $('#errEmail').html('');
        }
    }
    if ('name' in inputs) {

        if (inputs.name == '') {
            $('#errName').html('name is required');
            valid = false;
        }
        else {
            $('#errName').html('');
        }
    }
    if ('password' in inputs) {

        if (inputs.password == '') {
            $('#errPassword').html('Password is required');
            valid = false;
        }
        else if (inputs.password.length < 4) {
            $('#errPassword').html('minimum 4 character is required');
            valid = false;
        }
        else {
            $('#errPassword').html('');
        }
    }
    if ('cpassword' in inputs) {

        if (inputs.password == '') {
            $('#errCPassword').html('Confirm Password is required');
            valid = false;
        }
        else if (inputs.password != inputs.cpassword) {
            $('#errCPassword').html('passwords did not match');
            valid = false;
        }
        else {
            $('#errCPassword').html('');
        }
    }

    return valid;

}