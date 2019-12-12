let socket;
let angle1 = 0;
let angle2 = 4;
let data = {
  x: 0,
  y: 0
};

function setup() {
  if (windowWidth / windowHeight > 1) {
    w = windowHeight;
    h = w * 0.7;
  } else {
    w = windowWidth;
    h = windowWidth;
  }


  socket = io.connect(
    "https://maija.uber.space", {
      path: "/wave/socket.io"
    }
  );
  socket.on("mouse", newDrawing);
  createCanvas(w, h);

  background(0);
}

function draw() {
  background(0);
  translate(width / 2, height - 40);
  branch(100, [120, 120, 120, 150]);
  branch2(100, [120, 120, 120, 50]);
}

function mousePressed() {
  mouseDragged();
}

function windowResized() {
  if (windowWidth / windowHeight > 1) {
    w = windowHeight;
    h = w * 0.7;
  } else {
    w = windowWidth;
    h = windowWidth;
  }

  resizeCanvas(w, h);
}

function mouseDragged() {
  data = {
    x: mouseX
  };

  angle1 = mouseX * 0.01;
  socket.emit("mouse", data);
}

function newDrawing(dataRecieved) {
  angle2 = dataRecieved.x * 0.01;
}

function branch(len, color) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (color == undefined) {
    color = 0;
  }
  stroke(color);
  if (len > 10) {
    push();
    rotate(angle1);
    branch(len * 0.75, [220, 220, 220, 200]);
    pop();
    push();
    rotate(-angle1);
    branch(len * 0.75, [250, 250, 250, 250]);
    pop();
  }
}

function branch2(len, color) {
  line(0, 0, 0, -len - 5);
  translate(0, -len - 5);
  if (color == undefined) {
    color = 0;
  }
  stroke(color);
  if (len > 10) {
    push();
    rotate(angle2);
    branch2(len * 0.75, [170, 170, 170, 100]);
    pop();
    push();
    rotate(-angle2);
    branch2(len * 0.75, [200, 200, 200, 200]);
    pop();
  }
}