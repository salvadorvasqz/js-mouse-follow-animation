//constants
const SCALE_INTERVAL = 0.5;
const NUMBER_OF_CIRCLES = 20;
const circles = [];

//mouse coords
let xCoord = 0;
let yCoord = 0;
//on first load
let firstLoad = true;
//circles color
let color = '#0EB7C4';

//main container
const container = document.querySelector('#container');
//color picker
const colorPicker = document.querySelector('#color-picker');

//on load
window.onload = () => {
  //set default color
  colorPicker.value = color;
};

//on mouse move
window.addEventListener('mousemove', (event) => {
  //mouse coords
  xCoord = event.x;
  yCoord = event.y;
  //on first load
  if (firstLoad) {
    //draw all circles
    initializeContent();
    firstLoad = false;
  }
  //move all circles
  moveAll();
});

//on colorPicker change
colorPicker.addEventListener('input', (e) => {
  //set color
  color = e.target.value;
  //move all circles
  moveAll();
});

//transform div style
const transformDiv = (div, scaleX, scaleY, x, y) => {
  //div size
  const width = Math.round(div.clientWidth * scaleX);
  const height = Math.round(div.clientHeight * scaleY);
  //new coords
  const newX = x - Math.round(width / 2);
  const newY = y - Math.round(height / 2);
  //set transform style
  div.style.transform = `translateX(${newX}px) translateY(${newY}px) scale(${scaleX}, ${scaleY})`;
  //set border color
  div.style.border = `1.5px solid ${color}`;
};

//initialize content
const initializeContent = () => {
  //div scale
  let scaleX = 1.2;
  let scaleY = 0.8;
  //opacity interval
  let opacity = 1 / NUMBER_OF_CIRCLES;
  //append all circles
  for (let index = 0; index < NUMBER_OF_CIRCLES; index++) {
    //create new div
    const div = document.createElement('div');
    //add class
    div.classList.add('circle');
    //set transition duration
    div.style.transition = `all ${25 * (index + 1)}ms`;
    //set opacity
    div.style.opacity = `${opacity * (NUMBER_OF_CIRCLES - index)}`;
    //set transform style
    transformDiv(div, scaleX, scaleY, xCoord, yCoord);
    //add circle to list
    circles.push({ div, scaleX, scaleY });
    //add circle to dom
    container.appendChild(div);
    //increment scale
    scaleX += SCALE_INTERVAL;
    scaleY += SCALE_INTERVAL;
  }
};

//move all circles
moveAll = () => {
  circles.forEach((circle) => {
    const { div, scaleX, scaleY } = circle;
    //transform circle
    transformDiv(div, scaleX, scaleY, xCoord, yCoord);
  });
};
