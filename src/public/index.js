const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
const lineWidth = document.getElementById("line-width");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const lineColor = document.getElementById("color");

const scoreText = document.querySelector(".score");

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
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// canvas funtions
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
// canvas funtions

// call visionAPI
const onSubmitClick = async () => {
  const data = canvas.toDataURL();
  const keyword = document.querySelector(".keyword");
  const url = { url: data.replace(/^data:image\/(png|jpg);base64,/, "") };
  const response = await fetch(`/api/`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      url,
      keyword: keyword.innerText,
    }),
  });
  console.log(response.status);
  if (response.status === 200) {
    const { score } = await response.json();
    if (score === 5) {
      gameSet();
    }
    scoreText.innerText = `맞춘 갯수 : ${score}`;
  }
};
// call visionAPI

// set Timer
const gameTimer = () => {
  let min = 2;
  let sec = 59;
  setInterval(() => {
    timer = document.getElementById("timer");
    sec >= 10
      ? (timer.innerText = `TIME : ${min}:${sec}`)
      : (timer.innerText = `TIME : ${min}:0${sec}`);
    sec -= 1;
    if (sec <= 0) {
      min -= 1;
      sec = 59;
    }
  }, 1000);
  setTimeout(gameSet, 180000);
};
const gameSet = () => {
  const form = document.querySelector("form");
  const submit = document.createElement("button");
  submit.value = "ㅎㅇ";
  form.appendChild(submit);
  submit.click();
};
// set Timer

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
submitBtn.addEventListener("mousedown", onSubmitClick);

addEventListener("load", gameTimer);
