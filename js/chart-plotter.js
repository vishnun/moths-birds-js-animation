function ChartPlotter() {
  var dps = []; // dataPoints
  var dpsLightMoth = [];
  var dpsDarkMoth = [];
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Percentage of Moths."
    },
    axisY: {
      includeZero: false
    },
    data: [{
      type: "line",
      dataPoints: dpsLightMoth,
      lineColor: "lightblue"
    }, {
      type: "line",
      dataPoints: dpsDarkMoth,
      lineColor: "black",
      color: "black"
    }]
  });

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

    chart.render();
  };

  return {
    reset: function () {
      chart.destroy();
    },
    update: updateChart
  }
}


