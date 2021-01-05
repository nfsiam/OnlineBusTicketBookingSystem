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
    const userType = getCookie('userType');

    if (getCookie('btoken') == "") {
        $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#login">login</a></li>`);

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
            clearCookie();
            window.location.hash = "login";
        }
    }

    else if (userType != "") {


        if (loc == "#logout") {
            clearCookie();
            $('.links').html('');
            window.location.hash = "login";
        }

        if (getCookie('userType') == "passanger") {
            $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#logout">Logout</a></li>`);

            $('.links').html(includeUserNavLinks());

            if (loc == '#home' || loc == "") {
                loadUserHome();
            }
            else if (loc.startsWith('#search-trips')) {
                const parts = loc.slice(1).split('/');
                if (parts.length == 4) {
                    searchTrips();
                }
                else {
                    loadSeatDetails(parts[4]);
                }
            }
            else if (loc == '#active-bookings') {
                //loadUserHome();
                showActiveBookings();
            }
            else if (loc.startsWith('#active-bookings/')) {
                const parts = loc.slice(1).split('/');
                loadSeatDetails(parts[1]);
            }
            else if (loc == '#booking-history') {
                //loadUserHome();
                showBookingHistory();
            }
            else if (loc.startsWith('#booking-history/')) {
                const parts = loc.slice(1).split('/');
                loadSeatDetails(parts[1]);
            }
        }
        else if (getCookie('userType') == "vendor") {
            $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#logout">Logout</a></li>`);

            $('.links').html(includeVendorNavLinks());

            if (loc == '#vendor-home') {
                loadVendorHome();
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
            else if (loc == '#add-trip') {
                //loadUserHome();
                loadAddTripPage();
            }
            else if (loc == '#active-trips') {
                //loadUserHome();
                loadActiveTrips();
            }
            else if (loc.startsWith('#active-trips/')) {
                const parts = loc.slice(1).split('/');
                loadSeatDetails(parts[1]);
            }
            else if (loc == '#trip-history') {
                //loadUserHome();
                loadTripHistory();
            }
            else if (loc.startsWith('#trip-history/')) {
                const parts = loc.slice(1).split('/');
                loadSeatDetails(parts[1]);
            }
            else {
                window.location.hash = "vendor-home";
            }
        }

    }
}