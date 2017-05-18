// ** TODO **

// - Add other event listeners
// - Add animation support
// - Add styles support (for buttons)


class Toast {
	constructor(stayTime, animation, styles, debug) {
		this.debug = debug;
		this._error = false;

		if (debug == null || debug == undefined) this.debug = true;

		if (stayTime < 0) {
			console.error('Toast stay time is lower than 1');
			this._error = true;
			debugger;
			return;
		} else {
			if (!stayTime) {
				stayTime = 2000;
				if (this.debug) console.warn('Toast stay time is not set, resetting to default');
			}

			this.styles = styles;
			this.stayTime = stayTime;
			this.animation = animation;

			if (!animation) {
				if (this.debug)
					console.log('Toast animation is not set, resetting to default');
				this.animation = {fadeTime: 100, speedCurve: 'ease', type: 'opacity'};
			}

			this._toastContainer = document.createElement('div');
			this._toastContainer.style.right = '20px';
			this._toastContainer.style.bottom = '20px';
			this._toastContainer.style.position = 'fixed';
			this._toastContainer.style.transition = 'all 1s ease';

			// Styles
			if (styles) {
				// Set position
				switch (styles.position) {
					case 'topLeft':
					this._toastContainer.style.top = '20px';
					this._toastContainer.style.left = '20px';
					break;
					case 'topRight':
					this._toastContainer.style.top = '20px';
					this._toastContainer.style.right = '20px';
					break;
					case 'bottomLeft':
					this._toastContainer.style.left = '20px';
					this._toastContainer.style.bottom = '20px';
					break;
					case 'bottomRight':
					this._toastContainer.style.right = '20px';
					this._toastContainer.style.bottom = '20px';
					break;
					default:
					this._toastContainer.style.right = '20px';
					this._toastContainer.style.bottom = '20px';
					break;
				}
			}

			document.body.appendChild(this._toastContainer);
		}
	}

	toast(text, buttons) {
		if (!this._error) {
			if (text) {
				let toast = document.createElement('div');

				toast.style.color= 'white';
				toast.style.minWidth = '100px';
				toast.style.maxWidth = '300px';
				toast.style.maxHeight = '100px';
				toast.style.textAlign = 'left';
				toast.style.marginTop = '10px';
				toast.style.overflow = 'hidden';
				toast.style.padding = '10px 20px';
				toast.style.transition = 'all 1s ease';
				toast.style.backgroundColor = '#3B3B4F';
				toast.style.fontFamily = "'Roboto', sans-serif";
				toast.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.6)';

				// Animation request
				if (this.animation) {
					if (this.animation.fadeTime == null || this.animation.fadeTime <= 0) {
						if (this.debug) console.warn('Animation time is not set, resetting to default');
					} else if (!this.animation.speedCurve) {
						if (this.debug) console.warn('Animation speed curve is not set, resetting to default');
					} else if (!this.animation.type) {
						if (this.debug) console.warn('Animation type is not set, resetting to default');
					}

					const type = this.animation.type;
					const speedCurve = this.animation.speedCurve;
					const time = Math.floor(this.animation.fadeTime / 1000);

					toast.style.transition = `all ${time}s ${speedCurve} !important`;

					switch (type) {
						case 'bottom':
						toast.style.bottom = '-110%';
						break;
						case 'opacity':
						toast.style.opacity = '0';
						break;
						default:
						toast.style.opacity = '0';
						if (this.debug) console.log('Animation type is not correct, resetting to default');
						break;
					}
				} else {
					toast.style.opacity = '0';
				}

				let textElem = document.createElement('p');

				textElem.title = text;
				textElem.innerText = text;

				if (text.length > 100) {
					textElem.style.overflow = 'hidden';
				} else {
					textElem.style.overflow = 'initial';
				}

				textElem.style.maxWidth = '100%';
				textElem.style.whiteSpace = 'nowrap';
				textElem.style.display = 'inline-block';
				textElem.style.textOverflow = 'ellipsis';

				toast.appendChild(textElem);

				// Buttons
				if (buttons && buttons.length > 0) {
					this.stayTime = 'infinite';
					let buttonDiv = document.createElement('div');

					buttonDiv.style.marginLeft = '10px';
					buttonDiv.style.display = 'inline-block';

					buttons.forEach((object, key) => {
						if (object.name) {
							let button = document.createElement('button');

							button.style.border = 'none';
							button.style.fontSize = '100%';
							button.style.cursor = 'pointer';
							button.style.color = 'lightblue';
							button.style.background = 'none';

							// Onclick
							if (object.onclick == 'closeToast') {
								button.addEventListener('click', () => {
									this.remove(toast);
								}, false);
							} else {
								button.addEventListener('click', evt => {
									this.remove(toast);
									if (object.onclick) object.onclick(evt);
								}, false);
							}

							// Events
							if (object.events) {
								for (key in object.events) {
									button.addEventListener(key, evt => {
										this.remove(toast);
										object.events[key](evt);
									}, false);
								}
							}

							button.innerText = object.name;

							buttonDiv.appendChild(button);
						} else {
							if (this.debug) console.error('Button name not set');
						}
					});

					toast.appendChild(buttonDiv);
				}

				// Styles
				if (this.styles) {
					toast.style.color = this.styles.textColor;
					toast.style.backgroundColor = this.styles.color;

					if (!this.styles.textColor) {
						toast.style.color = 'white';
						console.warn('Toast color is not set, resetting to default');
					}

					if (!this.styles.color) {
						toast.style.backgroundColor = '#3B3B4F';
						if (this.debug) console.warn('Toast background color is not set, resetting to default');
					}
				}

				this._toastContainer.appendChild(toast);

				// Animation
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(() => {
						if (this.animation.type) {
							switch (this.animation.type) {
								case 'bottom':
								toast.style.bottom = '0px';
								break;
								case 'opacity':
								toast.style.opacity = '1';
								break;
								default:
								toast.style.opacity = '1';
								if (this.debug) console.log('Animation type is not correct, resetting to default');
								break;
							}
						} else {if (this.debug) console.warn('Animation type is not correct'); toast.style.opacity = '1';}

						if (this.stayTime == 'infinite') {
							if (this.debug) console.log('Toast will stay forever, unless the remove function is called');
						} else {
							setTimeout(() => {
								this.remove(toast);
							}, this.stayTime);
						}
					});
				});
			} else {
				if (this.debug) console.error('Toast text is not set');
			}
		} else {
			if (this.debug) console.error('There was a previous error');
		}

		return this;
	}

	remove(toast) {
		toast.style.opacity = '0';

		setTimeout( () => {
			try {
				this._toastContainer.removeChild(toast);
			} catch (err) {if (this.debug) console.log('Toast was already removed, or an error occured')}
		}, 1100);
	}
}