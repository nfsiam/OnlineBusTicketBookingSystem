
function includeActiveBusePage() {
    const mbsc =
        `
    <div class="col-md-12 mt-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control shadow" placeholder="search bus">
            </div>
            <div class="col-md-3">
                <a href="/#add-bus" class="btn btn-block btn-primary shadow">Add Bus</a>
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-warning shadow">Show Archives</button>
            </div>
        </div>
    </div>
    `;
    return mbsc;
}

function includeActiveBusesSection() {
    const bsec =
        `
    <div class="col-md-12 my-3">
        <div class="row buses-section">
        </div>
    </div>
    `;
    return bsec;
}

function includeActiveBusRow(bus) {
    const busRow =
        `
    <div class="col-md-12" id="bus-row-${bus.busId}">
        <div class="card shadow mb-3 rounded bg-white">
            <div class="card-body pb-0 pt-2">
                <div class="d-flex justify-content-between align-items-center pb-2">
                    <div class="">
                        <div class="h6 m-0 text-success font-weight-bold">${bus.busName} [${bus.busId}]</div>
                    </div>
                    <div class="">
                        <button class=" btn btn-white text-warning p-0 font-weight-bold" onclick="archiveBus(${bus.busId})">Archive</button>
                    </div>
                </div>
                <table class="table table-bordered table-sm text-center">
                    <tr>
                        <td>${bus.totalSeat}</td>
                        <td>${bus.busType}</td>
                        <td>Seat Fair ${bus.perSeatFair} TK. </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    `;
    return busRow;
}


function includeArchivedBusesPage() {
    const mbsc =
        `
    <div class="col-md-12 mt-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control shadow" placeholder="search archived bus">
            </div>
            <div class="col-md-3">
                <a href="/#add-bus" class="btn btn-block btn-primary shadow">Add Bus</a>
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-success shadow">Show Active</button>
            </div>
        </div>
    </div>
    `;
    return mbsc;
}

function includeArchivedBusesSection() {
    const bsec =
        `
    <div class="col-md-12 my-3">
        <div class="row buses-section">
        </div>
    </div>
    `;
    return bsec;
}

function includeArchivedBusRow(bus) {
    const busRow =
        `
    <div class="col-md-12" id="bus-row-${bus.busId}">
        <div class="card shadow mb-3 rounded bg-white">
            <div class="card-body pb-0 pt-2">
                <div class="d-flex justify-content-between align-items-center pb-2">
                    <div class="">
                        <div class="h6 m-0 text-warning font-weight-bold">${bus.busName} [${bus.busId}]</div>
                    </div>
                    <div class="">
                        <button class=" btn btn-white text-success p-0 font-weight-bold" onclick="restoreBus(${bus.busId})">Restore</button>
                    </div>
                </div>
                <table class="table table-bordered table-sm text-center">
                    <tr>
                        <td>${bus.totalSeat}</td>
                        <td>${bus.busType}</td>
                        <td>Seat Fair ${bus.perSeatFair} TK. </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    `;
    return busRow;
}

function includeAddBusPage() {

    const str =
        `
        <div class="col-md-12 mt-3">
        <div class="login-form">
            <div>
                <h2 class="text-center">Add Bus</h2>       
                <div class="form-group">
                    <label for="bus-name-input" class="form-label">Bus Name</label>
                    <input type="text" class="form-control" placeholder="e.g. Volvo" required="required" id="bus-name-input">
                    <small id="errBusName" class="text-warning"></small>
                </div>
                <div class="form-group">
                    <label for="bus-type-input" class="form-label">Bus Type</label>
                    <select id="bus-type-input" class="form-control">
                        <option value="">Select</option>
                        <option value="AC">AC</option>
                        <option value="NON AC">NON AC</option>
                    </select>
                    <small id="errBusType" class="text-warning"></small>
                </div>
                <div class="form-group">
                    <label for="total-seat-input" class="form-label">Total Seats</label>
                    <select id="total-seat-input" class="form-control">
                        <option value="">Select</option>
                        <option value="32">32</option>
                        <option value="40">40</option>
                    </select>
                    <small id="errTotalSeat" class="text-warning"></small>
                </div>
                <div class="form-group">
                    <label for="per-seat-fair-input" class="form-label">Per Seat Fair</label>
                    <input type="number" class="form-control" placeholder="e.g. Volvo" required="required" id="per-seat-fair-input">
                    <small id="errPerSeatFair" class="text-warning"></small>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-block" onclick="addBus()">Add</button>
                </div>       
            </div>
            </div>
        </div>
    
    `;
    return str;
}


function includeAddTripPage() {
    const fromTemplate =
        `
    <div class="col-md-12 mt-3">
    <h2 class="text-center text-success font-weight-bold">Add Trip</h2>
    <div class="form-group">
        <label for="bus-id-input" class="form-label">Bus</label>
        <select id="bus-id-input" class="form-control">
            <option value="">Select</option>
        </select>
        <small id="errBusId" class="text-warning"></small>
    </div>
    <div class="form-group">
        <label for="from-location-input" class="form-label">From</label>
        <select id="from-location-input" class="form-control">
            ${getDisOpts()}
        </select>
        <small id="errLocationFrom" class="text-warning"></small>
    </div>
    <div class="form-group">
        <label for="to-location-input" class="form-label">To</label>
        <select id="to-location-input" class="form-control">
            ${getDisOpts()}
        </select>
        <small id="errLocationTo" class="text-warning"></small>
    </div>
    <div class="form-group">
        <label for="journey-date-input" class="form-label">Date and Time</label>
        <input type="datetime-local" class="form-control" id="journey-date-input" min="${new Date().toISOString().slice(0, 10)}">
        <small id="errTiming" class="text-warning"></small>
    </div>

    <div class="form-group">
        <button class="btn btn-primary btn-block" onclick="addTripFormSubmit()">Confirm</button>
    </div>
    </div>
    `;
    return fromTemplate;
}


function includeVendorHomePage() {
    const fromTemplate =
        `
    <div class="col-md-12 mt-3">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Sales report</h6>
            </div>
            <div class="card-body">
                <div class="chart-area">
                    <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                            <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                            <div class=""></div>
                        </div>
                    </div>
                    <canvas id="myAreaChart" width="1037" height="320" class="chartjs-render-monitor"
                        style="display: block; width: 1037px; height: 320px;"></canvas>
                </div>
                <hr>
                Sales Graph
            </div>
        </div>
    </div>
    <div class="col-md-12 mt-3">

        <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Top 3 Bus Earning</h6>
            </div>
            <!-- Card Body -->
            <div class="card-body">
            <div class="chart-pie pt-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="myPieChart" width="255" height="216" class="chartjs-render-monitor" style="display: block; width: 255px; height: 216px;"></canvas>
            </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

    <script src="/chart-area-demo.js"></script>
    <script src="/chart-pie-demo.js"></script>
    `;
    return fromTemplate;
}

