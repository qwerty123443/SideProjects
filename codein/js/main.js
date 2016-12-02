function mainJs() {
	var randomElem = document.getElementById('random');

	randomElem.innerText = Math.floor(Math.random() * 1000) + 1;

	var allButtons = document.getElementById('dollars').querySelectorAll('input');

	for (var i = 0; i < allButtons.length; i++) {
		allButtons[i].value
	}
}