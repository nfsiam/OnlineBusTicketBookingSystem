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
        <h2 class="text-center">Register</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
            <small id="errUsername" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" required="required" id="email-input">
            <small id="errEmail" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" required="required" id="name-input">
            <small id="errName" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
            <small id="errPassword" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Confirm Password" required="required" id="cpassword-input">
            <small id="errCPassword" class="text-warning"></small>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="regSubmit()">Register</button>
        </div>       
    </div>
    <p class="text-center"><a href="#login" class="text-success">Login Instead</a> | <a href="#register-vendor" class="text-danger">Want to be a Vendor?</a></p>
    </div>
        </div>
    
    `;
    return str;
}

function includeVendorRegForm() {
    const str =
        `
        <div class="col-md-12 mt-3">
        <div class="login-form">
    <div>
        <h2 class="text-center">Vendor Application</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
            <small id="errUsername" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="email" class="form-control" placeholder="Email" required="required" id="email-input">
            <small id="errEmail" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" required="required" id="name-input">
            <small id="errName" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Vendor Name (Company Name)" required="required" id="vendor-name-input">
            <small id="errVendorname" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
            <small id="errPassword" class="text-warning"></small>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Confirm Password" required="required" id="cpassword-input">
            <small id="errCPassword" class="text-warning"></small>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="vendorRegSubmit()">Apply</button>
        </div>       
    </div>
    <p class="text-center"><a href="#login" class="text-success">Login Instead</a> | <a href="#register" class="text-danger">Register as a User</a></p>
    </div>
        </div>
    
    `;
    return str;
}


function includeUserNavLinks() {
    const links =
        `
    <li class="nav-item">
        <a class="nav-link" href="/#home"> Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#active-bookings">Active Bookings</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#booking-history">Booking History</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#my-profile">My Profile</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#support">Support</a>
    </li>
    `;
    return links;
}


function includeVendorNavLinks() {
    const links =
        `
    <li class="nav-item">
        <a class="nav-link" href="/#vendor-home"> Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#active-buses">Active Buses</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#archived-buses">Archived Buses</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#add-trip">Add Trip</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#active-trips">Active Trips</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#trip-history">Trip History</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#support">Support</a>
    </li>
    `;
    return links;
}