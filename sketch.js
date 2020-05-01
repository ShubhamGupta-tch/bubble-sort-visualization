// [1, 2, 3, 5, 4]

let way = 'noise';
let noiseBtn, randomBtn, lineBtn;
let speedSlider;

let values;
let i;
let j;
let a, b;
let number_of_iter = 100;
let num_btn = 0;

function setup() {
  values = [];
  i = 0;
  j = 0;
  
    if(num_btn < 1){
      createCanvas(windowWidth, windowHeight-150);
      lineBtn = createButton('Uniform Lines');
      noiseBtn = createButton('Perlin Noise Lines');
      randomBtn = createButton('Random Lines');
      speedSlider = createSlider(0, 1000, 100, 1);
      num_btn++;
  }
  
  for (let x = 0; x < width; x++) {
    if(way === 'noise'){
    values.push(noise(x/100.0)*height);
    } else if(way === 'random'){
    values.push(random(height))
    }
  }
  if(way === 'line'){
    for(let x = 0; values.length < width; x += height/width){
      values.push(x);
      values = shuffle(values);
    }
  }
  
  
  lineBtn.mousePressed(() => {
    way='line';
    setup();
  });
  
  noiseBtn.mousePressed(() => {
    way='noise';
    setup();
  });
  
  randomBtn.mousePressed(() => {
    way='random';
    setup();
  });
  
}
function draw() {
  background(20);
  
  number_of_iter = speedSlider.value();
  
  for(let n = 0; n < number_of_iter; n++){
  if(i <= (values.length - j - 1)){
    a = values[i];
    b = values[i + 1]
    if (a > b) {
        [values[i], values[i + 1]] = [values[i + 1], values[i]]
      }
  } else{
    i = 0;
    j++
  }
  i++;
  }
  
  for (let i = 0; i < width; i++) {
    stroke(255);
    if(j > values.length){
      stroke(3, 252, 136);
    }
    // if(values[i] === a){
    //   stroke(255, 0, 0);
    // }
    // else if(values[i] === b){
    //   stroke(0, 255, 0)
    // }
    line(i, height, i, height - values[i])
  }
}