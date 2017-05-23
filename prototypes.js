const Prototypes = {};

// So you don't have to type Prototype out everytime
const P = Prototypes;

/* Array */
Array.prototype.contains = function(string) {
	return this.indexOf(string) >= 0 ? true : false;
};

Array.prototype.search = function(string, caseSensitive) {
	let regEx = new RegExp(string, 'gi');

	if (caseSensitive) {
		regEx = new RegExp(regEx, 'g');
	}

	return regEx.exec(this);
};

Array.prototype.random = function() {
	const arr = this;

	return arr[Math.floor(Math.random() * arr.length)];
}

Array.prototype.randomize = function() {
	return Prototypes.randomizeArray(this);
}

Array.prototype.shuffle = function() {
	return Prototypes.randomizeArray(this);
}

Array.prototype.remove = function(search) {
	this.forEach((object, key) => {
		if (object == search) {
			this.splice(key, 1);
		}
	});

	return this;

	// return this.filter(elem => {return elem != search;});
}

// Quickest way to sort (the native sort function is still faster tho)
Array.prototype.quickSort = function() {
	if (this.length <= 1) {
		return this;
	}

	const pivotPos = Math.floor(this.length / 2);
	const pivotValue = this[pivotPos];

	let less = [];
	let more = [];
	let same = [];

	for (let i = 0; i < this.length; i++) {
		if (this[i] === pivotValue) {
			same.push(this[i]);
		} else if (this[i] < pivotValue) {
			less.push(this[i]);
		} else {
			more.push(this[i]);
		}
	}

	return less.quickSort().concat(same, more.quickSort());
};

Array.prototype.max = function() {
	let rec = 0;

	this.forEach((object, key) => {
		if ((typeof object).toLowerCase() == 'number') {
			if (object > rec) rec = object;
		}
	});
}

/* Strings */
String.prototype.remove = function(substring, caseSensitive) {
	let regEx = new RegExp(substring, 'gi');

	if (caseSensitive) {
		regEx = new RegExp(regEx, 'g');
	}

	return this.replace(regEx, '');
	// return this.replace(substring, '');
};

String.prototype.random = function() {
	return this.split('').randomize().reduce((one, two) => {
		return one + two;
	});
}

String.prototype.advancedSearch = function(substr, caseSensitive) {
	let regEx = new RegExp(substr, 'g');

	if (caseSensitive) {
		regEx = new RegExp(regEx, 'g');
	} else {
		regEx = new RegExp(regEx, 'gi');
	}

	return [regEx, regEx.exec(this)];
};

String.prototype.isEmpty = function() {
	return this.length < 0 || this == null || this == '';
};

String.prototype.findList = function(listQualifiers) {
	let prevKey = 0;
	let regEx = /-(\s+)?(.+)/;

	const listArr = [];

	if (listQualifiers instanceof RegExp) {
		regEx = listQualifiers;
	} else if (Array.isArray(listQualifiers)) {
		let string = '(';
		const arr = ['+', '-', '*'];

		arr.forEach((object, key) => {
			string += '\\' + object + '|';
		});

		string = string.slice(0, -1);
		string += ')(\s+)?(.+)';

		listQualifiers = new RegExp(string);
	} else if ((typeof listQualifiers).toLowerCase() == 'string') {
		const listSlplit = '-';
		const regText = listSlplit + '(\s+)?(.+)';

		listQualifiers = new RegExp(regText);
	} else {
		console.warn('No valid list qualifiers given');
	}

	this.split('\n').forEach((object, key) => {
		const strArr = object.match(regEx);

		if (strArr) {
			if (key == prevKey + 1) {
				listArr[listArr.length - 1].push(strArr[2]);
			} else {
				listArr.push([strArr[2]]);
			}

			prevKey = key;
		}
	});

	return listArr;
};

String.random = function(length) {
	let newStr = '';
	const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	for (let i = 0; i < length; i++) {
		newStr += chars.random();
	}

	return newStr;
}

/* Numbers */
/*
- beginningNumber(minCurrentRange, maxCurrentRange, minTargetRange, maxTargetRange)
- https://p5js.org/reference/#/p5/map
*/
Number.prototype.map = function(startMin, startMax, endMin, endMax) {
	return (this / (startMax - startMin)) * (endMax - endMin) + endMin;
}

Number.prototype.pow = function(pow) {
	return Math.pow(this, pow);
}

Number.prototype.between = function(a, b) {
	let min = Math.min.apply(Math, [a, b]);
	let max = Math.max.apply(Math, [a, b]);

	return this > min && this < max;
};

Number.prototype.factorial = function() {
	return factorial(this);
};

Number.prototype.constrain = function(low, high) {
	return Math.max(Math.min(this, high), low);
};

/* Boolean */
Boolean.random = function() {
	return Math.random() >= 0.5;
}

Boolean.rectCircleColliding = function(circle, rect) {
	return Prototypes.rectCircleColliding(circle, rect);
}


/* Object */
Object.prototype.copy = function() {
	const newObj = {};

	for (key in this) {
		newObj[key] = this[key];
	}

	return newObj;
}

/* HTML Elements */
HTMLElement.prototype.jsonStyle = function(json) {
	for (key in json) {
		// For some weird reason the for loop returns jsonStyle. I don't know why, someone please explain me.
		if (key !== 'jsonStyle') {
			// Converting the - character
			const regEx = /(.+)-(.+)/g;
			const regexArray = regEx.exec(key);

			if (regexArray) {
				this.style[regexArray[1] + regexArray[2].charAt(0).toUpperCase() + regexArray[2].slice(1)] = json[key];
			} else {
				this.style[key] = json[key];
			}
		}
	}

	return this;
};

/* URL */
Location.prototype.getAttributes = function() {
	const json = {};
	const url = window.location.search.substr(1);

	url.split('&').forEach((object, key) => {
		const regEx = /^(.+)=(.+)$/;
		const values = regEx.exec(object);

		let name = values[1];
		let value = values[2];

		json[name] = value;
	});

	return json;
}
// Use like: location.getAttributes()

/* Math */
Math.factorial = function(num) {
	return Prototypes.factorial(num);
};

Math.toRadians = function(degrees, pointUp) {
	if (pointUp) return (degrees - 90) * Math.PI / 180;
	else return degrees * Math.PI / 180;
};

Math.toDegrees = function(radians, pointUp) {
	if (pointUp) return (radians * 180 / Math.PI) - 90;
	else return radians * 180 / Math.PI;
};

Math.randomBetween = function(min, max, floor) {
	const randVal = Math.random() * (max - min + 1) + min;

	if (floor) return Math.floor(randVal);
	else return randVal;
}

Math.rectCircleColliding = function(circle, rect) {
	return Prototypes.rectCircleColliding(circle, rect);
}

/* Console */
console.colorLog = function(message, color) {
	color = color || "black";

	switch (color) {
		case "success":
		color = "Green";
		break;
		case "info":
		color = "DodgerBlue";
		break;
		case "error":
		color = "Red";
		break;
		case "warning":
		color = "Orange";
		break;
		default:
		color = color;
	}

	console.log("%c" + message, "color:" + color);
}

/* Universal functions */
Prototypes.factorial = num => {
	if ((typeof num).toLowerCase() == 'number') {
		if (num > 1) {
			let rval = 1;

			for (let i = 2; i <= num; i++)
				rval = rval * i;
			return rval;
		} else return num;
	} else {
		return;
	}
}

Prototypes.randomizeArray = array => {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

Prototypes.loop = (func, amount) => {
	for (let i = 0; i < amount; i++) {
		func(i);
	}
}

Prototypes.absoluteRand = function(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}

	return Math.randomBetween(min, max, true);
}


// Use like Prototypes.IF([**Some true or false expresson (x < 1)**], [**function**]);
// If the function array is smaller than the statements array than the rest of the statements will be executed with the last function in the functions arry
Prototypes.IF = function(statements, func) {
	if (statements.length > func.length) {
		statements.forEach((object, key) => {
			if (func.length - 1 >= key) {
				if (object) func[key]({
					statement: object,
					index: key,
					function: func[key]
				});
			} else {
				if (object) func[func.length - 1]({
					statement: object,
					index: key,
					function: func[key]
				});
			}
		});
	} else {
		statements.forEach((object, key) => {
			if (object) func[key]({
				statement: object,
				index: key,
				function: func[key]
			});
		});
	}

	return {statements: statements, functions: func};
}

Prototypes.rectCircleColliding = function(circle, rect) {
	const distX = Math.abs(circle.x - rect.x - rect.w / 2);
	const distY = Math.abs(circle.y - rect.y - rect.h / 2);

	if (distX > (rect.w / 2 + circle.r)) return false;
	if (distY > (rect.h / 2 + circle.r)) return false;

	if (distX <= (rect.w/2)) return true;
	if (distY <= (rect.h/2)) return true;

	const dx = distX - rect.w / 2;
	const dy = distY - rect.h / 2;
	return (dx * dx + dy * dy <= (circle.r * circle.r));
}