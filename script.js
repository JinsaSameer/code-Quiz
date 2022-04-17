var stQz = document.querySelector(".startquiz");
var containerEl=document.querySelector(".container");
var headEl = document.getElementById("head");
var head1El = document.getElementById("head1");
var mainEl = document.getElementById('main');
var Questions = document.getElementById("Questions");
var OptionA = document.querySelector(".OptionA");
var OptionB = document.querySelector(".OptionB");
var OptionC = document.querySelector(".OptionC");
var OptionD = document.querySelector(".OptionD");
var timerEl = document.getElementById("time");
var userData =document.getElementById("userdata");
var h5El = document.createElement("h5");
var body = document.body;
var buttonEl = document.createElement("button");
var hscore = document.getElementById("highsore");
//var initialEl = document.getElementById("name");
var textbox= document.createElement('input');


var questions = { '1': 'Who is your president',
                  '2': 'Who is your Vice president',
                  '3': 'What is my name?',
                  '4':  'How many cat do i have?' 
                   }

var options = { '1': {
                      'A': 'Donald Trump',
                      'B': 'Joe Biden',
                      'C': 'Joe Biden',
                      'D': 'Joe Biden'
                      },
                 '2': {
                      'A': 'Donald Trump',
                      'B': 'Joe Biden',
                      'C': 'Harris',
                      'D': 'Joe Biden'
                  },
                  '3': {
                    'A': 'Jinsa',
                    'B': 'Joe Biden',
                    'C': 'Joe Biden',
                    'D': 'Joe Biden'
                  },
                  '4': {
                    'A': 'Donald Trump',
                    'B': 'Joe Biden',
                    'C': 'Joe Biden',
                    'D': '3'
                  },
                }

var answers = { '1': 'Joe Biden',
                '2': 'Harris',
                '3': 'Jinsa',
                '4': '3'
              }

var QuestionNumber = 0;
var secondsLeft = 60;
var timerInterval;
var score =0;
var HighestScrore =0;


function  TimerCallback() {
    secondsLeft--;
    timerEl.textContent =  "Time :" + secondsLeft;

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
    }

  }

function CompleteQuiz()
{
  if( HighestScrore < score )
  HighestScrore = score;
  Questions.textContent =  "Well  Done!!";
  //Questions.textContent = "Enter your initials";
  //formEl.textContent = "Enter your initials";
  h5El.textContent = "Enter your initials:";
  h5El.setAttribute("style","align: center");
   body.appendChild(h5El);
   textbox.type = 'text';
   body.appendChild(textbox);
  //var response = initialEl.name.value;
   //txtEl.textContent("hello");
   //txtEl.setAttribute("style","height: 50px width: 60px border:5px");
     //body.appendChild(txtEl);
   buttonEl.textContent="submit";
   body.appendChild(buttonEl);
  OptionA.textContent = 'Total Score: ' +score;
  OptionB.textContent = 'Highest Score: ' +HighestScrore;;
  OptionC.textContent = '';
  OptionD.textContent = '';
  stQz.style.visibility = 'hidden';
  headEl.style.visibility = 'hidden';
  head1El.style.visibility = 'hidden';
  stQz.style.visibility = 'hidden';
  //initializeQuizParams()

}
function displayscore()
{
  console.log(textbox.value);
  var user = {
    initial: textbox.value.trim(),
    yourscore: score,
    highscore: HighestScrore
  };
  localStorage.setItem("user", JSON.stringify(user));
  //userData.textContent = textbox.value + "Your score is " +score;
  Questions.textContent =  "Well  Done!!   " +textbox.value +  " Your score is " +score;
  hscore.textContent = HighestScrore;
}

function showNextQuestion(QuestionNumber) {
  console.log('Question #' + QuestionNumber + 'Total Questions' +Object.keys(questions).length);
  if(QuestionNumber > Object.keys(questions).length)
  {
    CompleteQuiz();
    //var divEl = document.createElement("div");
    //var scoreEl = document.createElement("div");
    
    //divEl.textContent = "Well  Done!!";
    //scoreEl.textContent = score;
    return;
  }

  Questions.textContent = questions[QuestionNumber];
  OptionA.textContent = options[QuestionNumber].A;
  OptionB.textContent = options[QuestionNumber].B;
  OptionC.textContent = options[QuestionNumber].C;
  OptionD.textContent = options[QuestionNumber].D;
}

function initializeQuizParams() {
  QuestionNumber = 0;
  secondsLeft = 60;
  clearInterval(timerInterval);
  timerEl.textContent =  "Time :";
  score =0;
}

function StartQuiz() {
  
    // Sets interval in variable
    initializeQuizParams();
    headEl.style.visibility = 'hidden';
    head1El.style.visibility = 'hidden';
    stQz.style.visibility = 'hidden';
    timerInterval = setInterval(TimerCallback, 1000);
    showNextQuestion(++QuestionNumber);
  }

  function OptionsListenerA() {
    //if answer is incorrect timer decrement by 10
      RecordAnswer(OptionA.textContent);
    }

  function OptionsListenerB() {
    //if answer is incorrect timer decrement by 10
        RecordAnswer(OptionB.textContent);
    }

  function OptionsListenerC() {
    //if answer is incorrect timer decrement by 10
    RecordAnswer(OptionC.textContent);
  }

  function OptionsListenerD() {
    //if answer is incorrect timer decrement by 10
    RecordAnswer(OptionD.textContent);
  }


  function RecordAnswer(selection) {
//if answer is incorrect timer decrement by 10
    // Get button value
    // Check if answer is correct
    //console.log (selection, answers[QuestionNumber]);
    if (selection == answers[QuestionNumber])
    {
      score++;
      console.log ('score: '+score);
    }
    else{
      (secondsLeft>12) ? (secondsLeft-=10): secondsLeft;
    }
    // Goto next question if correct       
    showNextQuestion(++QuestionNumber);

    
  }

stQz.addEventListener("click", StartQuiz);
OptionA.addEventListener("click", OptionsListenerA);
OptionB.addEventListener("click", OptionsListenerB);
OptionC.addEventListener("click", OptionsListenerC);
OptionD.addEventListener("click", OptionsListenerD);  
buttonEl.addEventListener("click",displayscore);