function ChartPlotter() {
  var dps = []; // dataPoints
  var dpsLightMoth = [];
  var dpsDarkMoth = [];
  var chart;
  var plotChart = function () {
    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Percentage of Moths."
      },
      axisY: {
        includeZero: true,
        suffix: " %"
      },
      legend: {
        cursor: "pointer",
        fontSize: 16
      },
      data: [{
        name: 'Light Moths',
        type: "spline",
        dataPoints: dpsLightMoth,
        showInLegend: true,
        lineColor: "lightblue",
        markerSize: 0
      }, {
        name: 'Dark Moths',
        type: "spline",
        dataPoints: dpsDarkMoth,
        showInLegend: true,
        lineColor: "black",
        markerSize: 0,
        color: "black"
      }]
    });
  };


  var xVal = 0;
  var yVal = 100;
  var updateInterval = 1000;
  var dataLength = 100; // number of dataPoints visible at any point

  var updateChart = function (data) {

    var darkMoths = parseInt(data['darkMoths']),
      lightMoths = parseInt(data['lightMoths']);


    dpsDarkMoth.push({
      x: xVal,
      y: darkMoths
    });
    dpsLightMoth.push({
      x: xVal,
      y: lightMoths
    });

    xVal++;

    if (dpsLightMoth.length > dataLength) {
      dpsLightMoth.shift();
    }
    if (dpsDarkMoth.length > dataLength) {
      dpsDarkMoth.shift();
    }

    if(chart){
      chart.render();
    }
  };

  return {
    reset: function () {
      if(chart) {
        chart.destroy();
      }
    },
    plot: plotChart,
    update: updateChart
  }
}


