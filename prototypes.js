Array.prototype.contains = function(string) {
	if (this.indexOf(string) >= 0) {
		return true;
	} else {
		return false;
	}
};

String.prototype.remove = function(substring) {
	return this.replace(substring, '');
};

/*
- beginningNumber(minCurrentRange, maxCurrentRange, minTargetRange, maxTargetRange)
- https://p5js.org/reference/#/p5/map
*/
Number.prototype.map = function(start1, stop1, start2, stop2) {
	return ((this - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

Number.prototype.between = function(a, b) {
	let min = Math.min.apply(Math, [a, b]);
	let max = Math.max.apply(Math, [a, b]);

	return this > min && this < max;
};