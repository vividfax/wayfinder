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

	colorPicker = createColorPicker("#ff744c");
	colorPicker.parent("#pickerContainer");
	colorPicker.size(200, 200);

	hexCode = createP(colorPicker.value());
	hexCode.parent("#textContainer");
	hexCode.style("text-transform", "uppercase");

	rgb = createP(colorPicker.color());
	rgb.parent("#textContainer");

	printData();

	cache = colorPicker.value();
}

function draw() {

	if (cache == colorPicker.value()) {
		return;
	}
	cache = colorPicker.value();

	hexCode.html(colorPicker.value());
	rgb.html(colorPicker.color());
}

function printData() {

	let size = data.yarns.length;
	console.log(data.yarns.length)

	for (let i = 0; i < size; i++) {
		printYarn(i);
	}
}

function printYarn(i) {

	let size = data.yarns[i].colorways.length;

	for (let j = 0; j < size; j++) {
		printColorway(i, j);
	}
}

function printColorway(i, j) {

	let colourway = data.yarns[i].colorways[j].name;
	let yarn = data.yarns[i].name;
	let toPrint = [yarn, colourway].join(" - ");
	let link = data.yarns[i].url;

	let optionsHolder = createP();
	optionsHolder.parent("#optionsContainer");
	optionsHolder.style("background-color", data.yarns[i].colorways[j].hex)
	options = createA(link, toPrint);
	options.parent(optionsHolder);
	options.style("color", "#eee")
}
