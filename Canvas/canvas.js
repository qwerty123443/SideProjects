let canvas;
let mouseX = 0;
let mouseY = 0;

function load() {
	setup();

	setTimeout(() => {
		const int = setInterval(draw, 1000 / 60);
	}, 100);
}

function resize() {
	let newH = 200;
	let newW = 'auto';

	if (canvas.origionalWidthAndHeight.h == 'auto') {
		newH = 'auto';
	}

	canvas.resize(newW, newH);
}

function mouse(evt) {
	mouseX = evt.x;
	mouseY = evt.y;
}

class Canvas {
	constructor(canvas, w, h) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.origionalWidthAndHeight = {w: w, h: h};

		this.backgroundColor = '#616161';

		if (w == '' || w == null) {
			w = 'auto';
		}

		if (h == '' || h == null) {
			h = 200;
		}

		this.width = w;
		this.height = h;

		this.resize(w, h);

		this.canvas.addEventListener('mousemove', mouse);
	}

	resize(w, h) {
		w = (w == 'auto' || w == null || w == '') ? window.innerWidth : w;
		h = (h == 'auto' || h == null || h == '') ? window.innerHeight : h;

		this.width = w;
		this.height = h;
		this.canvas.width = w;
		this.canvas.height = h;
	}

	point(x, y, color) {
		this.circle(x, y, 2, color);
	}

	circle(x, y, r, color) {
		if (!color) {
			color = 'rgb(0, 0, 255)';
		}

		if ((typeof color).toLowerCase() == 'object') {
			this.ctx.fillStyle = color.color;
		} else {
			this.ctx.fillStyle = color;
		}

		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		this.ctx.fill();
	}

	arc(x, y, r, deg, color, strokeWidth) {
		if (!color) {
			color = 'rgb(0, 0, 255)';
		}

		if ((typeof color).toLowerCase() == 'object') {
			this.ctx.strokeStyle = color.color;
		} else {
			this.ctx.strokeStyle = color;
		}

		this.ctx.beginPath();
		this.ctx.lineWidth = strokeWidth;
		this.ctx.arc(x, y, r, 1.5 * Math.PI, Math.radians(deg) - 1.5);
		this.ctx.stroke();
	}

	arcTo(x, y, x2, y2, deg, color, strokeWidth) {
		const r = x - x2;

		if (!color) {
			color = 'rgb(0, 0, 255)';
		}

		if ((typeof color).toLowerCase() == 'object') {
			this.ctx.strokeStyle = color.color;
		} else {
			this.ctx.strokeStyle = color;
		}

		this.ctx.beginPath();
		this.ctx.lineWidth = strokeWidth;
		this.ctx.arc(x, y, r / 4, Math.PI, 2 * Math.PI);
		this.ctx.stroke();
	}

	line(x, y, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}

	polygon(...vars) {
		for (let i = 0; i < vars.length - 2; i += 2) {
			this.circle(vars[i], vars[i + 1], 2);
			this.circle(vars[i + 2], vars[i + 3], 2);
			this.line(vars[i], vars[i + 1], vars[i + 2], vars[i + 3]);
		}

		this.line(vars[0], vars[1], vars[vars.length - 2], vars[vars.length - 1]);
	}

	dist(x, y, x2, y2) {
		const a = x - x2;
		const b = y - y2;

		return Math.sqrt(a * a + b * b);
	}

	background(color) {
		if (color) {
			this.backgroundColor = color;
		}

		if ((typeof color).toLowerCase() == 'object') {
			this.ctx.fillStyle = this.backgroundColor.color;
		} else {
			this.ctx.fillStyle = this.backgroundColor;
		}

		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	random2D() {
		const angle = Math.random() * Math.PI * 2;
		return new Vector(Math.cos(angle), Math.sin(angle));
	}
}

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	dist(x, y) {
		if ((typeof (x)).toLowerCase() == 'object') {
			const a = this.x - x.x;
			const b = this.y - x.y;
			return Math.sqrt(a * a + b * b);
		} else {
			const a = this.x - x;
			const b = this.y - y;
			return Math.sqrt(a * a + b * b);
		}
	}

	mult(n) {
		this.x *= n || 0;
		this.y *= n || 0;
		this.z *= n || 0;

		return this;
	}
}

class Color {
	constructor(color) {
		this.type = null;
		this.color = color;

		if (this.color[0] == '#') {
			this.type = 'HEX';
		} else if (this.color.substring(0, 3) == 'rgb') {
			this.type = 'RGB';
		} else {
			console.error(this.color + ' is not HEX or RGB');
		}
	}

	convertToHex() {
		let rgb = this.color;

		rgb = rgb.match(/^rgba?\((\d+),\s?(\d+),\s?(\d+)(,\s?(.*))\)$/);

		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}

		this.color = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		this.type = 'HEX';
		return this;
	}

	convertToRGB() {
		let c;
		const hex = this.color;

		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');

			if(c.length == 3){
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}

			c = '0x' + c.join('');

			this.type = 'RGB';
			this.color = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
			return this;
		}

		throw new Error('Bad Hex');
	}

	toObject() {
		if (this.type == 'HEX') {
			this.convertToRGB();
		}

		const result = this.color.match(/^rgba?\((\d+),\s?(\d+),\s?(\d+)(,\s?(.*))\)$/);

		return {r: result[1], g: result[2], b: result[3], a: result[5]};
	}

	opacity(opacity) {
		const object = this.toObject();

		object['a'] = opacity;

		this.color = `rgba(${object['r']}, ${object['g']}, ${object['b']}, ${object['a']})`;
		return this;
	}
}

Array.prototype.remove = function(search) {
	const arr = this;

	arr.forEach((object, key) => {
		if (object == search) {
			arr.splice(key, 1);
		}
	});

	return arr;
}

Number.prototype.map = function(start1, stop1, start2, stop2) {
	return ((this - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

window.onload = load;
window.onresize = resize;