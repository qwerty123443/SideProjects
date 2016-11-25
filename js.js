fetch('Varendoncl-Guests-Json.json').then( response => {
	response.json().then( json => {
		console.log(json);

		var jsonArr = jsonReformatter(json);
		var phones = jsonArr.phones;

		var statsDiv = document.createElement('div');
		var phonesDiv = document.createElement('div');

		var date = document.createElement('p');
		var phoneAmount = document.createElement('p');

		for (var key in phones) {
			var phoneText = document.createElement('p');

			phoneText.innerText = key + ' : ' + phones[key];
			phonesDiv.appendChild(phoneText);
		}

		date.innerText = 'Date: 03-11-16';
		phoneAmount.innerText = 'Amount of phones: ' + jsonArr.amount;

		statsDiv.appendChild(date);
		statsDiv.appendChild(phoneAmount);

		document.body.appendChild(statsDiv);
		document.body.appendChild(document.createElement('hr'));
		document.body.appendChild(phonesDiv);

		createPieChart(phones);
		createBarChart(phones);
}).catch( err => {
		console.log(err);
	});
}).catch( err => {
	console.log(err);
})

function jsonReformatter(JSON) {
	let outp = {};
	let amount = 0;
	let phoneArray = {};

	JSON.forEach( (item, key) => {
		if (item.state == 'UP') {
			var phoneVendor = item.vendor;

			if (!phoneVendor) {
				phoneVendor = 'Undefined';
			}

			if (phoneArray[phoneVendor]) {
				phoneArray[phoneVendor] = phoneArray[phoneVendor] + 1;
			} else {
				phoneArray[phoneVendor] = 1;
			}

			amount++;
		} else {
			// console.log('Down');
		}
	});

	outp.amount = amount;
	outp.phones = phoneArray;

	return outp;	
}

function createPieChart(json) {
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback( () => {
		var data = new google.visualization.DataTable();

		data.addColumn('string', 'Vendor');
		data.addColumn('number', 'Amount');
		data.addRows(jsonArray(json));

		var windowWidth = document.body.clientWidth;

		if (windowWidth > 1000) {
			windowWidth = 1000;
		}

		var options = {'title':'Amount of phones at Varendonck College connected with \'Varendonck-Guests\' at 03-11-16',
					   'width': windowWidth,
					   'height': windowWidth - 100};

		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

		chart.draw(data, options);
	});
}

function createBarChart(json) {
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback( () => {
		var jsonArr = jsonArray(json);

		jsonArr.unshift(["Element", "Density"]);

		var data = google.visualization.arrayToDataTable(jsonArr);

		var view = new google.visualization.DataView(data);

		var windowWidth = document.body.clientWidth;

		if (windowWidth > 1000) {
			windowWidth = 1000;
		}

		var options = {
		  title: 'Amount of phones at Varendonck College connected with \'Varendonck-Guests\' at 03-11-16',
		  width: windowWidth,
		  height: windowWidth + 300,
		  bar: {groupWidth: "50%"},
		  legend: { position: "none" },
		};

		var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));

		chart.draw(view, options);
	});
}

function jsonArray(json) {
	var outp = [];

	for (var key in json) {
		var newArr = [];

		newArr.push(key);
		newArr.push(json[key]);

		outp.push(newArr);
	}

	return outp;
}