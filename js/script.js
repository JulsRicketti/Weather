$.get("http://ipinfo.io", function(response) {
    $("#ip").html(response.ip);
    $("#address").html(response.city + ", " + response.region);
}, "jsonp");