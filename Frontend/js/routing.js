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