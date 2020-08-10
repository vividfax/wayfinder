let colorPicker;
let hexCode;

function setup() {

	colorPicker = createColorPicker("#35BC95");
	colorPicker.parent("#pickerContainer");
	colorPicker.size(200, 200);

	hexCode = createP(colorPicker.value());
	hexCode.parent("#textContainer");
	hexCode.style("text-transform", "uppercase");
}

function draw() {

	hexCode.html(colorPicker.value());
}
