class PopUp {
	constructor(animation) {
		const mainDiv = document.createElement('div');

		this.opened = false;
		this.mainDiv = mainDiv;
		this.animation = animation;

		mainDiv.jsonStyle({
			'top': '0px',
			'left': '0px',
			'opacity': '0',
			'width': '100%',
			'height': '100%',
			'display': 'none',
			'z-index': '1000',
			'position': 'fixed',
			'background-color': 'rgba(0, 0, 0, 0.8)'
		});

		/* Animation stuff */
		if (animation) {
			if (!animation.duration) {
				this.animation.duration = 1000;
				console.warn('Animation duration is not set, setting to default.');
			}

			if (!animation.timingFunction) {
				this.animation.timingfunction = 'ease';
				console.warn('Animation timingfunction is not set, setting to default.');
			}

			mainDiv.jsonStyle({
				'transition': `opacity ${animation.duration / 1000}s ${animation.timingFunction}`
			});
		} else {
			mainDiv.jsonStyle({
				'transition': 'opacity 1s ease'
			});
		}
		/*		*/

		mainDiv.onclick = () => {
			this.close();
		};

		document.body.appendChild(mainDiv);
	}

	show() {
		return new Promise((resolve, reject) => {
			this.mainDiv.jsonStyle({
				'display': 'block',
			});

			requestAnimationFrame(() => {
				this.mainDiv.jsonStyle({
					'display': 'block',
					'opacity': '1'
				});
			});

			this.opened = true;

			setTimeout(resolve, this.animation.duration + 10);
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.mainDiv.jsonStyle({
				'opacity': '0',
			});

			setTimeout(() => {
				this.mainDiv.jsonStyle({
					'display': 'none'
				});

				this.opened = false;

				resolve('Timeout done');
			}, this.animation.duration + 10);
		});
	}

	delete() {
		this.close().then(() => {
			document.body.removeChild(this.mainDiv);
		});
	}
}