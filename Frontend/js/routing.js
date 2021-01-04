$(window).on('hashchange', function (e) {
    $('#entry-page').html('');
    $('#main-body').html('');
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
        }
        else if (loc == "#register") {

            $('#entry-page').html(includeRegForm());
        }
        else if (loc == "#register-vendor") {

            $('#entry-page').html(includeVendorRegForm());
        }
        else {
            window.location.hash = "login";
        }
    }
    else if (getCookie('btoken') != "") {

        if (getCookie('userType') == "passanger") {
            $('.links').html(includeUserNavLinks());
        }
        else if (getCookie('userType') == "vendor") {
            $('.links').html(includeVendorNavLinks());
        }
        $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#logout">Logout</a></li>`);


        if (loc == '#home' || loc == "") {
            loadUserHome();
        }
        else if (loc.startsWith('#search-trips')) {
            searchTrips();
        }
        else if (loc == '#active-bookings') {
            //loadUserHome();
            showActiveBookings();
        }
        else if (loc == '#booking-history') {
            //loadUserHome();
            showBookingHistory();
        }
        else if (loc == '#active-buses') {
            //loadUserHome();
            loadActiveBusesPage();
        }
        else if (loc == '#archived-buses') {
            //loadUserHome();
            loadArchivedBusesPage();
        }
        else if (loc == '#add-bus') {
            //loadUserHome();
            loadAddBusPage();
        }
        else if (loc == '#active-trips') {
            //loadUserHome();
            loadActiveTrips();
        }
        else if (loc == "#logout") {
            clearCookie();
            $('.links').html('');
            window.location.hash = "login";
        }
        else {
            if (getCookie('userType') == 'passanger') {
                window.location.hash = "home";
            }
            else if (getCookie('userType') == 'vendor') {
                window.location.hash = "active-buses";
            }
        }
    }
}