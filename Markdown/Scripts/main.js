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
				const regex = /\[(.+)\](\(((https?|\/)(\:|\/|\w+|\.|\?|\&)+)\))?/;

				if (object.match(regex)[3])
					val = object.replace(regex, '<a target="_blank" href="$3">$1</a>');
				else
					val = object.replace(regex, '<a target="_blank" href="$1">$1</a>');

				markdown = markdown.replace(object, val);
			}
		});

		return markdown;
	}

	function codeBlock(markdown) {
		let str = markdown.replace(new RegExp(splitStr, 'g'), '\n');

		const regEx = /(```(.+)```|((```)(\w+)?)\n((.+|\n+)+)\n(```))/;
		const match = str.match(new RegExp(regEx, 'g'));

		if (match) {
			match.forEach((object, key) => {
				const match = object.match(regEx);

				console.log(match);

				if (match[6]) {
					// str = str.replace(match[0], `<code type="${match[3]}">${match[4].replace(/\n/g, '<br>')}</code>`);
					str = str.replace(match[0], `<pre><code class="${match[5]} hljs">${match[6].replace(/\n/g, '<br>')}</code></pre>`);
				} else {
					str = str.replace(match[0], `<code>${match[2]}</code>`);
				}
			});
		}

		return str.replace(/\n/g, splitStr);
	}



	string = string.replace(/\n/g, splitStr);

	string = astrixes(string);
	string = headings(string);
	string = horLn(string);
	string = links(string);
	string = codeBlock(string);
	string = lists(string);

	string = string.replace(new RegExp(splitStr + splitStr, 'g'), '<br>');
	string = string.replace(new RegExp(splitStr, 'g'), '');

	return string;
}