function includeTripSearchForm() {
    const fromTemplate =
        `
    <div class="col-md-12 mt-3">
    <div class="form-group">
        <label for="from-location-input" class="form-label">From</label>
        <select id="from-location-input" class="form-control">
            <option value="">Select</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Chittagong">Chittagong</option>
        </select>
    </div>
    <div class="form-group">
        <label for="to-location-input" class="form-label">To</label>
        <select id="to-location-input" class="form-control">
            <option value="">Select</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Chittagong">Chittagong</option>
        </select>
    </div>
    <div class="form-group">
        <label for="journey-date-input" class="form-label">To</label>
        <input type="date" class="form-control" id="journey-date-input" min="${new Date().toISOString().slice(0, 10)}">
    </div>
    <div class="form-group">
        <button class="btn btn-primary btn-block" onclick="tripSearchFormSubmit()">Search Trips</button>
    </div>
</div>
    `;
    return fromTemplate;
}

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
                            ${trip.bus.vendor.vendorName}
                            <br/>
                            ${trip.bus.busType}
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


function includeViewSeats(trip) {
    console.log(trip);
    currentlyViewingTripFair = trip.bus.perSeatFair;


    const viewSeats =
        `

        <div class="col-md-12 no-gutters">

        <div class="row no-gutters justify-content-between border-top p-3 px-5">
            <div class="col-md-12">
                <div class="row no-gutters">
                    <div class="col-md-12 col-sm-12">
                        <table style="width: 100%;">
                            <tr>
                                <td><button class="btn btn-sm  btn-primary" disabled>##</button> Booked By You</td>
                                <td><button class="btn btn-sm  btn-secondary" disabled>##</button> Booked By Others</td>
                                <td><button class="btn  btn-sm btn-light border">##</button> Available</td>
                                <td><button class="btn  btn-sm btn-success">##</button> Selected</td>
                            </tr>
                        </table </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row no-gutters justify-content-between p-4 ">
            <div class="col-md-4 border p-2">
                <div class="row no-gutters">
                    <div class="col-md-12">
                        <table style="width: 100%;;">
                            <tr>
                                <td class="text-center border">${checkBooking('A1', trip)}</td>
                                <td class="text-center border">${checkBooking('A2', trip)}</td>
                                <td>&nbsp&nbsp</td>
                                <td class="text-center border">${checkBooking('A3', trip)}</td>
                                <td class="text-center border">${checkBooking('A4', trip)}</td>
                            </tr>
                            <tr>
                                <td class="text-center border">${checkBooking('B1', trip)}</td>
                                <td class="text-center border">${checkBooking('B2', trip)}</td>
                                <td>&nbsp&nbsp</td>
                                <td class="text-center border">${checkBooking('B3', trip)}</td>
                                <td class="text-center border">${checkBooking('B4', trip)}</td>
                            </tr>
                            <tr>
                                <td class="text-center border">${checkBooking('C1', trip)}</td>
                                <td class="text-center border">${checkBooking('C2', trip)}</td>
                                <td>&nbsp&nbsp</td>
                                <td class="text-center border">${checkBooking('C3', trip)}</td>
                                <td class="text-center border">${checkBooking('C4', trip)}</td>
                            </tr>
                            <tr>
                                <td class="text-center border">${checkBooking('D1', trip)}</td>
                                <td class="text-center border">${checkBooking('D2', trip)}</td>
                                <td>&nbsp&nbsp</td>
                                <td class="text-center border">${checkBooking('D3', trip)}</td>
                                <td class="text-center border">${checkBooking('D4', trip)}</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
            <div class="col-md-7">
                <div class="row no-gutters align-items-between h-100">
                    <div class="col-md-12 mini-cart">

                    </div>
                    <div class="col-md-12 align-self-end">
                        <button class="btn btn-success btn-block" onclick="confirmBooking(${trip.tripId})">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
        ;
    return viewSeats;
}

function checkBooking(seat, trip) {
    const bookings = trip.bookings;
    const obj = bookings.find(o => o.seat === seat);

    if (obj != null) {
        console.log("passangerId", obj.passangerId);
        console.log("userId", getCookie('userId'));

        if (obj.passangerId == getCookie('userId')) {
            return `<button class="btn btn-primary btn-block" disabled>${seat}</button>`;
            return "bg-primary text-white";
        } else {
            return `<button class="btn btn-secondary btn-block" disabled>${seat}</button>`;
        }
    } else {
        return `<button class="btn btn-light btn-block" onclick="selectSeat(this,'${seat}')">${seat}</button>`;
    }
}
