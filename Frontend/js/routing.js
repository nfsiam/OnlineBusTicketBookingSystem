$(window).on('hashchange', function (e) {
    $('#entry-page').html('');
    route();
});

$(document).ready(function () {
    route();
});



function route() {
    const loc = window.location.hash;
    console.log(loc);
    if (getCookie('btoken') == "") {
        console.log(3);
        if (loc == "#login") {
            $('#entry-page').html(includeLoginForm());
        } else if (loc == "#register") {

            $('#entry-page').html(includeRegForm());
        }
        else {
            window.location.hash = "login";
        }
    }
    else if (getCookie('btoken') != "") {
        console.log(4);
        $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#logout">Logout</a></li>`);
        if (loc == '#home') {
            loadUserHome();
        }
    }
}