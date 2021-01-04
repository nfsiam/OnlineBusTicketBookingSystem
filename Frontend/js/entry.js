function loginSubmit() {
    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();

    $.ajax({
        url: "http://localhost:5757/api/login",
        method: "POST",
        data: {
            username: username,
            password: password
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 204) {
                alert("No Records Found");
            }
            else if (xmlhttp.status == 200) {
                const user = xmlhttp.responseJSON;
                //console.log(user);
                const base64 = btoa(username + ":" + password);
                if (user.userType == "passanger") {
                    setCookie(base64, user.userId, user.userType, 3);
                    window.location.hash = "home";
                }
                else if (user.userType == "vendor") {
                    setCookie(base64, user.userId, user.userType, 3, user.vendorId);
                    window.location.hash = "vendor-home";
                }
                else if (user.userType == "pvendor") {
                    alert("Please wait until you get your aprroval email");
                    location.reload();
                }
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function regSubmit() {
    const username = $('#username-input').val().trim();
    const name = $('#name-input').val().trim();
    const email = $('#email-input').val().trim();
    const password = $('#password-input').val().trim();
    const cpassword = $('#cpassword-input').val().trim();

    const inputs = {
        username,
        name,
        email,
        password,
        cpassword
    };

    if (validator(inputs) === false) {
        return;
    }

    $.ajax({
        url: "http://localhost:5757/api/registration",
        method: "POST",
        data: inputs,
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                console.log("success");
                if (confirm('Account Created Successfully. Please now login to continue')) {
                    window.location.hash = "login";
                }
            }
            else if (xmlhttp.status == 400 || xmlhttp.status == 409) {
                const data = xmlhttp.responseJSON;
                //console.log(data);
                if ('errors' in data) {
                    const errors = data.errors;
                    for (const key of Object.keys(errors)) {
                        const idProp = key.split('.');
                        $(`#err${idProp[1]}`).html(errors[key]);
                    }
                }
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function vendorRegSubmit() {
    const username = $('#username-input').val().trim();
    const name = $('#name-input').val().trim();
    const vendorName = $('#vendor-name-input').val().trim();
    const email = $('#email-input').val().trim();
    const password = $('#password-input').val().trim();
    const cpassword = $('#cpassword-input').val().trim();

    const inputs = {
        username,
        name,
        email,
        vendorName,
        password,
        cpassword
    };

    if (validator(inputs) === false) {
        return;
    }

    $.ajax({
        url: "http://localhost:5757/api/registration/vendor",
        method: "POST",
        data: inputs,
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                console.log("success");
                if (confirm('Application Submitted Successfully. You will get an Email regarding approval in few days')) {
                    window.location.hash = "login";
                }
            }
            else if (xmlhttp.status == 400 || xmlhttp.status == 409) {
                const data = xmlhttp.responseJSON;
                //console.log(data);
                if ('errors' in data) {
                    const errors = data.errors;
                    for (const key of Object.keys(errors)) {
                        const idProp = key.split('.');
                        $(`#err${idProp[1]}`).html(errors[key]);
                    }
                }
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}