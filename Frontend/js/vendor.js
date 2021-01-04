///bus
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

///trip