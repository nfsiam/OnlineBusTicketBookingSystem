
function includeActiveBusePage() {
    const mbsc =
        `
    <div class="col-md-12 mt-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control shadow" placeholder="search bus">
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-primary shadow">Add Bus</button>
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


function includeArchivedBusePage() {
    const mbsc =
        `
    <div class="col-md-12 mt-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control shadow" placeholder="search archived bus">
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-primary shadow">Add Bus</button>
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