function parseMKWN(string) {
	const splitStr = '%{{split}}%';

	function lists(markdown) {
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

		markdown.split(splitStr).forEach(function(object, key) {
			const indentation = checkIndentation(object);
			const strArr = object.match(/^((\s+)?(\+|\*|\-)(\s+)?)(.+)/);

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

					if (object.index > prevIndex) {
						list += '<ul>';
						prevIndex++;
					} else if (object.index < prevIndex) {
						list += '</ul>';
						prevIndex--;
					}

					list += `<li>${val}</li>`;
				});

				list += '</ul>';

				object.forEach(function(object, key) {
					str += object.array[0] + splitStr;
				});

				str = str.slice(0, splitStr.length * -1);
				markdown = markdown.replace(str, list);
			/*} else if (!object.match(/<(.+)>(.+)<\/(\w+)>/)) {
				if (object.trim().length > 0)
					markdown = markdown.replace(object, '<p>' + object + '</p>');*/
			} else {
				if (object != '<hr>')
					markdown = markdown.replace(object, `<p>${object}</p>`);
			}
		});

		return markdown;
	}

	function astrixes(markdown) {
		function bold(str) {
			str.split(splitStr).forEach((object, key) => {
				object.split(/\s+/).forEach((object, key) => {
					const val = object.match(/\*\*(.+)\*\*/);

					if (val)
						str = str.replace(val[0], `<b>${val[1]}</b>`);
				});
			});

			return str;
		}

		function italic(str) {
			str.split(splitStr).forEach((object, key) => {
				object.split(/\s+/).forEach((object, key) => {
					const val = object.match(/\*(.+)\*/);

					if (val)
						str = str.replace(val[0], `<i>${val[1]}</i>`);
				});
			});

			return str;
		}

		markdown = bold(markdown);
		markdown = italic(markdown);

		return markdown;
	}

	function headings(markdown) {
		markdown.split(splitStr).forEach((object, key) => {
			if (object.startsWith('#')) {
				const match = object.match(/(\#+)(.+)/);

				if (match[1].length <= 5)
					markdown = markdown.replace(match[0], `<h${match[1].length}>${match[2].trim()}</h${match[1].length}>`);
				else
					console.warn(`Cannot have H tags larger than five in: '${object}'`);
			}
		});

		return markdown;
	}

	function horLn(markdown) {
		markdown.split(splitStr).forEach((object, key) => {
			if (object.startsWith('--'))
				markdown = markdown.replace(/(\-)+/, '<hr>');
		});

		return markdown;
	}

	function links(markdown) {
		markdown.split(splitStr).forEach((object, key) => {
			let val = '';

			if (object.match(/\[(.+)\](\((.+)\))?/)) {
				const regex = /\[(.+)\](\((.+)\))?/;

				if (object.match(regex)[3])
					val = object.replace(regex, '<a target="_blank" href="$3">$1</a>');
				else
					val = object.replace(regex, '<a target="_blank" href="$1">$1</a>');

				markdown = markdown.replace(object, val);
			}
		});

		return markdown;
	}

	/*function rest(markdown) {
		const arr = markdown.split('<br>');

		arr.forEach((object, key) => {
			// object = object.replace('  ', '<br>');

			// Headings
			if (object.match(/(##?#?#?#?#?)\s(.+)/)) {
				const val = object.match(/(##?#?)\s?(.+)/);

				if (val[1].length < 7) {
					object = object.replace(val[0], `<h${val[1].length}>${val[2]}</h${val[1].length}>`);
				} else {
					console.error('Can\'t have more than three # signs');
				}
				// HR
			} else if (object.match(/^(--+)$/)) {
				object = object.replace(/-+/, '<hr>');
				// Code block
			} else if (object.match(/\`(.+)\`/)) {
				object = object.replace(/\`(.+)\`/, `<code>$1</code>`);
				// Crossed out text
			} else if (object.match(/(\~\~)(.+)(\~\~)/)) {
				object = object.replace(/(\~\~)(.+)(\~\~)/, `<del>$2</del>`);
				// Bold text
			} else if (object.match(/(\*\*|\_\_)(.+)(\*\*|\_\_)/)) {
				object = object.replace(/(\*\*)(.+)(\*\*)/, `<b>$2</b>`).replace(/(\_\_)(.+)(\_\_)/, `<b>$2</b>`);
				// Italic text
			} else if (object.match(/(\*|\_)(.+)(\*|\_)/)) {
				object = object.replace(/(\*)(.+)(\*)/, `<i>$2</i>`).replace(/(\_)(.+)(\_)/, `<i>$2</i>`);
				// Links
			} else if (object.match(/\[(.+)\](\((.+)\))?/)) {
				const regex = /\[(.+)\](\((.+)\))?/;

				if (object.match(regex)[3])
					object = object.replace(regex, '<a href="$3">$1</a>');
				else
					object = object.replace(regex, '<a href="$1">$1</a>');
			} else if (object.match(/^\s+$/) || object.length < 1) {
					// object = '<br>';
					// Maybe add this back in some other way
				} else {
					object = `<p>${object}</p>`;
				}

				// object = object.replace(' ', '&nbsp;');
				arr[key] = object;
			});

		return arr.reduce((one, two) => {
			return one + two;
		});
	}*/

	string = string.replace(/\n/g, splitStr);

	string = astrixes(string);
	string = headings(string);
	string = horLn(string);
	string = links(string);
	string = lists(string);

	string = string.replace(new RegExp(splitStr + splitStr, 'g'), '<br>');
	string = string.replace(new RegExp(splitStr, 'g'), '');

	return string;
}