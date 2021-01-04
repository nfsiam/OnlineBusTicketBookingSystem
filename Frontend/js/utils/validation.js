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
    if ('vendorName' in inputs) {

        if (inputs.vendorName == '') {
            $('#errVendorname').html('Vendor Name is required');
            valid = false;
        }
        else {
            $('#errVendorname').html('');
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

function addBusValidator(inputs) {
    let valid = true;

    if ('busName' in inputs) {

        if (inputs.busName == '') {
            $('#errBusName').html('Bus Name is required');
            valid = false;
        }
        else {
            $('#errBusName').html('');
        }
    }
    if ('busType' in inputs) {

        if (inputs.busType == '') {
            $('#errBusType').html('Bus Type is required');
            valid = false;
        }
        else {
            $('#errBusType').html('');
        }
    }
    if ('totalSeat' in inputs) {

        if (inputs.totalSeat == '') {
            $('#errTotalSeat').html('Total Seat number is required');
            valid = false;
        }
        else {
            $('#errTotalSeat').html('');
        }
    }
    if ('perSeatFair' in inputs) {

        if (inputs.perSeatFair == '') {
            $('#errPerSeatFair').html('Per seat fair is required');
            valid = false;
        }
        else {
            $('#errPerSeatFair').html('');
        }
    }
    return valid;
}