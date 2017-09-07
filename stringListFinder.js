function checkForList(string, availableTags) {
	let index = 0;
	let prevKey = 0;
	let prevIndex = 0;
	let lastIndentation = 0;

	const listArr = [];

	function checkIndentation(str) {
		const match = str.match(/^(\s+)(.+)$/);

		if (match) {
			if (match[1])
				return match[1].length;
			else
				return 0;
		} else return 0;
	}

	function colorFromIndex(number, maxIndex) {
		maxIndex++;

		Number.prototype.map = function(startMin, startMax, endMin, endMax) {
			return (this / (startMax - startMin)) * (endMax - endMin) + endMin;
		}

		return `hsl(215, 100%, ${100 - (number / maxIndex * 100)}%)`;
	}

	string.split('<br>').forEach(function(object, key) {
		if (!availableTags)
			availableTags = ['-', '*', '+', '#'];

		const regEx = new RegExp(`^((\\s+)?(${availableTags.map(val => {return '\\' + val}).join('|')})(\\s+)?)(.+)`);

		const indentation = checkIndentation(object);
		const strArr = object.match(regEx);

		if (lastIndentation < indentation)
			index++;
		else if (lastIndentation > indentation)
			index--;

		lastIndentation = indentation;

		if (strArr) {
			if (key == prevKey + 1) {
				if (listArr[listArr.length - 1] instanceof Array)
					listArr[listArr.length - 1].push({index: index, array: strArr});
				else
					listArr.push([{index: index, array: strArr}]);
			} else {
				listArr.push([{index: index, array: strArr}]);
			}

			prevKey = key;
		} else if (object != '') {
			listArr.push(object);
		}
	});

	listArr.forEach(function(object, key) {
		if (Array.isArray(object)) {
			let str = '';
			let list = '<ul>';

			const maxIndex = Math.max.apply(Math, object.map(val => {return val.index}));

			object.forEach(function(object, key) {
				let val = object.array[5];

				if (val.trim().startsWith('✔'))
					val = '<strike>' + val + '</strike>';

				if (object.index > prevIndex) {
					list += '<ul>';
					prevIndex++;
				} else if (object.index < prevIndex) {
					list += '</ul>';
					prevIndex--;
				}

				list += `<li style="background-color: ${colorFromIndex(prevIndex, maxIndex)}">${val}</li>`;
			});

			list += '</ul>';

			object.forEach(function(object, key) {
				str += object.array[0] + '<br>';
			});

			str = str.slice(0, -4);
			string = string.replace(str, list);
		} else if (!object.match(/<(.+)>(.+)<\/(\w+)>/)) {
			string = string.replace(object, '<p>' + object + '</p>');
		}
	});

	return string;
}

const str = `Test<br>- List item 1<br>- List item 2<br>  - List indexed<br>Word`;

document.body.querySelector('div').innerHTML = checkForList(str);