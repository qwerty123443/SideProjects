class Toast {
	constructor(stayTime, animation) {
		if (stayTime <= 0) {
			console.error('Toast stay time is not set or is lower than 1');
			debugger;
			return;
		}

		this._stayTime = stayTime;
		this._animation = animation;

		this._toastContainer = document.createElement('div');
		this._toastContainer.style.right = '20px';
		this._toastContainer.style.bottom = '20px';
		this._toastContainer.style.position = 'fixed';
		this._toastContainer.style.transition = 'all 1s ease';

		document.body.appendChild(this._toastContainer);
	}

	toast(text, buttons) {
		if (text) {
			let toast = document.createElement('div');

			toast.style.opacity = '0';
			toast.style.color= 'white';
			toast.style.minWidth = '100px';
			toast.style.textAlign = 'left';
			toast.style.marginTop = '10px';
			toast.style.padding = '10px 20px';
			toast.style.transition = 'all 1s ease';
			toast.style.backgroundColor = '#3B3B4F';
			toast.style.fontFamily = "'Roboto', sans-serif";

			// Animation request
			if (this._animation) {
				if (this._animation.fadeTime == null || this._animation.fadeTime <= 0) {
					console.warn('Animation time is not set, resetting to default');
				} else if (!this._animation.speedCurve) {
					console.warn('Animation speed curve is not set, resetting to default');
				} else if (!this._animation.type) {
					console.warn('Animation type is not set, resetting to default');
				}

				let type = this._animation.type;
				let time = this._animation.fadeTime / 1000;
				let speedCurve = this._animation.speedCurve;

				switch (type) {
					case 'botom':
						toast.style.bottom = '-110%';
						toast.style.transition = `bottom ${time}s ${speedCurve}`;
						break;
					case 'opacity':
						toast.style.opacity = '0';
						toast.style.transition = `opacity ${time}s ${speedCurve}`;
						break;
					default: 
						toast.style.opacity = '0';
						toast.style.transition = `opacity ${time}s ${speedCurve}`;
						console.log('Animation type is correct, resetting to default');
						break;
				}
			}

			let textElem = document.createElement('p');

			textElem.innerText = text;
			textElem.style.display = 'inline-block';

			toast.appendChild(textElem);

			// Buttons
			if (buttons) {
				let buttonDiv = document.createElement('div');

				buttonDiv.style.marginLeft = '10px';
				buttonDiv.style.display = 'inline-block';

				buttons.forEach( (object, key) => {
					if (object.name) {
						let button = document.createElement('button');

						button.style.border = 'none';
						button.style.fontSize = '100%';
						button.style.cursor = 'pointer';
						button.style.color = 'lightblue';
						button.style.background = 'none';

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

			this._toastContainer.appendChild(toast);

			// Animation
			window.requestAnimationFrame( () => {
				toast.style.opacity = '1';

				setTimeout( () => {
					this.remove(toast);
				}, this._stayTime);
			});

			return toast;
		} else {
			console.error('Toast text is not set');
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
