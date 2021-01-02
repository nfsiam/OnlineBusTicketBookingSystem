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
                const base64 = btoa(username + ":" + password);
                setCookie(base64, user.userId, user.userType, 3);
                if (user.userType == "passanger") {
                    window.location.hash = "home";
                }
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function loadUserHome() {
    console.log(5);
    $('#user-home-page').html(includeTripSearchForm());
    $('#from-location-input').select2();
    $('#to-location-input').select2();
}

function tripSearchFormSubmit() {
    const locationFrom = $('#from-location-input').val();
    const locationTo = $('#to-location-input').val();
    const journeyDate = $('#journey-date-input').val();
    //console.log(locationFrom, locationTo, journeyDate);
    const searchParams = {
        locationFrom,
        locationTo,
        journeyDate
    };
    searchTrips(searchParams);
}

let tripList = null;
function searchTrips(searchParams) {

    $.ajax({
        url: "http://localhost:5757/api/trips/search",
        method: "POST",
        data: searchParams,
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 204) {
                alert("No Records Found");
            }
            else if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                tripList = data;
                //console.log(data);
                displayTrips(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function displayTrips(trips) {
    $('#user-home-page').html(`<div class="col-md-12" id="trips-section"></div>`);
    for (let i = 0; i < trips.length; i++) {
        console.log(trips[i]);
        appendTrip(trips[i]);
    }
}
function appendTrip(trip) {
    const tripPlate =
        `
        <div>${trip.bus.vendor.vendorName}</div>
    `
        ;
    // $('#trips-section').append(tripPlate);
    $('#trips-section').append(includeTripRow(trip));
}


let currentlyViewingTripId = -1;
let currentlyViewingTripFair = 0;
let selectedSeatList = [];

function viewSeats(id) {

    selectedSeatList = [];
    console.log(id);
    if (currentlyViewingTripId != id) {

        $(`#trip-row-${currentlyViewingTripId}`).html('');
        $(`#trip-row-${id}`).html(includeViewSeats(tripList.find(o => o.tripId == id)));
        currentlyViewingTripId = id;
    }
}


function selectSeat(that, seat) {
    if (selectedSeatList.indexOf(seat) == -1) {
        selectedSeatList.push(seat);
        that.classList.remove('btn-light');
        that.classList.add('btn-success');
    } else {
        // selectedSeatList.remove(seat);
        selectedSeatList = selectedSeatList.filter(item => item !== seat);
        that.classList.remove('btn-success');
        that.classList.add('btn-light');
    }
    const seats = selectedSeatList.join(',');
    $('.mini-cart').html('');
    $('.mini-cart').append(seats);
    $('.mini-cart').append('<br/>');
    $('.mini-cart').append("Total: " + currentlyViewingTripFair * selectedSeatList.length);

    console.log(selectedSeatList);
}



$(document).ready(function () {
    $('#from-location-input').select2();
    $('#to-location-input').select2();

    //test

    const searchParams = {};
    searchParams.locationFrom = "Sherpur";
    searchParams.locationTo = "Dhaka";
    searchParams.journeyDate = "2021-1-5";
    searchTrips(searchParams);
    //test

});