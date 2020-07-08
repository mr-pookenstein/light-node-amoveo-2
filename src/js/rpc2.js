function getter2(t, u, callback2){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = callback2;
    xmlhttp.withCredentials = true;
    xmlhttp.open("POST",u,true);
    xmlhttp.send(JSON.stringify(t));
    return xmlhttp
}
function get2(t, callback2) {
    return general_get2(t, get_port(), callback2)
}
function general_get2(t, port, callback2) {
    u = url2(port, get_ip());
    return getter2(t, u, callback2);
}
function url2(port, ip) { return "http://".concat(ip).concat(":").concat(port.toString().concat("/")); }
function xml_check2(x) {
    return ((x.readyState === 4) && (x.status === 200)); };
function xml_out2(x) { return x.responseText; }
function refresh_helper2(x, cmd, innercallback2, callback2, n) {
    if (n < 1) { return "failed to connect"; }
    else if (x.status == 400) {
        //the data we sent to the server got mixed up along the way, so it looks invalid to the server.
        //So lets re-send the command.
        setTimeout(function() {
            return variable_public_get2(cmd, innercallback2);
        }, 200); }
    else if (x.status == 0) {
        //this means that the server got our message, and it is still processing a response for us. So lets wait a bit, and then check if it is ready.
        setTimeout(function() {
                       return refresh_helper2(x, cmd, innercallback2,
                                             callback2, n - 1);
                   }, 150);
    }
    else if (xml_check2(x)) {
        //this means that the server got our message, and it sent a response. The response is ready to read, so lets read it.
        callback2(xml_out2(x));}
    else {
        //console.log(x.readyState);
        //console.log(x.status);
        setTimeout(function() {return refresh_helper2(x, cmd, innercallback2, callback2, n);}, 10);}
}

my_status = "nil";

//function variable_get(cmd, callback2) {
//    var x = local_get(cmd);
//    var_get(x, callback2);
//}
function variable_public_get2(cmd, callback2) {
    var foobar = get2(cmd);
    var_get2(foobar, callback2, cmd);
}
function var_get2(x, callback2, cmd) {
    refresh_helper2(x, cmd, callback2, function(){
    console.log("x is: ");
    console.log(x);
	p = JSON.parse(xml_out2(x));
    console.log("p[1] is: ");
    console.log(p[1]);
	callback2(p[1]);
    }, 100);
}
function messenger2(cmd, callback2) {
    var foobar = general_get2(cmd, 8088);
    var_get2(foobar, callback2, cmd);
}
