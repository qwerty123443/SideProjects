class BetterRegExp {
	constructor() {
		this.regExp = "";
		return this;
	}

	static startOfLine() {
		// this.regExp += "/";
		return this;
	}

	static endOfLine() {
		// this.regExp += "/";
		return this;
	}

	static build() {
		this.regExp = this.getExpression;
		return this;
	}

	static toString() {
		return this.regExp.toString();
	}

	get getExpression() {
		return new RegExp(this.regExp);
	}

	static then(val) {
		this.regExp += "(" + val + ")";
		return this;
	}

	static maybe(val) {
		this.regExp += "(" + val + ")?";
		return this;
	}

	static anythingBut(val) {
		this.regExp += `([^(${val})]*)`;
		return this;
	}

	static find(val) {
		this.regExp = new RegExp(val, 'g');
		return this;
	}

	static replace(str, replaceWith) {
		const isRegExp = this.regExp instanceof RegExp
		const isString = (typeof str).toLowerCase() == 'string' && (typeof replaceWith).toLowerCase() == 'string';

		if (isRegExp && isString)
			return str.replace(this.regExp, replaceWith);
		else {
			if (!isRegExp)
				return Error("You have to build the RegExp first.");
			else if (!isString)
				return Error("One or both of the subitted arguments is not a string.");
			else
				return Error("Something went wrong with evaluating the RegExp.");
		}
	}

	static test(str) {
		const isRegExp = this.regExp instanceof RegExp
		const isString = (typeof str).toLowerCase() == 'string';

		if (isRegExp && isString)
			return this.regExp.test(str);
		else {
			if (!isRegExp)
				return Error("You have to build the RegExp first.");
			else if (!isString)
				return Error("The subitted argument is not a string.");
			else
				return Error("Something went wrong with evaluating the RegExp.");
		}
	}
}




// const string = "https://google.com";
// const regEx = new BetterRegExp().startOfLine().then("http").maybe("s").then("://").maybe("www.").anythingBut(" ").endOfLine().build();

// console.log(regEx.test(string));

console.log(BetterRegExp.find('red').replace("I have a red house.", "blue"));