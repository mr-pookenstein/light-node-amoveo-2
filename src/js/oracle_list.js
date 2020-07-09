
var firstTimeBool;
var filterText;

var abcd = (function() {
    var div = document.createElement("div");
    document.body.appendChild(div);

    var title2 = document.createElement("h3");
    title2.innerHTML = "Raw Contract";
//    div.appendChild(title2);
    glossary.link2(div, "accepting_channel_offer", "how to accept a trade");
    var contract_div = document.createElement("div");
    //div.appendChild(contract_div);

    var title1 = document.createElement("h3");
    title1.innerHTML = "Odds";
    div.appendChild(title1);
    var offers = document.createElement("div");
    div.appendChild(offers);
    
    var oracleDoc = document.createElement("h8");
    var t2 = document.createElement("h8");
    var t3;
    var filterbutton = button_maker2("Go", function() { return filter()});


    var title = document.createElement("h3");
    title.innerHTML = "Events";
    div.appendChild(title);
    var oracle_filter = document.createElement("INPUT");
    div.appendChild(text("Filter: "));
    div.appendChild(oracle_filter);
    div.appendChild(text(" "));
    div.appendChild(filterbutton);

    div.appendChild(br());
    div.appendChild(br());
    var oracles = document.createElement("div");
    div.appendChild(oracles);
    //oracles.innerHTML = "test";


    request(["oracle_list"], "http://159.89.87.58:8090/", function(X) {
        console.log("oracle_list attempt:");
        console.log(JSON.stringify(X));
        var l = X.slice(1);
        offers.innerHTML = "";
        console.log("right before display_oracles(l)");
        display_oracles(l);
    });

//firstTimeBool = 1;
    function display_oracles(l) {
        console.log("firsttimebool is: ");
        console.log(firstTimeBool);

if (firstTimeBool != 1){
                    oracles.innerHTML = "";
                    firstTimeBool = 1;
                }


        div.appendChild(oracleDoc);
        //oracleDoc.innerHTML = "testing";
        if (JSON.stringify(l) == "[]") {
            return 0;
        } else {
            var h = l[0];
            //console.log("this is h");
            //console.log(JSON.stringify(h));
            request(["oracle", h[1]], "http://159.89.87.58:8090/", function(Oracle) {
                //variable_public_get(["oracle", h], function(Oracle) {
                if(Oracle == "error") {
                    console.log("non existant oracle.");
                } else {
                    console.log(JSON.stringify(Oracle));
                    console.log(atob(Oracle[1][4]));
                    var oracle_text = atob(Oracle[1][4]);
                    //determine if it is bitcoin put or call
                    console.log(oracle_text.search("as reported by Close price as of "));
                    console.log(oracle_text.search(" on https://coinmarketcap.com/currencies/bitcoin/historical-data/"));

                    if (( (oracle_text.search("bitcoin price is more than ") == 0) || (oracle_text.search("bitcoin price is less than ") == 0)) && (oracle_text.search("as reported by Close price as of ") >= 33) && (oracle_text.search("as reported by Close price as of ") <= 35) && (oracle_text.search(" on https://coinmarketcap.com/currencies/bitcoin/historical-data/") >= 77) && (oracle_text.search(" on https://coinmarketcap.com/currencies/bitcoin/historical-data/") <= 79)) {
                        console.log("oracle text success");
                        console.log();
                            var price = oracle_text.slice(26,33);
                            console.log(price);
                            console.log("price testing");
                            console.log(price[price.length-1] == " ");
                            console.log(price[price.length]);
                            if ((price[1] == "$") && (price[0] == " ") && (price[price.length-1] == " ")){
                            console.log(price.slice(2,price.length-1));
                            console.log(price.search(" "));

                            var coinPrice = price.slice(2,price.length-1);


                            console.log("date testing");

                            console.log(oracle_text.slice(oracle_text.search("as reported by Close price as of ")+("as reported by Close price as of ").length,oracle_text.search(" on https://coinmarketcap.com/currencies/bitcoin/historical-data/")));
                            var dateValue = oracle_text.slice(oracle_text.search("as reported by Close price as of ")+("as reported by Close price as of ").length,oracle_text.search(" on https://coinmarketcap.com/currencies/bitcoin/historical-data/"));
                            
                            console.log(dateValue.slice(0,3));
                            if ((dateValue.slice(0,3) == "Jul") || (dateValue.slice(0,3) == "Aug") || (dateValue.slice(0,3) == "Sep") || (dateValue.slice(0,3) == "Oct") ){
                                    console.log("success!");
                                    console.log(oracle_text.slice(17,21));
                            var callorput;

                            if (oracle_text.slice(17,21) == "more"){

                            callorput =  "call";
                            
                            } else if (oracle_text.slice(17,21) == "less"){
                                callorput = "put";
                            }

                            t2 = text("Bitcoin ".concat(callorput)+ " option | Strike: $"+ coinPrice+" | Maturity: Midnight "+dateValue+" GMT | ");
                            t3 = "Bitcoin ".concat(callorput)+ " option | Strike: $"+ coinPrice+" | Maturity: Midnight "+dateValue+" GMT | ";
                            }
                            }
                            
                    }else{t2 = text(atob(Oracle[1][4]));
                          t3 = atob(Oracle[1][4]);                          
                                                        }
                        

                    

                    console.log("this is t");
                    console.log(t3);
                    console.log((t3.split(" ")));
                                            console.log((t3.split(" "))[0]);
                    console.log(t2[0]);
                    var button = button_maker2("see odds", function() { return display_oracle(Oracle[1][2], Oracle[1][3]) });
                    //adding some space
                    console.log("firstTimeBool: " + firstTimeBool);
                    console.log(filterText === undefined);
                    if (filterText === undefined){

                    oracles.appendChild(t2);
                    oracles.appendChild(button);
                    oracles.appendChild(br());

                    
                    }else{

                        //check if strings match
                        console.log("filter text is: " + filterText);
                        //start slicing filterText

                        var increment;
                        increment = 0;
                        var lengthSplit = (filterText.split(" ")).length;
                        console.log(lengthSplit);

                    //    for (increment < lengthSplit );
                        if (t3.search((filterText.split(" "))[0]) < 0){

                            increment = increment + 1;

                        }

                        if (increment < 1) {
                        oracles.appendChild(t2);
                        oracles.appendChild(button);
                        oracles.appendChild(br());
                        }

                    }

                };
               // firstTimeBool = 1;

            });
                display_oracles(l.slice(1));
        };
    };
    function display_oracle(Buys, Sells) {
        console.log(JSON.stringify([Buys, Sells]));
        var l = Buys.concat(Sells.slice(1));
        console.log("this is l:");
        console.log(l);
        request(["get_offers", l], "http://159.89.87.58:8090/", function(l2) {
            console.log(JSON.stringify(l2));
            offers.innerHTML = "";
            return display_offers(l2.slice(1));
        });
    };
    function display_offers(l) {
        if (JSON.stringify(l) == "[]") {
            return 0;
        } else {
            var h = l[0];
            var t = document.createElement("div");
            var type;
            if (h[9] == 1) {
                type = "binary";
                price = h[3];
                return display_offers2(l, h, t, type, price, " or ", "");
            } else if (h[9] == 2) {
                var oid = h[2];
                type = "scalar"
                oracle_limit(oid, function(oracle_max) {
                    console.log("oracle_list callback");
                    console.log(oracle_max);
                    var direction = h[4];
                    if (direction == 2) {
                        price = (1023 - h[3]) * oracle_max / 1023;
                    } else if (direction == 1) {
                        price = h[3] * oracle_max / 1023;
                    } else {
                        console.log("fail");
                        return 0
                    };
                    return display_offers2(l, h, t, type, price, " veo/stablecoin or ", " stablecoin/veo;");
                });
            } else {
                console.log(h[9]);
                console.log("contract type not supported.");
            }
        }
    };
    function display_offers2(l, h, t, type, price, d1message, d2message) {
        var direction;
        if (h[4] == 2) {
            if (type == "binary") {
                direction = "the result is true";
            } else if (type == "scalar") {
                direction = "the price of stablecoin measured in veo increases";
                return 0;
            }
        } else {
            if (type == "binary") {
                direction = "the result is false";
            } else if (type == "scalar") {
                direction = "the price of stablecoin measured in veo decreases";
                return 0;
            }
        }
//        var text = "bet type: ".concat(type).concat("; price = ").concat(price.toFixed(5)).concat(d1message).concat((1/price).toFixed(5)).concat(d2message).concat(" you win if ").concat(direction).concat("; they pay = ").concat(s2c(h[7])).concat("; you pay = ").concat(s2c(h[8])).concat("; expires: ").concat(h[5]);
        
        var text = ("You Stake: ").concat(s2c(h[8])).concat("<br />")+" They Stake: ".concat(s2c(h[7]));

        t.innerHTML = text;
        offers.appendChild(t);
        var button = button_maker2("Go (be careful)", function() { display_contract(h, type) });
        offers.appendChild(button);
        offers.appendChild(br());
        display_offers(l.slice(1));
    };
    function plus_encode(s) {
        if (s == "") { return ""; }
        var h = s[0];
        if (h == "+") { h = "%2B"; }
        return h.concat(plus_encode(s.slice(1)));
    };
    function display_contract(h, type) {
        var CID = h[1];
        request(["get_offer_contract", CID], "http://159.89.87.58:8090/", function(C) {
            var copy_contract_link = document.createElement("div");
            var contract_type = type;
            console.log(JSON.stringify(h));
            console.log(JSON.stringify(C));
            console.log(JSON.stringify(C[1]));
            globalChannelOffer = C[1];
            console.log("broadcasting C")
            console.log(C);
            console.log("trying to broadcast the offer");

            CBA.cp_start();
            keys.update_balance();
/*
            var oid = plus_encode(h[2]);
            var UL = C[1][1][18];
            var LL = C[1][1][19];
            F = function(X){
                var Y = parseInt(X) / 100000000;
                return(Y.toFixed(8));
            };
            //var direction = C[1][2][1][2];//either 1 or 2.
            var direction = C[1][1][1];//either 1 or 2.
            var d_string;
            if (direction == 1) {
                d_string = "false";
            } else if (direction == 2) {
                d_string = "true";
            } else {
                console.log(JSON.stringify(C[1][2][1]));
                console.log(direction);
                console.log("badly formed contract offer");
                return(0);
            }
        //    contract_div.innerHTML = JSON.stringify(C[1]);
            var our_amount = F(C[1][2][1][5]);
            var their_amount = F(C[1][2][1][4]);
            var oracle_height = C[1][3][2];

            console.log("c1 one: ");
            console.log(C[1]);
            console.log("c1 two: ");
            JSON.stringify(C[1]);
        //    copy_contract_link.innerHTML = "<a href=".concat("\"/otc_derivatives.html?auto_fill=").concat(contract_type).concat("&oracle=").concat(oid).concat("&our_amount=").concat(our_amount).concat("&their_amount=").concat(their_amount).concat("&oracle_height=").concat(oracle_height).concat("&bet_direction=").concat(d_string).concat("&upper_limit=").concat(UL).concat("&lower_limit=").concat(LL).concat("\" onclick=\"javascript:event.target.port=8080\"").concat(">open this contract in the contract-editor</a>");
        //    contract_div.appendChild(copy_contract_link);
        //    contract_div.appendChild(br());
            //console.log(JSON.stringify(C[1])); */
        });
    };


    return {oracle_filter: oracle_filter, oracleDoc: oracleDoc, title:title, oracles: oracles, t2: t2, offers: offers, oracle_list_pull: (function() { return oracle_list_pull; }), display_oracles: display_oracles, display_oracle: display_oracle, display_offers: display_offers};
})();

abcd.oracle_list_pull();

    function filter(){
        console.log(abcd.oracle_filter.value);
        filterText = abcd.oracle_filter.value;

        firstTimeBool = 0;
        
        request(["oracle_list"], "http://159.89.87.58:8090/", function(Y) {
        console.log("oracle_list attempt:");
        console.log(JSON.stringify(Y));
        var l = Y.slice(1);
        abcd.display_oracles(l);
        });

    }