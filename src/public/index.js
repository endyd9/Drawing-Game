const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
const lineWidth = document.getElementById("line-width");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const lineColor = document.getElementById("color");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
};

const startDraw = () => {
  isPainting = true;
};

const stopDraw = () => {
  isPainting = false;
};
const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
  ctx.fillStyle = event.target.value;
};
const onColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};
const onColorClick = (event) => {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
};
const onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
};
const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};
const onResetClick = () => {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
};
const onEraserClick = () => {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput.value = null;
  };
};

const onDoubleClick = (event) => {
  ctx.save();
  const text = textInput.value;
  ctx.lineWidth = 1;
  ctx.font = "48px serif";
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
};
// const onSaveClick = () => {
//   const test = document.querySelector(".test");
//   const data = canvas.toDataURL();
//   test.value = data.replace(/^data:image\/(png|jpg);base64,/, "");
// };
const onSaveClick = () => {
  const test = document.querySelector(".test");
  const keyword = document.querySelector(".keyword");
  const data = canvas.toDataURL();
  test.value = data.replace(/^data:image\/(png|jpg);base64,/, "");
  const url = { url: test.value };
  fetch(`/api/`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      url,
      keyword: keyword.innerText,
    }),
  }).then(console.log(1));
};
const gameTimer = () => {
  const form = document.querySelector("form");
  const submit = document.createElement("button");
  submit.value = "ㅎㅇ";
  form.appendChild(submit);
  setTimeout(() => submit.click(), 60000);
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineColor.addEventListener("change", onColorChange);

modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
saveBtn.addEventListener("mousedown", onSaveClick);

addEventListener("load", gameTimer);
