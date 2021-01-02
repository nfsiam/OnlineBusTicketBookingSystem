function includeLoginForm() {
    const str =
        `
        <div class="col-md-12">
        <div class="login-form">
    <div>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="loginSubmit()">Log in</button>
        </div>       
    </div>
    <p class="text-center"><a href="#register">Create an Account</a></p>
    </div>
        </div>
    
    `;
    return str;
}

function includeRegForm() {
    const str =
        `
        <div class="col-md-12">
        <div class="login-form">
    <div>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" required="required" id="name-input">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="registerSubmit()">Log in</button>
        </div>       
    </div>
    <p class="text-center"><a href="#register">Create an Account</a></p>
    </div>
        </div>
    
    `;
    return str;
}


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
        <input type="date" class="form-control" id="journey-date-input">
    </div>
    <div class="form-group">
        <button class="btn btn-primary btn-block" onclick="tripSearchFormSubmit()">Search Trips</button>
    </div>
</div>
    `;
    return fromTemplate;
}

function includeTripRow(trip) {
    const datetime = new Date(trip.timing);
    const tripRow =
        `
    <div class="col-md-12 mt-3">
    <div class="card shadow h-100">
        <div class="card-body border-left border-primary">
            <div class="row no-gutters align-items-start">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary mb-1">
                        ${trip.bus.vendor.vendorName}
                    </div>
                    <div class="text-xs font-weight-bold text-secondary mb-1">
                        ${trip.bus.busType}
                    </div>
                </div>
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-secondary mb-1">
                        ${datetime.toLocaleDateString('en-US')}
                    </div>
                    <div class="text-xs font-weight-bold text-secondary mb-1">
                        ${datetime.toLocaleTimeString('en-US')}
                    </div>
                </div>
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary mb-1">
                        ${trip.bus.totalSeat - trip.bookings.length}
                    </div>
                </div>
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary mb-1">
                        ${trip.bus.perSeatFair}
                    </div>
                </div>
                <div class="col-auto">
                    <button class="btn btn-sm btn-primary" onclick="viewSeats(${trip.tripId})">View Seats</button>
                </div>
            </div>

            <div class="row no-gutters  justify-content-between " id="trip-row-${trip.tripId}">
             
            <!--here viewSeats will be inserted--!>

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
                    <button class="btn btn-success btn-block">Continue</button>
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
