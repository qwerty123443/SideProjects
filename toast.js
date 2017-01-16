// ** TODO **

// - Add other event listeners
// - Add animation support
// - Add styles support (for buttons)


class Toast {
	constructor(stayTime, animation, styles) {
		this._error = false;

		if (stayTime < 0) {
			console.error('Toast stay time is lower than 1');
			this._error = true;
			debugger;
			return;
		} else {
			if (!stayTime) {
				stayTime = 2000;
				console.warn('Toast stay time is not set, resetting to default');
			}

			this._error = false;
			this.styles = styles;
			this.stayTime = stayTime;
			this.animation = animation;

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

				toast.style.color = 'white';
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
						console.warn('Animation time is not set, resetting to default');
					} else if (!this.animation.speedCurve) {
						console.warn('Animation speed curve is not set, resetting to default');
					} else if (!this.animation.type) {
						console.warn('Animation type is not set, resetting to default');
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
						console.log('Animation type is not correct, resetting to default');
						break;
					}
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
				if (buttons) {
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
								button.addEventListener('click', object.onclick, false);
							}

							button.innerText = object.name;

							buttonDiv.appendChild(button);
						} else {
							console.error('Button name not set');
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
						console.warn('Toast background color is not set, resetting to default');
					}
				}

				this._toastContainer.appendChild(toast);

				// Animation
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(() => {
						if (this.animation) {
							switch (this.animation.type) {
								case 'bottom':
								toast.style.bottom = '0px';
								break;
								case 'opacity':
								toast.style.opacity = '1';
								break;
								default:
								toast.style.opacity = '1';
								console.log('Animation type is not correct, resetting to default');
								break;
							}
						} else {
							toast.style.opacity = '1';
						}

						setTimeout(() => {
							this.remove(toast);
						}, this.stayTime);
					});
				});

				return toast;
			} else {
				console.error('Toast text is not set');
			}
		} else {
			console.error('There was a previous error');
		}
	}

	remove(toast) {
		toast.style.opacity = '0';

		setTimeout( () => {
			try {
				this._toastContainer.removeChild(toast);
			} catch (err) {console.log('Toast was already removed, or an error occured')}
		}, 1100);
	}
}












/*class Toast {
	constructor(stayTime, animation, buttons, styles) {
		this._buttons = buttons;
		this.stayTime = stayTime;
		this._animaion = animation;

		// Add element
		this._toast = document.createElement('div');

		// Style element
		this._toast.style.color = 'white';
		this._toast.style.padding = '10px 20px';
		this._toast.style.backgroundColor = '#3B3B4F';
		this._toast.style.transition = 'opacity 1s ease';
		this._toast.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.6)';

		this._toastContainer = document.createElement('div');
		this._toastDiv.style.right = '20px';
		this._toastDiv.style.bottom = '20px';
		this._toastDiv.style.position = 'fixed';
		document.body.appendChild(this._toastDiv);

		// Set animation
		let time = 1000;
		let type = 'opacity';
		let speedCurve = 'ease';

		this.animationTime = time;

		if (animation) {
			if (animation.fadeTime == null || animation.fadeTime <= 0) {
				console.warn('Animation time is not set, resetting to default');
			} else if (!animation.speedCurve) {
				console.warn('Animation speed curve is not set, resetting to default');
			} else if (!animation.type) {
				console.warn('Animation type is not set, resetting to default');
			}

			time = animation.fadeTime / 1000;
			speedCurve = animation.speedCurve;
		}

		switch (type) {
			case 'botom':
				this._toast.style.bottom = '-110%';
				this._toast.style.transition = `bottom ${time}s ${speedCurve}`;
				break;
			case 'opacity':
				this._toast.style.opacity = '0';
				this._toast.style.transition = `opacity ${time}s ${speedCurve}`;
				break;
			default:
				this._toast.style.opacity = '0';
				this._toast.style.transition = `opacity ${time}s ${speedCurve}`;
				break;
		}

		// Set buttons
		if (buttons) {
			let buttonDiv = document.createElement('div');

			buttons.forEach( (object, key) => {
				if (object.name == null || object.name =='') {
					console.error('Button name is not set');
				} else {
					let button = document.createElement('button');
					button.innerText = object.name;

					// object.clickFunction

					buttonDiv.appendChild(button);

					button.addEventListener('click', function() {
						console.log(button);
						console.log('Lol');
					}, false);
				}
			});

			this._toast.appendChild(buttonDiv);
		}

		// Styles
		if (styles) {
			this._toastDiv.style.color = styles.textColor;
			this._toastDiv.style.backgroundColor = styles.color;

			if (!styles.textColor) {
				this._toastDiv.style.color = 'white';
				console.warn('Toast color is not set, resetting to default');
			} else if (!styles.position) {
				console.warn('Toast background color is not set, resetting to default');
			} else if (!styles.color) {
				this._toastDiv.style.backgroundColor = '#3B3B4F';
				console.warn('Toast background color is not set, resetting to default');
			}

			// Set position
			switch (styles.position) {
				case 'topLeft':
					this._toastDiv.style.top = '20px';
					this._toastDiv.style.left = '20px';
					break;
				case 'topRight':
					this._toastDiv.style.top = '20px';
					this._toastDiv.style.right = '20px';
					break;
				case 'bottomLeft':
					this._toastDiv.style.left = '20px';
					this._toastDiv.style.bottom = '20px';
					break;
				case 'bottomRight':
					this._toastDiv.style.right = '20px';
					this._toastDiv.style.bottom = '20px';
					break;
				default:
					this._toastDiv.style.right = '20px';
					this._toastDiv.style.bottom = '20px';
					break;
			}
		}
	}

	toast(text) {
		if (text) {
			this._toast.innerHTML += `<p>${text}</p>`;

			this._toastDiv.appendChild(this._toast);

			window.requestAnimationFrame( () => {
				this._toast.style.opacity = '1';
			});

			setTimeout( () => {
				this.remove();
			}, this.stayTime);
		} else {
			console.warn('Text is not defined');
			// console.error(Error('Text is not defined'));
		}
	}

	remove() {
		let check;
		let animationTime = 1000;

		if (this.animation) {
			animationTime = this.animationTime;
		}

		this._toast.style.opacity = '0';

		setTimeout( () => {
			this._toast.style.display = 'none';
			this._toastDiv.removeChild(this._toast);
		}, animationTime + 100);

		try {
			check = document.body.querySelector(this._toast);
		} catch (err) {
			return true;
		}

		if (check) {
			console.error('Something happended, errorcode 1');
			return false;
		}
	}
}*/