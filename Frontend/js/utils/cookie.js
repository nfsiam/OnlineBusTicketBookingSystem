function setCookie(cvalue, userId, userType, exdays, vendorId = "") {

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "btoken=" + cvalue + ";" + expires + ";path=/";
    document.cookie = "userId=" + userId + ";" + expires + ";path=/";
    document.cookie = "userType=" + userType + ";" + expires + ";path=/";

    document.cookie = "vendorId=" + vendorId + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function clearCookie() {
    setCookie("", "", "", 0, "");
}