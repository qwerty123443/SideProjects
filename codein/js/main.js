var buttonsPressed = [];

function mainJs() {
	var randomElem = document.getElementById('random');

	randomElem.innerText = Math.floor(Math.random() * 1000) + 1;

	var allButtons = document.getElementById('dollars').querySelectorAll('input');

	for (var i = 0; i < allButtons.length; i++) {
		var button = allButtons[i];

		button.addEventListener('click', function() {
			var value = this.value;

			console.log(value);

			for (var j = 0; j < buttonsPressed.length; j++) {
				if (buttonsPressed[j].name == value) {
					buttonsPressed[j].value++;
				} else {
					buttonsPressed.push({
						name: value,
						value: 1
					});
				}
			}
		});
	}
}