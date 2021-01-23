
document.getElementById('import').onclick = function () {
    document.getElementById("graphplaceholder").innerHTML = "";
    var files = document.getElementById('selectFiles').files;

    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function (e) {
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        document.getElementById('result').value = formatted;
    }
    fr.readAsText(files.item(0));
    document.getElementById("loadMore2").disabled = false;
};


document.getElementById('importDemo').onclick = function () {
    document.getElementById("graphplaceholder").innerHTML = "";
    var result = {
        "nodes": [
            {
                "id": "1Bank Mobile App",
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
                "id": "API Connect",
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
                "from": "1Bank Mobile App",
                "to": "API Connect",
                "protocol": "https",
                "port": "443"
            },
            {
                "from": "API Connect",
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


document.getElementById('cmbDiagram').onchange = function () {
    var selVal = document.getElementById('cmbDiagram').value;
    if (selVal == "") {
        document.getElementById("loadMore").disabled = true;
    }
    else {
        document.getElementById("loadMore").disabled = false;
    }

};


document.getElementById("loadMore").onclick = function () {
    document.getElementById("graphplaceholder").innerHTML = "";
    var selection = document.getElementById('cmbDiagram');
    var jsonpath = "data/" + selection.value;
    var chartTitle = selection.options[selection.selectedIndex].text;

    anychart.data.loadJsonFile(jsonpath, function (data) {
        //console.log(data);
        drawChart(chartTitle, data);
    });
};




function drawChart(chartTitle, JsonData) {
    console.log("You are in with:" + JsonData);
    // create a chart from the loaded data
    var chart = anychart.graph(JsonData);

    //set fixed layout and use xy coordinates for each node
    chart.layout().type('fixed');

    // set the title
    chart.title(chartTitle);

    // access nodes
    var nodes = chart.nodes();
    // set the size of nodes
    nodes.normal().shape("rectangle");
    nodes.normal().height("{%height}");
    nodes.normal().width("{%width}");
    //nodes.hovered().height(45);
    //nodes.selected().height(45);

    //set the size of the edges
    chart.edges().normal().stroke("#cccccc", 2, "10 5", "round");
    chart.edges().hovered().stroke("#663399", 4, "10 5", "rectangle");
    chart.edges().selected().stroke("#663399", 4);

    // set the stroke of nodes
    nodes.normal().stroke(null);
    nodes.hovered().stroke("#333333", 0);
    nodes.selected().stroke("#cccccc", 1);

    // enable the labels of nodes
    chart.nodes().labels().enabled(true);

    // configure the labels of nodes
    chart.nodes().labels().format("{%id}\n{%ipaddress}");
    chart.nodes().labels().fontSize(12);
    chart.nodes().labels().fontWeight(600);

    //enable the labels of the edges
    chart.edges().labels().enabled(true);
    // configure the labels of nodes
    chart.edges().labels().format("{%protocol}-{%port}");
    chart.edges().labels().fontSize(12);
    chart.edges().labels().fontWeight(600);

    //tooltips
    // tooltip padding for all series on a chart
    //chart.tooltip().padding().left(20);

    // background color
    chart.tooltip().background().fill("#663399");
    nodes.tooltip().background().fill("black");


    // draw the chart
    //chart.rotation(180);
    chart.layout().iterationCount(500);
    chart.container("graphplaceholder").draw();
    chart.fit();

};