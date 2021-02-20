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


    //try magic here
    // set node labels text formatter
    chart
        .nodes()
        .labels()
        .format(function () {
            var text = this.getData('group');
            if (text !== 'break') {
                return this.getData('group');
            }
            return '';
        });

    //// set line breaks group nodes settings
    //var breakGroup = chart.group('break');
    //breakGroup.height(0);
    //breakGroup.stroke('none');

    //// set pc group nodes settings
    //var pcGroup = chart.group('pc');
    //pcGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/pc.svg',
    //    mode: 'fit'
    //});
    //pcGroup.shape('rectangle');
    //pcGroup.stroke('none');
    //pcGroup.width(45);
    //pcGroup.height(45);

    //// set pc group nodes settings
    //var routerGroup = chart.group('router');
    //routerGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/router.svg',
    //    mode: 'fit'
    //});
    //routerGroup.height(70);
    //routerGroup.shape('square');
    //routerGroup.stroke('none');

    //// set internet group nodes settings
    //var internetGroup = chart.group('internet');
    //internetGroup.height(60);
    //internetGroup.shape('square');
    //internetGroup.stroke('none');
    //internetGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/isp.svg',
    //    mode: 'fit'
    //});

    // set cloud group nodes settings
    //var cloudGroud = chart.group('cloud');
    //cloudGroud.height(60);
    //cloudGroud.shape('square');
    //cloudGroud.stroke('none');
    //cloudGroud.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/cloud-server.png',
    //    mode: 'fit'
    //});

    //// set switch group nodes settings
    //var switchGroup = chart.group('switch');
    //switchGroup.shape('rectangle');
    //switchGroup.width(120);
    //switchGroup.height(40);
    //switchGroup.stroke('none');
    //switchGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/switch.svg',
    //    mode: 'fit'
    //});

    //// set server group nodes settings
    //var serverGroup = chart.group('server');
    //serverGroup.shape('square');
    //serverGroup.height(70);
    //serverGroup.stroke('none');
    //serverGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/server.svg',
    //    mode: 'fit'
    //});

    //// set printer group nodes settings
    //var printerGroup = chart.group('printer');
    //printerGroup.shape('square');
    //printerGroup.height(50);
    //printerGroup.stroke('none');
    //printerGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/printer.svg',
    //    mode: 'fit'
    //});

    //// set mobile group nodes settings
    //var mobileGroup = chart.group('mobile');
    //mobileGroup.shape('square');
    //mobileGroup.height(60);
    //mobileGroup.stroke('none');
    //mobileGroup.fill({
    //    src:
    //        'https://cdn.anychart.com/samples-data/graph/network-graph/mobile.svg',
    //    mode: 'fit'
    //});


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