var guess = document.getElementById("guess");
var startButton = document.getElementById("start");
var onlyConnect = document.getElementById("onlyConnect");
var correctWordList = document.getElementById("correctWordList");
var wrongWordList = document.getElementById("wrongWordList");
var progressBar = document.getElementById("currentProgress");
var gameStarted = false;
var randomWord = "";
var correctGuessed = 0;
var lives = 0;
var champs = ["Aatrox", "Ahri", "Akali", "Alistar",
"Amumu",
"Anivia",
"Annie",
"Ashe",
"Aurelion Sol",
"Azir",
"Bard",
"Blitzcrank",
"Brand",
"Braum",
"Caitlyn",
"Camille",
"Cassiopeia",
"Cho'Gath",
"Corki",
"Darius",
"Diana",
"Dr. Mundo",
"Draven",
"Ekko",
"Elise",
"Evelynn",
"Ezreal",
"Fiddlesticks",
"Fiora",
"Fizz",
"Galio",
"Gangplank",
"Garen",
"Gnar",
"Gragas",
"Graves",
"Hecarim",
"Heimerdinger",
"Illaoi",
"Irelia",
"Ivern",
"Janna",
"Jarvan IV",
"Jax",
"Jayce",
"Jhin",
"Jinx",
"Kai'sa",
"Kalista",
"Karma",
"Karthus",
"Kassadin",
"Katarina",
"Kayle",
"Kayn",
"Kennen",
"Kha'Zix",
"Kindred",
"Kled",
"Kog'Maw",
"LeBlanc",
"Lee Sin",
"Leona",
"Lissandra",
"Lucian",
"Lulu",
"Lux",
"Malphite",
"Malzahar",
"Maokai",
"Master Yi",
"Miss Fortune",
"Mordekaiser",
"Morgana",
"Nami",
"Nasus",
"Nautilus",
"Nidalee",
"Nocturne",
"Nunu",
"Olaf",
"Orianna",
"Ornn",
"Pantheon",
"Poppy",
"Pyke",
"Quinn",
"Rakan",
"Rammus",
"Rek'Sai",
"Renekton",
"Rengar",
"Riven",
"Rumble",
"Ryze",
"Sejuani",
"Shaco",
"Shen",
"Shyvana",
"Singed",
"Sion",
"Sivir",
"Skarner",
"Sona",
"Soraka",
"Swain",
"Syndra",
"Tahm Kench",
"Taliyah",
"Talon",
"Taric",
"Teemo",
"Thresh",
"Tristana",
"Trundle",
"Tryndamere",
"Twisted Fate",
"Twitch",
"Udyr",
"Urgot",
"Varus",
"Vayne",
"Veigar",
"Vel'Koz",
"Vi",
"Viktor",
"Vladimir",
"Volibear",
"Warwick",
"Wukong",
"Xayah",
"Xerath",
"Xin Zhao",
"Yasuo",
"Yorick",
"Zac",
"Zed",
"Ziggs",
"Zilean",
"Zoe",
"Zyra",
];

//TODO : ADD MORE DIFFERENT CATEGORIES
var vowels = ["a", "e", "i", "o", "u"];


guess.addEventListener("keydown", function(e) {
    if(e.keyCode == 13 && gameStarted) {
      guessEval(e);
    }
});

startButton.addEventListener("click", startGame);

function startGame() {
  //// TODO: CLEAR ALL EXISTING FIELDS
  progressBar.style.width = "0%";
  progressBar.innerHTML = "0%";
  while(correctWordList.firstChild) {
    correctWordList.removeChild(correctWordList.firstChild);
  }
  while(wrongWordList.firstChild) {
    wrongWordList.removeChild(wrongWordList.firstChild);
  }
  gameStarted = true;
  lives = 3;
  correctGuessed = 0;
  generateRandomWord();
}

function generateRandomWord() {
  randomWord = champs[Math.floor(Math.random()*champs.length)];
  var correctListItems = Array.from(correctWordList.getElementsByTagName("li"));
  var wrongListItems = Array.from(wrongWordList.getElementsByTagName("li"));
  for(var correctWord of correctListItems) {
    if(correctWord.innerHTML === randomWord) {
      generateRandomWord();
      return;
    }
  }
  for(var wrongWord of wrongListItems) {
    if(wrongWord.innerHTML === randomWord) {
      generateRandomWord();
      return;
    }
  }
  var noVowels = "";
  for(let i = 0; i < randomWord.length; i++) {
    if(!vowels.includes(randomWord.toLowerCase().substring(i, i+1))) {
      noVowels += randomWord.substring(i, i+1);
      if(Math.floor(Math.random() * 2) == 0) {
        noVowels += " ";
      }
    }
  }
  onlyConnect.innerHTML = noVowels;
}

function guessEval(e) {
  // TODO: Create logic to stop guessing when game is won or lost
  var userGuess = guess.value;
  event.currentTarget.value = "";
  if(userGuess.toUpperCase().localeCompare(randomWord.toUpperCase()) == 0) {
    addWord(true);
    correctGuessed++;
    incrementProgress();
  } else {
    addWord(false);
    lives--;
  }
  if(lives <= 0) {
    //Add function for losing
    alert("You lose");
    //Add function to stop additional guessing
    onlyConnect.innerHTML = "YOU LOSE";
  } else {
    if(correctGuessed < 10) {
      generateRandomWord();
    } else {
      //Add function to stop additional guessing
      onlyConnect.innerHTML = "YOU WIN!";
    }
  }

  function addWord(correct) {
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(randomWord));
    if(correct) {
      correctWordList.appendChild(listItem);
    } else {
      wrongWordList.appendChild(listItem);
    }

  }

  function incrementProgress() {
    var percent = correctGuessed * 10 + "%";
    progressBar.style.width = percent;
    progressBar.innerHTML = percent;
  }

}
