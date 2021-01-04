function loadUserHome() {
    console.log(5);
    $('#main-body').html(includeTripSearchForm());
    $('#from-location-input').select2();
    $('#to-location-input').select2();
}

function tripSearchFormSubmit() {
    const locationFrom = $('#from-location-input').val();
    const locationTo = $('#to-location-input').val();
    const journeyDate = $('#journey-date-input').val();
    if (locationFrom == '' || locationTo == '' || journeyDate == '') {
        alert("please fill out the information");
        return;
    }
    // //console.log(locationFrom, locationTo, journeyDate);
    // const searchParams = {
    //     locationFrom,
    //     locationTo,
    //     journeyDate
    // };
    // //searchTrips(searchParams);
    window.location.hash = "search-trips/" + locationFrom + "/" + locationTo + "/" + journeyDate;
}

let tripList = null;
function searchTrips() {
    const parts = window.location.hash.slice(1).split('/');
    const searchParams = {
        locationFrom: parts[1],
        locationTo: parts[2],
        journeyDate: parts[3]
    };

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
    $('#main-body').html(`<div class="col-md-12" id="trips-section"></div>`);
    if (trips.length > 0) {
        $('#trips-section').append(includeTripRowHeading());
    }
    for (let i = 0; i < trips.length; i++) {
        console.log(trips[i]);
        appendTrip(trips[i]);
    }
    // viewSeats(1);
    currentlyViewingTripId = -1;
    currentlyViewingTripFair = 0;
    selectedSeatList = [];

}
function appendTrip(trip) {
    $('#trips-section').append(includeTripRow(trip));
}


let currentlyViewingTripId = -1;
let currentlyViewingTripFair = 0;
let selectedSeatList = [];

function viewSeats(id) {

    selectedSeatList = [];
    console.log(id);
    if (currentlyViewingTripId == -1) {

        $(`#trip-row-${currentlyViewingTripId}`).html('');
        $(`#trip-row-${id}`).html(includeViewSeats(tripList.find(o => o.tripId == id)));
        currentlyViewingTripId = id;
    } else if (currentlyViewingTripId != id) {
        $(`#trip-row-${currentlyViewingTripId}`).html('');
        $(`#trip-row-${id}`).html(includeViewSeats(tripList.find(o => o.tripId == id)));
        currentlyViewingTripId = id;
    } else if (currentlyViewingTripId == id) {

        $(`#trip-row-${currentlyViewingTripId}`).html('');
        currentlyViewingTripId = -1;
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


function confirmBooking(tripId) {
    console.log(tripId);
    if (selectedSeatList.length < 1) {
        alert("Please Select Seat(s)");
    }
    else {
        if (confirm("Are you sure?")) {
            $.ajax({
                url: "http://localhost:5757/api/bookings",
                method: "POST",
                headers: {
                    Authorization: "Basic " + getCookie('btoken')
                },
                data: {
                    tripId: tripId,
                    seats: selectedSeatList
                },
                complete: function (xmlhttp, status) {
                    if (xmlhttp.status == 401) {
                        //alert("Invalid Request");
                        clearCookie();
                        window.location.hash = "login";
                    }
                    else if (xmlhttp.status == 400) {
                        alert("Invalid Request");
                        window.location.href = window.location.href;
                    }
                    else if (xmlhttp.status == 409) {
                        alert("Some of the seats maybe booked in between");
                    }
                    else if (xmlhttp.status == 200) {
                        alert("Successfully Booked");
                        window.location.hash = "home";
                    }
                    else {
                        console.error(xmlhttp.status);
                    }
                }
            });
        }
    }
}

////show active bookings

function showActiveBookings() {
    // return;
    $.ajax({
        url: "http://localhost:5757/api/passangers/" + getCookie('userId') + "/trips/active",
        method: "GET",
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 204) {
                alert("No Records Found");
            }
            else if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                tripList = data;
                displayTrips(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}


function showBookingHistory() {
    // return;
    $.ajax({
        url: "http://localhost:5757/api/passangers/" + getCookie('userId') + "/trips/history",
        method: "GET",
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 204) {
                alert("No Records Found");
            }
            else if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                tripList = data;
                displayTrips(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}