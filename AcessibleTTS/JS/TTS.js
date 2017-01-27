/*
- Add compatability check
*/

class TTS {
	constructor(lang) {
		this.lang = this.convertLang(lang);
		this.synth = window.speechSynthesis;

		document.body.addEventListener('click', evt => {
			if (evt.ctrlKey) {
				if (evt.target != evt.currentTarget) {
					if (evt.target.innerText.length > 0) {
						this.speak(evt.target.innerText, this.lang);
					}
				}
			}
		});

		//  Key shortcuts
		window.addEventListener('keyup', evt => {
			if (evt.key == 'Escape') {
				this.stop();
			}
		});
	}

	getVoices() {
		return window.speechSynthesis.getVoices();
	}

	setLang(lang) {
		this.lang = this.convertLang(lang);
	}

	convertLang(str) {
		this.getVoices().forEach((object, key) => {
			if (object.lang == str) {
				// this.lang = object;
				console.log(object);
				return object;
			}
		});
	}

	stop() {
		if (this.synth.speaking) {
			this.synth.cancel();
		}
	}

	speak(text) {
		const utterText = new SpeechSynthesisUtterance(text);

		utterText.voice = this.lang;

		this.synth.speak(utterText);
	}
}