HTMLElement.prototype.touch = function(handler) {
	let startX = null;
	let deltaX = null;

	this.addEventListener('touchstart', evt => {
		startX = evt.targetTouches[0].pageX;
		this.addEventListener('touchmove', listener, false);
	}, false);

	this.addEventListener('mousedown', evt => {
		startX = evt.pageX;
		this.addEventListener('mousemove', listener);
	}, false);

	this.addEventListener('mouseup', evt => {
		startX = null;
		deltaX = null;
		this.removeEventListener('mousemove', listener);
	}, false);

	function listener(evt) {
		deltaX = evt.pageX - startX || evt.targetTouches[0].pageX - startX;

		const outp = {
			event: evt,
		}

		if (Math.abs(deltaX) >= 100) {
			if (deltaX > 0) {
				outp.dir = 'right';
				handler(outp);
				return true;
			} else if (deltaX < 0) {
				outp.dir = 'left';
				handler(outp);
				return true;
			}
		}
	}
};