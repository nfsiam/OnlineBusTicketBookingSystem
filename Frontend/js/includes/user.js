function includeTripSearchForm() {
    const fromTemplate =
        `
    <div class="col-md-12 mt-3">
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
        <input type="date" class="form-control" id="journey-date-input" min="${new Date().toISOString().slice(0, 10)}">
        <small id="errTiming" class="text-warning"></small>
    </div>
    <div class="form-group">
        <button class="btn btn-primary btn-block" onclick="tripSearchFormSubmit()">Search Trips</button>
    </div>
</div>
    `;
    return fromTemplate;
}
