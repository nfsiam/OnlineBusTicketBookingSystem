function loadManageBusesPage() {
    $('#main-body').html(includeManageBusesSection());

    $.ajax({
        url: "http://localhost:5757/api/vendors/" + getCookie('vendorId') + "/buses",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie('btoken')
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                console.log(data);
                appendBuses(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function appendBuses(buses) {
    $('#main-body').append(includeBusesSection());
    for (let i = 0; i < buses.length; i++) {
        appendBus(buses[i]);
    }
}

function appendBus(bus) {
    $('.buses-section').append(includeBusRow(bus));
}


function archiveBus(busId) {
    $.ajax({
        url: "http://localhost:5757/api/buses/archive",
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