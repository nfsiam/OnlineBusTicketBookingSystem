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
