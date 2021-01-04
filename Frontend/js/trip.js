let currentlyViewingTripId = -1;
let currentlyViewingTripFair = 0;
let selectedSeatList = [];
let selectedSeatListToRelease = [];



function displayTrips(trips) {
    $('#main-body').html(`<div class="col-md-12" id="trips-section"></div>`);
    if (trips.length > 0) {
        $('#trips-section').append(includeTripRowHeading());
    }
    for (let i = 0; i < trips.length; i++) {
        console.log(trips[i]);
        appendTrip(trips[i]);
    }

    currentlyViewingTripId = -1;
    currentlyViewingTripFair = 0;
    selectedSeatList = [];
    selectedSeatListToRelease = [];
}

function appendTrip(trip) {
    $('#trips-section').append(includeTripRow(trip));
}

function viewSeats(id) {

    selectedSeatList = [];
    selectedSeatListToRelease = [];
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

        if (getCookie('userType') == "passanger") {
            that.classList.remove('btn-light');
            that.classList.add('btn-success');
        }
        else if (getCookie('userType') == "vendor") {
            that.classList.remove('btn-light');
            that.classList.add('btn-info');
        }

    } else {
        selectedSeatList = selectedSeatList.filter(item => item !== seat);

        if (getCookie('userType') == "passanger") {
            that.classList.remove('btn-success');
            that.classList.add('btn-light');
        }
        else if (getCookie('userType') == "vendor") {
            that.classList.remove('btn-info');
            that.classList.add('btn-light');
        }
    }
    const seats = selectedSeatList.join(',');

    if (getCookie('userType') == 'passanger') {
        $('.selection').html(seats);
        $('.total-fair').html(currentlyViewingTripFair * selectedSeatList.length);
    }
    else if (getCookie('userType') == "vendor") {
        $('.selection').html(seats);
    }



    console.log(selectedSeatList);
}

function selectToRelease(that, seat) {
    if (selectedSeatListToRelease.indexOf(seat) == -1) {
        selectedSeatListToRelease.push(seat);

        that.classList.remove('btn-danger');
        that.classList.add('btn-warning');

    } else {
        selectedSeatListToRelease = selectedSeatListToRelease.filter(item => item !== seat);

        that.classList.remove('btn-warning');
        that.classList.add('btn-danger');
    }
    const seats = selectedSeatListToRelease.join(',');
    $('.release-selection').html(seats);
    console.log(selectedSeatListToRelease);
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


function confirmOperation(tripId) {
    if (selectedSeatListToRelease.length > 0) {
        confirmRelease(tripId);
    }
    else if (selectedSeatList.length > 0 && selectedSeatListToRelease.length < 1) {
        confirmReservation(tripId)
    }
    if (selectedSeatListToRelease.length < 1 && selectedSeatList.length < 1) {
        alert("Please Select Seats to Reserev or Release");
    }
}

function confirmReservation(tripId) {
    console.log(tripId);
    // return;
    if (confirm("Are you sure?")) {
        $.ajax({
            url: "http://localhost:5757/api/bookings/reserve",
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
                }
                else if (xmlhttp.status == 409) {
                    alert("Some of the seats maybe booked in between");
                    route();
                }
                else if (xmlhttp.status == 200) {
                    alert("Successfully Reserved");
                    route();
                }
                else {
                    console.error(xmlhttp.status);
                }
            }
        });
    }
}

function confirmRelease(tripId) {
    if (confirm("Are you sure?")) {
        $.ajax({
            url: "http://localhost:5757/api/bookings/release",
            method: "POST",
            headers: {
                Authorization: "Basic " + getCookie('btoken')
            },
            data: {
                tripId: tripId,
                seats: selectedSeatListToRelease
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 401) {
                    clearCookie();
                    window.location.hash = "login";
                }
                else if (xmlhttp.status == 400) {
                    alert("Invalid Request");
                    route();
                }
                else if (xmlhttp.status == 409) {
                    alert("Some of the seats maybe booked in between");
                    route();
                }
                else if (xmlhttp.status == 200) {
                    alert("Successfully Released");
                    //route();
                    if (selectedSeatList.length > 0) {
                        confirmReservation(tripId);
                    }
                    else {
                        route();
                    }
                }
                else {
                    console.error(xmlhttp.status);
                    route();
                }
            }
        });
    }
}