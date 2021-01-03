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