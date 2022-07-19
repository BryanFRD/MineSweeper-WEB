const root = document.querySelector(":root");

const caseTemplate = document.createElement("div");
caseTemplate.classList.add("case", "border-dark", "border", "border-1", "fw-bold");

const colors = ["#0D6EFD", "#198754", "#FFC107", "#FD7E14", "#DC3545", "#6610F2", "#212529"];

let time, timeCounter = 0;
let grid = [];

heightInput.addEventListener('change', (e) => {
  refreshInput(e.currentTarget, "--minesweeper-rows");
  refreshBombsInput();
  
  resetGame();
});

widthInput.addEventListener('change', (e) => {
  refreshInput(e.currentTarget, "--minesweeper-cols");
  refreshBombsInput();
  
  resetGame();
});

bombsInput.addEventListener('change', () => {
  refreshBombsInput();
  
  resetGame();
});

function refreshInput(input, attribute){
  input.value = Math.max(input.min, Math.min(input.max, input.value));
  
  root.style.setProperty(attribute, input.value);
}

function refreshBombsInput(){
  bombsInput.value = Math.max(bombsInput.min, Math.min(bombsInput.max, Math.floor(heightInput.value * widthInput.value / 4), bombsInput.value));
}

function resetGame(){
  if(time){
    console.log(time);
    clearInterval(time);
  }
  
  timeCounter = 0;
  
  time = setInterval(() => {
    timer.innerText = `Temps: ${Math.floor(timeCounter / 60).toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping: false})}:${(timeCounter % 60).toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping: false})}`;
    timeCounter++;
  }, 1000);
  
  gameGrid.innerHTML = "";
  
  for(let height = 0; height < heightInput.value; height++){
    grid[height] = [];
    for(let width = 0; width < widthInput.value; width++){
      let tempCase = caseTemplate.cloneNode(true);
      tempCase.addEventListener('click', (e) => {
        revealCase(e.currentTarget);
      });
      tempCase.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        flagCase(e.currentTarget);
      });
      gameGrid.appendChild(tempCase);
      
      grid[height][width] = {
        caseDiv: tempCase,
        isRevealed: false,
        isBomb: false,
        bombAround: 0,
        x: width,
        y: height
      }
    }
  }
  
  for(let bombs = 0; bombs < bombsInput.value; bombs++){
    let temp = Math.floor(Math.random() * gameGrid.children.length);
    let y = Math.floor(temp / widthInput.value), x = temp % widthInput.value;
    
    let tempCase = grid[y][x];
    tempCase.isBomb = true;
    for(let ty = -1; ty <= 1; ty++){
      for(let tx = -1; tx <= 1; tx++){
        if(!ty && !tx){
          continue;
        }
        if(isInBound(x + tx, y + ty)){
          grid[y + ty][x + tx].bombAround++;
          grid[y + ty][x + tx].caseDiv.innerText = grid[y + ty][x + tx].bombAround;
        }
      }
    }
  }
  
}

function revealCase(caseDiv){
  
}

function flagCase(caseDiv){
  
}

function isInBound(x, y){
  let w = widthInput.value, h = heightInput.value;
  return x >= 0 && x < w && y >= 0 && y < h;
}

resetGame();