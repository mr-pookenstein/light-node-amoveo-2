var loop_start_height;
var globalnonce = 0;
var loop_finish_height;

var localBool;


function runtheloop(){
console.log("refreshing blocks");
headers_object.more_headers();
console.log("refreshing oracle list");
//abcd.request_oracles_4loop();

//console.log("refreshing blocks");

}


setInterval(function(){ runtheloop() }, 1000*10)

//setInterval(console.log(globalBalance), 150*30);
