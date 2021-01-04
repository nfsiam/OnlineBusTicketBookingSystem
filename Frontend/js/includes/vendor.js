function includeManageBusesSection() {
    const mbsc =
        `
    <div class="col-md-12 mt-3">
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control shadow" placeholder="search bus">
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-success shadow">Add Bus</button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-warning shadow">Archives</button>
            </div>
        </div>
    </div>
    `;
    return mbsc;
}

function includeBusesSection() {
    const bsec =
        `
    <div class="col-md-12 my-3">
        <div class="row buses-section">
        </div>
    </div>
    `;
    return bsec;
}

function includeBusRow(bus) {
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