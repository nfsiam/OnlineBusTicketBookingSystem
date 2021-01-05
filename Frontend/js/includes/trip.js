function includeTripRowHeading() {
    const tripRow =
        `
    <div class="col-md-12 mt-3">
        <div class="card shadow h-100">
            <div class="card-body border-left border-primary p-0">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            Trip Details
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            Journey Date
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            Journey time
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            Available Seats
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-warning mb-1 mt-1 p-2 border-right">
                            Per Seat Fair
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        &nbsp
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
        ;
    return tripRow;
}
function includeTripRow(trip) {
    const datetime = new Date(trip.timing);
    const tripRow =
        `
    <div class="col-md-12 mt-3">
        <div class="card shadow h-100">
            <div class="card-body border-left border-primary p-0">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            ${trip.bus.vendor.vendorName} ${trip.bus.busName} [${trip.bus.busId}] - ${trip.tripId}
                            <br/>
                            <div class="text-secondary">${trip.bus.busType}</div>
                            <div class="text-secondary">${trip.locationFrom} to ${trip.locationTo}</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            ${datetime.toLocaleDateString('en-US')}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            ${datetime.toLocaleTimeString('en-US')}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            ${trip.bus.totalSeat - trip.bookings.length}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-warning mb-1 mt-1 p-2 border-right">
                            ${trip.bus.perSeatFair}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100 d-flex justify-content-center">
                        <button class="btn btn-primary btn-sm" onclick="viewSeats(${trip.tripId})">View Seats</button>
                    </div>
                </div>
                <div class="row no-gutters" id="trip-row-${trip.tripId}">
                        
                    <!--here viewSeats will be inserted-->

                </div>
            </div>
        </div>
    </div>
    `
        ;
    return tripRow;
}

function includeTripDetails(trip) {
    const datetime = new Date(trip.timing);
    const tripRow =
        `
    <div class="col-md-12 mt-3">
        <div class="card shadow h-100">
            <div class="card-body border-left border-primary p-0">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            ${trip.bus.vendor.vendorName} ${trip.bus.busName} [${trip.bus.busId}] - ${trip.tripId}
                            <br/>
                            <div class="text-secondary">${trip.bus.busType}</div>
                            <div class="text-secondary">${trip.locationFrom} to ${trip.locationTo}</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12 h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            Journey Date : ${datetime.toLocaleDateString('en-US')}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-secondary mb-1 mt-1 p-2 border-right">
                            Depurture Time : ${datetime.toLocaleTimeString('en-US')}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-primary mb-1 mt-1 p-2 border-right">
                            Available Seat : ${trip.bus.totalSeat - trip.bookings.length}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100">
                        <div class="text-xs font-weight-bold text-warning mb-1 mt-1 p-2 border-right">
                            ${trip.bus.perSeatFair}
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12  h-100 d-flex justify-content-center">
                        <button class="btn btn-primary btn-sm" onclick="getLocBack()">Back</button>
                        <button class="btn btn-primary btn-sm ml-2" onclick="route()">Realod</button>
                    </div>
                </div>
                <div class="row no-gutters" id="trip-row-${trip.tripId}">
                        
                    <!--here viewSeats will be inserted-->

                </div>
            </div>
        </div>
    </div>
    `
        ;
    return tripRow;
}



function includeViewSeats(trip) {
    console.log(trip);
    currentlyViewingTripFair = trip.bus.perSeatFair;


    const viewSeats =
        `

        <div class="col-md-12 no-gutters">

        <div class="row no-gutters justify-content-between border-top p-3 px-5">
            <div class="col-md-12">
                <div class="row no-gutters">
                    <div class="col-md-12 col-sm-12 d-flex justify-content-center">
                        <table class="table table-bordered" style="width: 100%;">
                                ${getIndication()}
                        </table </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row no-gutters justify-content-between p-4 ">
            <div class="col-md-5 border p-2">
                <div class="row no-gutters">
                    <div class="col-md-12">
                        <table class="table table-bordered table-sm">
                            ${arrangeSeats(trip)}
                        </table>
                    </div>
                </div>

            </div>
            ${minicartAddition(trip)}
        </div>
    </div>

    `
        ;
    return viewSeats;
}

function getIndication() {
    if (getCookie('userType') == "vendor") {
        const tds =
            `
            <tr>
                <td><button class="btn btn-sm  btn-danger">##</button>Reserved</td>
                <td><button class="btn btn-sm  btn-secondary" disabled>##</button>Booked</td>
            </tr>
            <tr>
                <td><button class="btn  btn-sm btn-light border">##</button> Available</td>
                <td><button class="btn  btn-sm btn-info">##</button>Selected to Reserve</td>
            </tr>
            <tr>
                <td><button class="btn  btn-sm btn-warning">##</button>Selected to Release</td>
            </tr>
        `
            ;
        return tds;
    }
    else if (getCookie('userType') == "passanger") {
        const tds =
            `
        <tr>
            <td><button class="btn btn-sm  btn-danger" disabled>##</button>Reserved</td>
            <td><button class="btn btn-sm  btn-secondary" disabled>##</button> Booked By Others</td>
        </tr>
        <tr>
            <td><button class="btn btn-sm  btn-primary" disabled>##</button> My Booking</td>
            <td><button class="btn  btn-sm btn-light border">##</button> Available</td>
        </tr>
        <tr>
            <td><button class="btn  btn-sm btn-success">##</button>Selected for Booking</td>
        </tr>
        `
            ;
        return tds;
    }
}


function arrangeSeats(trip) {
    let c = 65;
    let mainStr = "";
    for (let i = 0; i < trip.bus.totalSeat / 4; i++) {
        const str =
            `
        <tr>
            <td class="text-center border">${checkBooking(String.fromCharCode(c) + '1', trip)}</td>
            <td class="text-center border">${checkBooking(String.fromCharCode(c) + '2', trip)}</td>
            <td>&nbsp&nbsp</td>
            <td class="text-center border">${checkBooking(String.fromCharCode(c) + '3', trip)}</td>
            <td class="text-center border">${checkBooking(String.fromCharCode(c) + '4', trip)}</td>
        </tr>
        `;
        mainStr += str;
        c++;
    }
    return mainStr;
}

function checkBooking(seat, trip) {
    const bookings = trip.bookings;
    const obj = bookings.find(o => o.seat === seat);
    if (window.location.hash.indexOf("booking-history/") == -1 && window.location.hash.indexOf("trip-history/") == -1) {
        if (obj != null) {
            console.log("passangerId", obj.passangerId);
            console.log("userId", getCookie('userId'));

            if (obj.seatStatus == "reserved" && getCookie('userType') == 'vendor') {
                return `<button class="btn btn-danger btn-block" onclick="selectToRelease(this,'${seat}')">${seat}</button>`;
            }
            else if (obj.seatStatus == "reserved" && getCookie('userType') == 'vendor') {
                return `<button class="btn btn-danger btn-block" disabled>${seat}</button>`;
            }
            else if (obj.passangerId == getCookie('userId')) {
                return `<button class="btn btn-primary btn-block" disabled>${seat}</button>`;
            }
            else {
                return `<button class="btn btn-secondary btn-block" disabled>${seat}</button>`;
            }
        }
        else {

            return `<button class="btn btn-light btn-block" onclick="selectSeat(this,'${seat}')">${seat}</button>`;
        }
    }
    else {
        if (obj != null) {
            console.log("passangerId", obj.passangerId);
            console.log("userId", getCookie('userId'));

            if (obj.seatStatus == "reserved" && getCookie('userType') == 'vendor') {
                return `<button class="btn btn-danger btn-block">${seat}</button>`;
            }
            else if (obj.seatStatus == "reserved" && getCookie('userType') == 'vendor') {
                return `<button class="btn btn-danger btn-block" disabled>${seat}</button>`;
            }
            else if (obj.passangerId == getCookie('userId')) {
                return `<button class="btn btn-primary btn-block" disabled>${seat}</button>`;
            }
            else {
                return `<button class="btn btn-secondary btn-block" disabled>${seat}</button>`;
            }
        }
        else {

            return `<button class="btn btn-light btn-block">${seat}</button>`;
        }
    }
}


function minicartAddition(trip) {
    if (window.location.hash.indexOf("booking-history/") == -1 && window.location.hash.indexOf("trip-history/") == -1) {
        const mc =
            `
        <div class="col-md-6">
            <div class="row no-gutters align-items-between h-100">
                <div class="col-md-12 mini-cart">
                    ${getCartStyle()}
                </div>
                <div class="col-md-12 align-self-end">
                    <button class="btn btn-success btn-block" onclick="${getActionOnContinue()}(${trip.tripId})">Continue</button>
                </div>
            </div>
        </div>
        `;
        return mc;
    }
    return '';
}

function getCartStyle() {
    if (getCookie('userType') == 'passanger') {
        const cart =
            `
        <h6 class="font-weight-bold">Selected Seats for Booking :</h6>
        <h7 class="font-weight-bold selection"></h7>
        <h6 class="font-weight-bold text-warning">Total Fair: <span class="total-fair"></span></h6>
        `;
        return cart;
    }
    else if (getCookie('userType') == 'vendor') {
        const cart =
            `
            <h6 class="font-weight-bold text-primary">Selected Seats for Reserving :</h6>
            <h7 class="font-weight-bold selection"></h7>
            <br/>
            <h6 class="font-weight-bold text-primary">Selected Seats for Releasing :</h6>
            <h7 class="font-weight-bold release-selection"></h7>
        `;
        return cart;
    }
}

function getActionOnContinue() {
    if (getCookie('userType') == 'passanger') {
        return 'confirmBooking';
    }
    else if (getCookie('userType') == 'vendor') {
        return 'confirmOperation';
    }
}


function getDisOpts() {
    const dis =
        `
    <option value="">Select</option>
        <option value="Bagerhat">Bagerhat</option>
        <option value="Bandarban">Bandarban</option>
        <option value="Barguna">Barguna</option>
        <option value="Barisal">Barisal</option>
        <option value="Bhola">Bhola</option>
        <option value="Bogra">Bogra</option>
        <option value="Brahmanbaria">Brahmanbaria</option>
        <option value="Chandpur">Chandpur</option>
        <option value="Chapainawabganj">Chapainawabganj</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Chuadanga">Chuadanga</option>
        <option value="Comilla">Comilla</option>
        <option value="Cox's Bazar">Cox's Bazar</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Dinajpur">Dinajpur</option>
        <option value="Faridpur">Faridpur</option>
        <option value="Feni">Feni</option>
        <option value="Gaibandha">Gaibandha</option>
        <option value="Gazipur">Gazipur</option>
        <option value="Gopalganj">Gopalganj</option>
        <option value="Habiganj">Habiganj</option>
        <option value="Jamalpur">Jamalpur</option>
        <option value="Jessore">Jessore</option>
        <option value="Jhalokati">Jhalokati</option>
        <option value="Jhenaidah">Jhenaidah</option>
        <option value="Joypurhat">Joypurhat</option>
        <option value="Khagrachhari">Khagrachhari</option>
        <option value="Khulna">Khulna</option>
        <option value="Kishoreganj">Kishoreganj</option>
        <option value="Kurigram">Kurigram</option>
        <option value="Kushtia">Kushtia</option>
        <option value="Lakshmipur">Lakshmipur</option>
        <option value="Lalmonirhat">Lalmonirhat</option>
        <option value="Madaripur">Madaripur</option>
        <option value="Magura">Magura</option>
        <option value="Manikganj">Manikganj</option>
        <option value="Meherpur">Meherpur</option>
        <option value="Moulvibazar">Moulvibazar</option>
        <option value="Munshiganj">Munshiganj</option>
        <option value="Mymensingh">Mymensingh</option>
        <option value="Naogaon">Naogaon</option>
        <option value="Narail">Narail</option>
        <option value="Narayanganj">Narayanganj</option>
        <option value="Narsingdi">Narsingdi</option>
        <option value="Natore">Natore</option>
        <option value="Netrakona">Netrakona</option>
        <option value="Nilphamari">Nilphamari</option>
        <option value="Noakhali">Noakhali</option>
        <option value="Pabna">Pabna</option>
        <option value="Panchagarh">Panchagarh</option>
        <option value="Patuakhali">Patuakhali</option>
        <option value="Pirojpur">Pirojpur</option>
        <option value="Rajbari">Rajbari</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Rangamati">Rangamati</option>
        <option value="Rangpur">Rangpur</option>
        <option value="Satkhira">Satkhira</option>
        <option value="Shariatpur">Shariatpur</option>
        <option value="Sherpur">Sherpur</option>
        <option value="Sirajganj">Sirajganj</option>
        <option value="Sunamganj">Sunamganj</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Tangail">Tangail</option>
        <option value="Thakurgaon">Thakurgaon</option>
    `;
    return dis;
}