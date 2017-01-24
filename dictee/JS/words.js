let done = 0;
let wrong = 0;
let right = 0;
let currentWord;
const stats = {
	doneWords: [],
	wrongWords: [],
	correctWords: []
};
const synth = window.speechSynthesis;

const words = ['abonnees', 'accommodatie', 'achttien', 'acuut', 'adellijk', 'adolescent', 'agressie', 'alinea', 'alleszins', 'allochtoon', 'althans', 'apparaat', 'baby\'tje', 'barbecue\xEBn', 'baseren', 'begrafenis', 'begroeiing', 'burgemeester', 'burgerlijk', 'carri\xE8re', 'caissi\xE8re', 'chagrijnig', 'cheque', 'comit\xE9', 'commissaris', 'consequent', 'daarentegen', 'debacle', 'decennium', 'dichtstbijzijnde', 'discipline', 'diskette', 'eigenlijk', 'eczeem',
'excuus', 'enigszins', 'enthousiast', 'enqu\xEAte', 'faillissement', 'fascisme', 'financieel', 'financi\xEBle', 'financi\xEBn', 'geenszins', 'gefascineerd', 'gerechtelijk', 'gewelddadig', 'gezamenlijk', 'hardnekkig', 'hartstikke', 'hi\xEBrarchie', 'hopelijk', 'hygi\xEBnisch', 'identiteit', 'illusie', 'insect', 'interessant', 'interview', 'juffrouw', 'klerezooi', 'kopi\xEBren', 'legitimatie', 'liniaal', 'litteken', 'luxueuze', 'manoeuvreren', 'millimeter', 'namelijk',
'niettemin', 'nochtans', 'onmiddellijk', 'onverbiddelijk', 'opticien', 'oeuvre', 'parallellen', 'penicilline', 'per se', 'practicum', 'proced\xE9', 'product', 'professor', 'puberteit', 'publicatie', 'pyjama', 'racisme', 'recensie', 'rechterlijk', 're\xEBel', 're\xEBle', 'represailles', 'sowieso', 'staatsieportret', 'toernooi', 'tournee', 'twijfelen', 'uittreksel', 'vacu\xFCm', 'wederrechtelijk', 'weifelen', 'weliswaar', 'yoghurt'];

function load() {
	const speakBtn = document.getElementById('speak');
	const inputText = document.getElementById('text');
	const submitBtn = document.getElementById('submit');

	inputText.addEventListener('keyup', evt => {
		if (evt.key == 'Enter') {
			checkWord(inputText.value, currentWord);
		}
	});

	speakBtn.addEventListener('click', evt => {
		inputText.focus();
		speakWord(currentWord);
	}, false);

	submitBtn.addEventListener('click', evt => {
		checkWord(inputText.value, currentWord);
	}, false);

	nextWord();
	updateStats();
}

function nextWord() {
	currentWord = words.random();

	if (done < words.length) {
		while (stats.doneWords.has(currentWord)) {
			currentWord = words.random();
		}
	} else {
		document.getElementById('correction').innerText = 'Klaar';
	}

	speakWord(currentWord);
}

function updateStats() {
	document.getElementById('text').value = '';
	document.getElementById('wrong').innerHTML = '<b>Fout:</b> ' + wrong;
	document.getElementById('right').innerHTML = '<b>Goed</b>: ' + right;
	document.getElementById('amount').innerHTML = '<b>Aantal:</b> ' + (words.length - done);
}

function checkWord(word, checkWith) {
	if (word.trim() != '') {
		if (word.trim().toLowerCase() == checkWith.trim()) {
			right++;
			console.log('Correct');
			stats.correctWords.push(word);
			document.body.style.animation = 'right 1s ease';
			document.getElementById('correction').innerText = '';
		} else {
			wrong++;
			console.log('Wrong');
			stats.wrongWords.push(word);
			document.body.style.animation = 'wrong 1s ease';
			document.getElementById('correction').innerText = 'Het was: ' + checkWith;
		}

		stats.doneWords.push(word);

		if (done < words.length) {
			done++;

			updateStats();

			setTimeout(nextWord, 1000);

			// Reset animation
			setTimeout(() => {
				document.body.style.animation = '';
			}, 1010);
		} else {
			console.log('Done');
			document.getElementById('correction').innerText = 'Klaar';
		}
	}
}

function speakWord(word) {
	synth.speak(new SpeechSynthesisUtterance(word));
}

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.has = function(obj) {
	this.forEach((object, key) => {
		if (object == obj) {
			return true;
		}
	});

	return false;
}

window.onload = load;