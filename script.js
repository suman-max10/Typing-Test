const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');


const wpmTag = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "Despite the fact that piranhas are relatively harmless, many people continue to believe the pervasive myth that piranhas are dangerous to humans.",
    "This impression of piranhas is exacerbated by their mischaracterization in popular media.",
    "For example, the promotional poster for the 1978 horror film Piranha features an oversized piranha poised to bite the leg of an unsuspecting woman.",
    "Such a terrifying representation easily captures the imagination and promotes unnecessary fear.",
    "While the trope of the man-eating piranhas lends excitement to adventure stories, it bears little resemblance to the real-life piranha.",
    "By paying more attention to fact than fiction, humans may finally be able to let go of this inaccurate belief."
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = '';

  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  const spans = typingText.querySelectorAll('span');
  if (spans.length > 0) {
    spans[0].classList.add('active');


    document.addEventListener('keydown',() => input.focus());

    typingText.addEventListener("click",()=>{
      input.focus()})
  }

  
  input.value = '';
  charIndex = 0;
  mistake = 0;
  timeLeft = maxTime;
  mistakes.innerText = 0;
  wpmTag.innerText = 0;
  cpm.innerText = 0;
}

function initTyping() {
  const chars = typingText.querySelectorAll('span');
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < chars.length && timeLeft > 0) {

    if(!isTyping){
      timer = setInterval(initTime,1000);
      isTyping = true;
  }






    chars.forEach(span => span.classList.remove('active'));

    if (chars[charIndex].innerText === typedChar) {
      chars[charIndex].classList.add('correct');
    } else {
      chars[charIndex].classList.add('incorrect');
      mistake++;
      mistakes.innerText = mistake;
    }

    charIndex++;

  
   

    if (charIndex < chars.length) {
      chars[charIndex].classList.add('active');
    }
    else{
      clearInterval(timer);
      input.value='';
    }

    // CPM calculation (characters per minute)
    cpm.innerText = charIndex - mistake;
  }
}





function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;

    // Correct WPM formula
    let wpm = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
    if (wpm < 0 || !wpm || wpm === Infinity) wpm = 0;

    // display WPM
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function reset(){
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value ='';
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpmTag.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
}
// Attach event
input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);

// Load on start
loadParagraph();
