

document.getElementById('cmbDiagram').onchange = function () {
    var selVal = document.getElementById('cmbDiagram').value;
    if (selVal == "") {
        document.getElementById("graphplaceholder").innerHTML = "";
        alert('Please select a diagram!');
    }
    else {
        document.getElementById("graphplaceholder").innerHTML = "";
        var selection = document.getElementById('cmbDiagram');
        var jsonpath = "data/" + selection.value;
        var chartTitle = selection.options[selection.selectedIndex].text;
        anychart.data.loadJsonFile(jsonpath, function (data) {
            //console.log(data);
            drawChart(chartTitle, data, "Fixed");
        });
    }

};
