
window.onload = function () {
    
    for (var i = 0, len = localStorage.length; i < len; ++i) {        
        // get reference to select element
        var sel = document.getElementById('cmbDiagram');
        // create new option element
        var opt = document.createElement('option');
        // create text node to add to option element (opt)
        opt.appendChild(document.createTextNode(localStorage.key(i)));
        // set value property of opt
        opt.value = localStorage.getItem(localStorage.key(i));
        // add opt to end of select box (sel)
        sel.appendChild(opt);     
    }
    
};

document.getElementById('cmbDiagram').onchange = function () {
    var selVal = document.getElementById('cmbDiagram').value;
    if (selVal == "") {
        document.getElementById("graphplaceholder").innerHTML = "";
        alert('Please select a diagram!');
    }
    else {
        document.getElementById("graphplaceholder").innerHTML = "";
        var selection = document.getElementById('cmbDiagram');
        var chartTitle = selection.options[selection.selectedIndex].text;
        if ((selection.value).substring((selection.value).length - 5) == ".json") {
            var jsonpath = "data/" + selection.value;            
            anychart.data.loadJsonFile(jsonpath, function (data) {              
                drawChart(chartTitle, data, "Fixed");
            });
        }
        else {            
            drawChart(chartTitle, JSON.parse(selection.value), "Fixed");
        }
    }

};
