const querystring = require('querystring');
const express = require('express');
const app = express();
const port = 8000;

let last;

app.get('/', (request, response) => {
	const url = request.url;

	console.log('Got a request for ' + url);

	if (last) {
		if (last.ct)
			response.send(`<html><body style="background-color: ${objectToColorString(colorTemperatureToRGB(last.ct))}">Last Req: ${JSON.stringify(last)}</body></html>`);
		else response.send('Last Req: ' + JSON.stringify(last) + '.');
	} else response.send('No POST req yet...');
});

app.post('*', (request, response) => {
	let body = '';

	request.on('data', data => {
		body += data;

		if (body.length > 1e6) {
			request.send({success: false, err: 'The amount of data is to high', info: 'The connection was destroyed because the amount of data passed is to much'});
			request.connection.destroy();
		}
	});

	request.on('end', () => {
		const url = querystring.unescape(request.url);
		const obj = {};

		url.substr(url.indexOf('?') + 1).split('&').forEach((object, key) => {
			const vals = object.split('=');
			obj[vals[0]] = vals[1];
		});

		last = obj;
		console.log('Got a POST request', url);
		console.log('-----------------------------------');
		response.send('THANKS\n');
	});
});

app.use(express.static(__dirname));
app.listen(port.toString());

console.log('Server is running on port ' + port);




function objectToColorString(obj) {
	return `rgb(${Object.entries(obj).map(val => {return Math.round(val[1])}).join(', ')})`;
}


// From http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
function colorTemperatureToRGB(kelvin){
	const temp = kelvin / 100;
	let red, green, blue;

	if (temp <= 66) {
		red = 255;
		green = temp;
		green = 99.4708025861 * Math.log(green) - 161.1195681661;

		if (temp <= 19) blue = 0;
		else {
			blue = temp-10;
			blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
		}
	} else {
		red = temp - 60;
		red = 329.698727446 * Math.pow(red, -0.1332047592);
		green = temp - 60;
		green = 288.1221695283 * Math.pow(green, -0.0755148492 );
		blue = 255;
	}

	return {
		r : clamp(red,   0, 255),
		g : clamp(green, 0, 255),
		b : clamp(blue,  0, 255)
	}


	function clamp(x, min, max) {
		if(x < min) return min;
		else if(x > max) return max;
		else return x;
	}
}

//