function loadVendorHome() {
    $.ajax({
        url: "http://localhost:5757/api/reports/vendors/" + getCookie('vendorId') + "/sales",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                appendVendorHome(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function appendVendorHome(data) {

    $('#main-body').html(includeVendorHomePage());
    drawChart(data.dates, data.sales);
    drawPie(data.busList, data.earning);
}

function loadActiveBusesPage() {
    $('#main-body').html(includeActiveBusePage());

    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses/actives",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                console.log(data);
                appendActiveBuses(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function appendActiveBuses(buses) {
    $('#main-body').append(includeActiveBusesSection());
    for (let i = 0; i < buses.length; i++) {
        appendActiveBus(buses[i]);
    }
}

function appendActiveBus(bus) {
    $('.buses-section').append(includeActiveBusRow(bus));
}


function archiveBus(busId) {
    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses/archives",
        method: "PUT",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        data: {
            busId
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                // appendBuses(data);
                $(`#bus-row-${busId}`).fadeOut();
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function loadArchivedBusesPage() {
    $('#main-body').html(includeArchivedBusesPage());

    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses/archives",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                console.log(data);
                appendArchivedBuses(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function appendArchivedBuses(buses) {
    $('#main-body').append(includeArchivedBusesSection());
    for (let i = 0; i < buses.length; i++) {
        appendArchivedBus(buses[i]);
    }
}

function appendArchivedBus(bus) {
    $('.buses-section').append(includeArchivedBusRow(bus));
}

function restoreBus(busId) {
    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses/restore",
        method: "PUT",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        data: {
            busId
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                // appendBuses(data);
                $(`#bus-row-${busId}`).fadeOut();
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function loadAddBusPage() {
    $('#main-body').html(includeAddBusPage());
}

function addBus() {
    const busName = $('#bus-name-input').val().trim();
    const busType = $('#bus-type-input').val().trim();
    const totalSeat = $('#total-seat-input').val().trim();
    const perSeatFair = $('#per-seat-fair-input').val().trim();

    const inputs = {
        busName,
        busType,
        totalSeat,
        perSeatFair,
    }
    console.log(inputs);
    if (addBusValidator(inputs) === false) {
        return;
    }
    $.ajax({
        url: "http://localhost:5757/api/buses",
        method: "POST",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        data: inputs,
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                console.log("success");
                if (confirm('Bus Added Successfully')) {
                    window.location.hash = "active-buses";
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
///bus


///trip

function loadActiveTrips() {
    $.ajax({
        url: `http://localhost:5757/api/vendors/${getCookie('vendorId')}/trips/active`,
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
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

function loadTripHistory() {
    $.ajax({
        url: `http://localhost:5757/api/vendors/${getCookie('vendorId')}/trips/history`,
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
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

function loadAddTripPage() {
    $('#main-body').html(includeAddTripPage());
    $('#bus-id-input').select2();
    $('#from-location-input').select2();
    $('#to-location-input').select2();
    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses/actives",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                console.log(data);
                populateSelectBus(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function populateSelectBus(buses) {
    for (let i = 0; i < buses.length; i++) {
        const busElem = `<option value="${buses[i].busId}">${buses[i].busName} [${buses[i].busId}] | ${buses[i].busType} | ${buses[i].totalSeat} Seats | ${buses[i].perSeatFair} TK</option>`;
        $('#bus-id-input').append(busElem);

    }
}

function addTripFormSubmit() {
    const busId = $('#bus-id-input').val().trim();
    const locationFrom = $('#from-location-input').val().trim();
    const locationTo = $('#to-location-input').val().trim();
    const timing = $('#journey-date-input').val().trim();

    const inputs = {
        busId,
        locationFrom,
        locationTo,
        timing
    }
    console.log(inputs);
    if (addTripValidator(inputs) === false) {
        return;
    }
    $.ajax({
        url: "http://localhost:5757/api/trips",
        method: "POST",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        data: inputs,
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                console.log("success");
                alert("Trip Scheduled Successfully");
                window.location.hash = "active-trips";
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

function deleteTrip(tripId) {
    if (confirm('Are you sure?')) {
        $.ajax({
            url: "http://localhost:5757/api/trips/" + tripId,
            method: "DELETE",
            headers: {
                Authorization: "Basic " + getCookie('btoken')
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 204) {
                    console.log("success");
                    alert("Trip Deleted Successfully");
                    route();
                    //window.location.hash = "active-trips";
                }
                else if (xmlhttp.status == 400 || xmlhttp.status == 409) {
                    alert('Something went wrong');
                    route();
                }
                else {
                    console.error(xmlhttp.status);
                }
            }
        });
    }
}
function viewDetailed(tripId) {
    if (confirm('Are you sure?')) {
        $.ajax({
            url: "http://localhost:5757/api/trips/" + tripId + '/passanger-reporting',
            method: "GET",
            headers: {
                Authorization: "Basic " + getCookie('btoken')
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 200) {
                    console.log(xmlhttp.responseJSON);
                    //window.location.hash = "active-trips";
                }
                else if (xmlhttp.status == 400 || xmlhttp.status == 409) {
                    alert('Something went wrong');
                    route();
                }
                else {
                    console.error(xmlhttp.status);
                }
            }
        });
    }
}



///trip