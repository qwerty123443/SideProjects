const arr = [
'Music',
[
'NiceSongs',
[
'I like trains - Tomska.mp3',
'Happy - Pharell williams.mp3',
'Talk me down - Troye Sivan.mp3'
],
'ShitSongs',
[
'I have poo.mp3'
],
'More folders',
[
'Folder1',
[
'I am an item in folder1',
'I am another item in folder1'
],
'Folder2',
[
'I am an item in folder2',
'I am another item in folder2',
[
'Item',
[
'Item',
[
'Item'
]
]
]
]
]
]
];

function tree(arr, index) {
	if (!index)
		index = 0;

	arr.forEach(val => {
		if (val instanceof Array)
			tree(val, index + 1);
		else
			document.body.innerHTML += `<p style="color: white; text-align: left; margin: 0; background-color: ${colorFromIndex(index)}">${generateBeforeItems(index)}${val}</p>`;
	});
}

function generateBeforeItems(index) {
	return Array(index * 5 + index).join("&nbsp;") + '+---&nbsp;';
}

function colorFromIndex(index) {
	return `hsl(180, 100%, ${50 - index * 10}%)`;
}

tree(arr);