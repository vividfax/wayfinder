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

	colorPicker = createColorPicker("#ffcaa9");
	colorPicker.parent("#pickerContainer");
	colorPicker.size(200, 200);

	hexCode = createP(colorPicker.value());
	hexCode.parent("#textContainer");
	hexCode.style("text-transform", "uppercase");

	rgb = createP(colorPicker.color());
	rgb.parent("#textContainer");

	options = createP("West Yorkshire Spinners ColourLab DK - Deep Teal 716");
	options.parent("#optionsContainer");

	cache = colorPicker.value();
}

function draw() {

	if (cache == colorPicker.value()) {
		return;
	}
	cache = colorPicker;

	hexCode.html(colorPicker.value());
	rgb.html(colorPicker.color());
}
