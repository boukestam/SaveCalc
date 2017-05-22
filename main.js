var heightStartGraph;
var heightEndGraph;
var widthStartGraph;
var widthEndGraph;

var widthSpacingForOneInterest;

var plotData = null;
var plotNode = null;

function update(){
	// Retrieve values
	var timespan_visit_times = $("#timespan_visit_times option:selected").val();
	var visit_times = $("#visit_times").val();
	if(visit_times < 1){
		visit_times = 1;
		$("#visit_times").val(1);
	}

	var average_spending = $("#average_spending").val();
	var valuta = $("#valuta option:selected").val();
	if(average_spending < 0.01){
		average_spending = 0.01;
		$("#average_spending").val(0.01);
	}
	
	var interest = $("#interest").val();
	var timespan_interest = $("#timespan_interest option:selected").val();
	
    // Calculate interest
	var visitTimesEachYear = visit_times * timespan_visit_times;
	var visitTimesEachInterest = visitTimesEachYear / timespan_interest;
	var spendEachInterest = visitTimesEachInterest * average_spending;

    var numSamples = 100;
	var money = [0];
    var time = [0];

    // Generate samples
	for(var i = 1; i < numSamples; i++){
        var m = money[i - 1];
		m += spendEachInterest;
		m *= (1.0 + interest / 100.0);

		money.push(m);
        time.push(i);
	}

    if(plotData == null){
        var gd3 = Plotly.d3.select('#chart').style({
            width: '100%',
        });
        plotNode = gd3.node();

        // Create graph
        plotData = [{
            x: time,
            y: money,
            type: "scatter"
        }];

        var layout = {
            title: "Savings",
            xaxis: {
                title: "Time"
            },
            yaxis: {
                title: "Money"
            },
            margin: {
                l: 40,
                r: 0,
                b: 40,
                t: 40,
                pad: 0
            },
        };

        Plotly.plot(plotNode, plotData, layout);

        window.onresize = function(){
            Plotly.Plots.resize(plotNode);
        }
    }else{
        // Update graph
        
        plotData[0].x = time;
        plotData[0].y = money;
        Plotly.redraw(plotNode);
    }
}