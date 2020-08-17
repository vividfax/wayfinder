let data;
let cache;

let colorPicker;
let hexCode;
let rgb;
let options;

function preload() {
	data = loadJSON("./data.json");
}

function setup() {

	colorPicker = createColorPicker("#BACC33");
	colorPicker.parent("#pickerContainer");
	colorPicker.size(200, 200);

	hexCode = createP(colorPicker.value());
	hexCode.parent("#textContainer");
	hexCode.style("text-transform", "uppercase");

	rgb = createP(getRgb(colorPicker.value()));
	rgb.parent("#textContainer");

	printMatches(colorPicker.value());

	cache = colorPicker.value();
}

function draw() {

	if (cache == colorPicker.value()) {
		return;
	}
	cache = colorPicker.value();

	hexCode.html(colorPicker.value());
	rgb.html(getRgb(colorPicker.color()));

	printMatches(colorPicker.value());
}

function printMatches(value) {

	document.getElementById("optionsContainer").innerHTML = "";

	let matches = getClosest(value);

	for (let i = 0; i < matches.length; i++) {
		printColorway(matches[i][0], matches[i][1]);
	}
}

function getClosest(current) {

	const maxDistance = 766;
	let distances = [];

	const numberOfMatches = 3;
	let matches = [];

	for (let i = 0; i < numberOfMatches; i++) {

		distances.push(maxDistance);
		matches.push([]);
	}

	for (let i = 0; i < data.yarns.length; i++) {
		for (let j = 0; j < data.yarns[i].colorways.length; j++) {

			let distance = colorDistance(current, data.yarns[i].colorways[j].hex);

			for (let k = 0; k < numberOfMatches; k++) {

				if (distance < distances[k]) {

					for (let l = numberOfMatches - 1; l > k; l--) {

						distances[l] = distances[l - 1];
						matches[l] = matches[l - 1];
					}
					distances[k] = distance;
					matches[k] = [i, j];

					break;
				}
			}
		}
	}
	return matches;
}

function colorDistance(first, second) {

	let r = abs(red(first) - red(second));
	let g = abs(green(first) - green(second));
	let b = abs(blue(first) - blue(second));

	return r + g + b;
}

function printColorway(i, j) {

	let colourway = data.yarns[i].colorways[j].name;
	let yarn = data.yarns[i].name;
	let toPrint = [yarn, colourway].join(" - ");
	let link = data.yarns[i].url;

	let optionsHolder = createP();
	optionsHolder.parent("#optionsContainer");
	optionsHolder.style("background-color", data.yarns[i].colorways[j].hex);
	options = createA(link, toPrint);
	options.parent(optionsHolder);
	options.style("color", "#fbfbfb");
	options.style("margin", "8px");
}

function getRgb(color) {

	let rgb = [red(color), green(color), blue(color)].join(', ');
	return 'rgb(' + rgb + ')';
}
