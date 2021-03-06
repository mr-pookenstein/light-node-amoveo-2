function getter(t, u, callback){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = callback;
    xmlhttp.open("POST",u,true);
    xmlhttp.send(JSON.stringify(t));
    return xmlhttp
}
function get(t, callback) {
    return general_get(t, get_port(), callback)
}
function general_get(t, port, callback) {
    u = url(port, get_ip());
    return getter(t, u, callback);
}
function url(port, ip) { return "http://".concat(ip).concat(":").concat(port.toString().concat("/")); }
function xml_check(x) {
    return ((x.readyState === 4) && (x.status === 200)); };
function xml_out(x) { return x.responseText; }
function refresh_helper(x, cmd, innercallback, callback, n) {
    if (n < 1) { return "failed to connect"; }
    else if (x.status == 400) {
        //the data we sent to the server got mixed up along the way, so it looks invalid to the server.
        //So lets re-send the command.
        setTimeout(function() {
            return variable_public_get(cmd, innercallback);
        }, 200); }
    else if (x.status == 0) {
        //this means that the server got our message, and it is still processing a response for us. So lets wait a bit, and then check if it is ready.
        setTimeout(function() {
                       return refresh_helper(x, cmd, innercallback,
                                             callback, n - 1);
                   }, 150);
    }
    else if (xml_check(x)) {
        //this means that the server got our message, and it sent a response. The response is ready to read, so lets read it.
        callback(xml_out(x));}
    else {
        //console.log(x.readyState);
        //console.log(x.status);
        setTimeout(function() {return refresh_helper(x, cmd, innercallback, callback, n);}, 10);}
}

my_status = "nil";

//function variable_get(cmd, callback) {
//    var x = local_get(cmd);
//    var_get(x, callback);
//}
function variable_public_get(cmd, callback) {
    var foobar = get(cmd);
    var_get(foobar, callback, cmd);
}
function var_get(x, callback, cmd) {
    refresh_helper(x, cmd, callback, function(){
    p = JSON.parse(xml_out(x));
    callback(p[1]);
    }, 100);
}
function messenger(cmd, callback) {
    var foobar = general_get(cmd, 8088);
    var_get(foobar, callback, cmd);
}


function request(cmd, u, callback) {
    var xmlhttp=new XMLHttpRequest();
    //xmlhttp.onreadystatechange = callback;
    xmlhttp.open("POST",u,true);
    xmlhttp.send(JSON.stringify(cmd));
    return request2(xmlhttp, cmd, u, callback, 100);
};
function request2(x, cmd, u, callback, n) {
    if (n < 1) { return "failed to connect"; }
    else if (x.status == 400) {
        //the data we sent to the server got mixed up along the way, so it looks invalid to the server.
        //So lets re-send the command.
        setTimeout(function() {
            return request(cmd, u, callback);
        }, 200); }
    else if (x.status == 0) {
        //this means that the server got our message, and it is still processing a response for us. So lets wait a bit, and then check if it is ready.
        setTimeout(function() {
            return request2(x, cmd, u, callback, n - 1);
        }, 150);
    }
    else if (xml_check(x)) {
        //this means that the server got our message, and it sent a response. The response is ready to read, so lets read it.
        p = JSON.parse(xml_out(x));
        return callback(p[1]);
    }
    else {
        //console.log(x.readyState);
        //console.log(x.status);
        setTimeout(function() {return request2(x, cmd, u, callback, n);}, 10);}
};