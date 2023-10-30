const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.addEventListener("mousedown", () => {
	isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
	isDrawing = false;
	ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(event) {
	if (!isDrawing) return;
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.strokeStyle = "black";

	ctx.lineTo(
		event.clientX - canvas.offsetLeft,
		event.clientY - canvas.offsetTop
	);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(
		event.clientX - canvas.offsetLeft,
		event.clientY - canvas.offsetTop
	);
}

document.getElementById("clearButton").addEventListener("click", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveButton").addEventListener("click", () => {
	const dataURL = canvas.toDataURL("image/png");
	const downloadLink = document.createElement("a");
	downloadLink.href = dataURL;
	downloadLink.download = "signature.png";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
});
