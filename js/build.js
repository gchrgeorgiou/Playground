﻿


document.getElementById('importDemo').onclick = function () {
    document.getElementById("graphplaceholder").innerHTML = "";

    //code here to modify data textarea

    var result = {
        "nodes": [
            {
                "id": "Mobile App",
                "x": 290,
                "y": 80,
                "ipaddress": "",
                "height": 75,
                "width": 75,
                "group": "System of Engagement",
                "fill": {
                    "src": "../img/mobileApp.png"
                }
            },
            {
                "id": "API Gateway",
                "x": 620,
                "y": 80,
                "ipaddress": "10.0.0.1",
                "height": 50,
                "width": 75,
                "group": "Middleware",
                "fill": {
                    "src": "../img/apigw.png"
                }
            },
            {
                "id": "Mobile BFF",
                "x": 960,
                "y": 80,
                "ipaddress": "10.0.0.2",
                "height": 75,
                "width": 75,
                "group": "Containers",
                "fill": {
                    "src": "../img/bff.png"
                }
            }

        ],
        "edges": [
            {
                "from": "Mobile App",
                "to": "API Gateway",
                "protocol": "https",
                "port": "443"
            },
            {
                "from": "API Gateway",
                "to": "Mobile BFF",
                "protocol": "https",
                "port": "443"
            }
        ]
    };
    var formatted = JSON.stringify(result, null, 2);
    document.getElementById('result').value = formatted;
    document.getElementById("loadMore2").disabled = false;
};





document.getElementById("loadMore2").onclick = function () {
    document.getElementById("graphplaceholder").innerHTML = "";
    var chartTitle = document.getElementById("customChartTitle").value;
    var formatted = document.getElementById('result').value;
    var obj = JSON.parse(formatted);
    drawChart(chartTitle, obj);
};




