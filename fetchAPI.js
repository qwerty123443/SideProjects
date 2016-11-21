function get(url, responseType) {
	return new Promise( (resolve, reject) => {
		var req = new XMLHttpRequest();

		req.open('GET', url);

		req.onload = function() {
			if (req.status == 200) {
				resolve(responseProcess(req.response, responseType));
			}
			else {
				reject(Error(req.statusText));
			}
		};

		req.onerror = function() {
			reject(Error("Network Error"));
		};

		req.send();
	});
}

function responseProcess(response, responseType) {
	switch (responseType) {
		case 'text':
			return response;
			break;
		case 'json':
			return JSON.parse(response)
			break;
		default:
			return response;
			break;
	}
}
