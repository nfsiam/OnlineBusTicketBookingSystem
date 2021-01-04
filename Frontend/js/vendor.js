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
    $('#main-body').html(includeArchivedBusePage());

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
