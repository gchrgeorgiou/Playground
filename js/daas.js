function drawChart(chartTitle, JsonData,chartType) {
    console.log("You are in with:" + JsonData);
    // create a chart from the loaded data
    var chart = anychart.graph(JsonData);

    //set fixed layout and use xy coordinates for each node
   

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
    
    if (chartType == 'Fixed') {        
        chart.layout().type('fixed');
        console.log("it was fixed");
    } else {
        chart.rotation(180);
        console.log("it was not fixed");
        chart.layout().iterationCount(500);
    }
    chart.container("graphplaceholder").draw();
    chart.fit();

};