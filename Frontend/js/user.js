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