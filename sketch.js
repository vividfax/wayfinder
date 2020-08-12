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

	rgb = createP(colorPicker.color());
	rgb.parent("#textContainer");

	getClosest(colorPicker.value());

	cache = colorPicker.value();
}

function draw() {

	if (cache == colorPicker.value()) {
		return;
	}
	cache = colorPicker.value();

	hexCode.html(colorPicker.value());
	rgb.html(colorPicker.color());

	getClosest(colorPicker.value());
}

function getClosest(original) {

	let closestDistance = 766;
	let closestData = [];

	let secondDistance = 766;
	let secondData = [];

	let thirdDistance = 766;
	let thirdData = [];

	for (let i = 0; i < data.yarns.length; i++) {
		for (let j = 0; j < data.yarns[i].colorways.length; j++) {

			let distance = colorDistance(original, data.yarns[i].colorways[j].hex);
			if (distance < closestDistance) {
				thirdDistance = secondDistance;
				thirdData = secondData;
				secondDistance = closestDistance;
				secondData = closestData;
				closestDistance = distance;
				closestData = [i, j];
			} else if (distance < secondDistance) {
				thirdDistance = secondDistance;
				thirdData = secondData;
				secondDistance = distance;
				secondData = [i, j];
			} else if (distance < thirdDistance) {
				thirdDistance = distance;
				thirdData = [i, j];
			}
		}
	}
	document.getElementById("optionsContainer").innerHTML = "";

	printColorway(closestData[0], closestData[1]);
	printColorway(secondData[0], secondData[1]);
	printColorway(thirdData[0], thirdData[1]);
}

function colorDistance(first, second) {

	let r = makeEven(red(first) - red(second));
	let g = makeEven(green(first) - green(second));
	let b = makeEven(blue(first) - blue(second));

	return r + g + b;
}

function makeEven(n) {

	if (n < 0) {
		return n * -1;
	}
	return n;
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
	options.style("color", "#eee");
	options.style("margin", "8px");
}
