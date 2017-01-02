class PopUp {
	constructor(animation) {
		const mainDiv = document.createElement('div');

		this.opened = false;
		this.mainDiv = mainDiv;
		this.buttonTimeouts = [];
		this.animation = animation;
		this.buttonClicked = false;

		mainDiv.jsonStyle({
			'top': '0px',
			'left': '0px',
			'opacity': '0',
			'width': '100%',
			'height': '100%',
			'z-index': '100',
			'display': 'none',
			'position': 'fixed',
			'background-color': 'rgba(0, 0, 0, 0.8)'
		});

		/* Animation stuff */
		if (animation) {
			if (!animation.duration) {
				this.animation.duration = 500;
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
				'transition': 'opacity 0.5s ease'
			});
		}
		/*		*/

		mainDiv.onclick = () => {
			setTimeout(() => {
				if (!this.buttonClicked) {
					this.close();
				}
			}, 1);
		};

		document.body.appendChild(mainDiv);
	}

	show(title, text, buttons) {
		return new Promise((resolve, reject) => {
			if (!title) {
				reject('Title is not set');
			} else if (!text) {
				reject('Text is not set');
			} else {
				const div = document.createElement('div');
				const h2 = document.createElement('h2');
				const p = document.createElement('p');

				const divWidth = 60;
				const divHeight = 20;

				p.innerText = text;
				h2.innerText = title;

				div.jsonStyle({
					'z-index': '1000',
					'overflow': 'hidden',
					'padding': '5px 20px',
					'position': 'absolute',
					'border-radius': '5px',
					'width': divWidth + '%',
					'height': divHeight + '%',
					'font-family': '\'Arial\'',
					'background-color': 'white',
					'left': (100 - divWidth) / 2 + '%',
					'top': (100 - divHeight) / 2 + '%',
					'box-shadow': '0px 0px 20px rgba(0, 0, 0, 0.8)',
				});

				p.jsonStyle({
					'width': '100%',
					'overflow': 'hidden',
					'text-overflow': 'ellipsis'
				});

				h2.jsonStyle({
					'width': '100%',
					'overflow': 'hidden',
					'text-overflow': 'ellipsis',
					'border-bottom': '1px rgba(0, 0, 0, 0.2) solid'
				});

				div.appendChild(h2);
				div.appendChild(p);

				if (buttons) {
					const buttonDiv = document.createElement('div');

					buttonDiv.jsonStyle({
						'float': 'right',
					});

					buttons.forEach((object, key) => {
						if (object.name) {
							const button = document.createElement('button');

							button.jsonStyle({
								'border': 'none',
								'color': 'white',
								'margin': '0 5px',
								'font-size': '100%',
								'cursor': 'pointer',
								'padding': '2px 5px',
								'background': 'none',
								'border-radius': '5px',
								'background-color': '#999999',
							});

							// Onclick
							if (object.onclick == 'closePopUp') {
								button.addEventListener('click', evt => {
									this.buttonTimeouts.forEach((object, key) => {
										clearInterval(object);
									});

									this.buttonClicked = true;
									this.close();

									const timeout = setTimeout(() => {
										this.buttonClicked = false;
									}, 5);

									this.buttonTimeouts.push(timeout);
								}, false);
							} else {
								button.onclick = evt => {
									this.buttonTimeouts.forEach((object, key) => {
										clearInterval(object);
									});

									this.buttonClicked = true;
									object.onclick();

									const timeout = setTimeout(() => {
										this.buttonClicked = false;
									}, 5);

									this.buttonTimeouts.push(timeout);
								}
							}

							button.innerText = object.name;

							buttonDiv.appendChild(button);
						} else {
							console.error('Button name not set');
						}
					});

					div.appendChild(buttonDiv);
				}

				this.mainDiv.appendChild(div);

				this.mainDiv.jsonStyle({
					'display': 'block',
				});

				requestAnimationFrame(() => {
					setTimeout(() => {
						this.mainDiv.jsonStyle({
							'display': 'block',
							'opacity': '1'
						});
					}, this.animation.duration);
				});

				this.opened = true;

				setTimeout(resolve, this.animation.duration + 10);
			}
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