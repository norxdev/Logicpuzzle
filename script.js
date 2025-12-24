// --- Daily Puzzle Data ---
const puzzles = [
  {
    date: '2025-12-24',
    question: 'Arrange pets in order by favorite color: Cat, Dog, Rabbit, Fish. Clues: Cat is not blue, Rabbit likes green, Fish is next to Dog.',
    solution: ['Rabbit', 'Dog', 'Fish', 'Cat'],
    options: ['Cat', 'Dog', 'Rabbit', 'Fish']
  }
];

// --- Load today's puzzle ---
const today = new Date().toISOString().slice(0,10);
const puzzle = puzzles.find(p => p.date === today) || puzzles[0];
document.getElementById('date').innerText = "Puzzle for " + puzzle.date;

const puzzleDiv = document.getElementById('puzzle');

// --- Create clickable options ---
let selected = [];

function renderPuzzle(){
  puzzleDiv.innerHTML = '';
  puzzle.options.forEach(opt => {
    if(!selected.includes(opt)){
      const btn = document.createElement('button');
      btn.innerText = opt;
      btn.onclick = () => selectOption(opt);
      puzzleDiv.appendChild(btn);
    }
  });
  if(selected.length > 0){
    const selDiv = document.createElement('div');
    selDiv.innerText = 'Your order: ' + selected.join(', ');
    puzzleDiv.appendChild(selDiv);
  }
}

function selectOption(option){
  if(selected.length < puzzle.solution.length){
    selected.push(option);
    renderPuzzle();
  }
}

renderPuzzle();

// --- Timer ---
let time = 0;
let timerInterval = setInterval(() => {
  time++;
  document.getElementById('timer').innerText = "Time: " + time + "s";
}, 1000);

// --- Load Streak ---
let streak = Number(localStorage.getItem('streak') || 0);
document.getElementById('streak').innerText = `Current Streak: ${streak}`;

// --- Submit ---
document.getElementById('submitBtn').onclick = () => {
  if(selected.join(',') === puzzle.solution.join(',')){
    clearInterval(timerInterval);
    document.getElementById('result').innerText = `✅ Correct! You solved in ${time}s`;
    
    // Update streak
    streak++;
    localStorage.setItem('streak', streak);
    document.getElementById('streak').innerText = `Current Streak: ${streak}`;

    // Share link
    const shareUrl = `${window.location.origin}?puzzle=${puzzle.date}&time=${time}`;
    document.getElementById('shareLink').innerHTML = `Share to challenge friends: <a href="${shareUrl}" target="_blank">${shareUrl}</a>`;
  } else {
    document.getElementById('result').innerText = "❌ Not correct, try again!";
  }
};

// --- Optional: Handle share link if friend opens ---
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('puzzle') && urlParams.get('time')){
  const friendTime = urlParams.get('time');
  const challengeDiv = document.createElement('div');
  challengeDiv.style.marginTop = '10px';
  challengeDiv.innerHTML = `🏁 Challenge: Beat your friend's time of ${friendTime}s!`;
  document.body.prepend(challengeDiv);
}
