var heightStartGraph;
var heightEndGraph;
var widthStartGraph;
var widthEndGraph;

var widthSpacingForOneInterest;

function init(){
	// Retrieve values
	var timespan_visit_times = $("#timespan_visit_times option:selected").val();
	var visit_times = $("#visit_times").val();
	if(visit_times < 1){$("#visit_times").val(1);}

	var average_spending = $("#average_spending").val();
	var valuta = $("#valuta option:selected").val();
	if(average_spending < 1){$("#average_spending").val(1);}
	
	var interest = $("#interest").val();
	var timespan_interest = $("#timespan_interest option:selected").val();
	if(interest < 1){$("#interest").val(1);}
	
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

    var trace = {
        x: time,
        y: money,
        type: "scatter"
    };

    var layout = {
        title: "Savings",
        xaxis: {
            title: "Time"
        },
        yaxis: {
            title: "Money"
        }
    };

    // Create graph
    Plotly.newPlot("chart", [trace], layout);
}