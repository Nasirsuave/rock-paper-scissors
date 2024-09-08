const selectionButtons = document.querySelectorAll('[data-selection]')
//querySelectorAll selects element based on the attribute its fed with
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const selections = document.querySelector('[selections]')

const SELECTIONS = [
    {
      name:'rock',
      emoji:'✊',
      beats:'scissors'
    },
    {
      name:'paper',
      emoji:'✋',
      beats:'rock'
    },
    {
      name:'scissors',
      emoji:'✌️',
      beats:'paper'
    }
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click',e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

let yourScore = 0
let computerScore = 0

function makeSelection(selection){
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection,computerSelection)
  const computerWinner = isWinner(computerSelection,selection)
  
  
  addSelectionResult(computerSelection,computerWinner)
  addSelectionResult(selection,yourWinner)


  if(yourWinner){ 
        yourScore = incrementScore(yourScoreSpan)
     
  }
 if(computerWinner){
   
     computerScore = incrementScore(computerScoreSpan)
     
  }

  checkGameOver(yourScore,computerScore) 
  //console.log(`you:${yourScore} computer:${computerScore}`)
 
}

function incrementScore(scoreSpan){
  scoreSpan.innerText = Number(scoreSpan.innerText )+ 1
  return scoreSpan.innerText
}

function addSelectionResult(selection,Winner){
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if(Winner) div.classList.add('winner')
  finalColumn.after(div)
}

function isWinner(selection,opponentSelection){
  return selection.beats === opponentSelection.name
}

function randomSelection(){
  const randomIndex = Math.floor(Math.random()*SELECTIONS.length)
  return SELECTIONS[randomIndex]
}

function checkGameOver(playerScore,compScore){
   if(compScore == 5 && compScore>playerScore){
    //document.body.classList.add('gameover')
    const failedText = document.createElement('div');
    failedText.classList.add('text')
    failedText.innerText = `Game Over
    Refresh to Play Again`;

    const overlay = document.createElement('div');
    overlay.appendChild(failedText);
    overlay.classList.add('overlay')
    selections.appendChild(overlay);
    
   }
      
  
}