const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* =========================
   DATA
========================= */

const VOCAB_DRAG = [
  { id:"play_game", word:"play a game", img:"images/game.jpg" },
  { id:"drive_car", word:"drive a car", img:"images/car.jpg" },
  { id:"make_sandcastle", word:"make a sandcastle", img:"images/sandcastle.jpg" },
  { id:"watch_tv", word:"watch TV", img:"images/TV.jpg" },
  { id:"paint_picture", word:"paint a picture", img:"images/picture.jpg" },
  { id:"ride_horse", word:"ride a horse", img:"images/horse.jpg" },
  { id:"play_soccer", word:"play soccer", img:"images/soccer.jpg" },
  { id:"play_basketball", word:"play basketball", img:"images/basketball.jpg" },
  { id:"fly_kite", word:"fly a kite", img:"images/kite.jpg" },
  { id:"drink_lemonade", word:"drink lemonade", img:"images/lemonade.jpg" },
  { id:"eat_hotdog", word:"eat a hot dog", img:"images/hotdog.jpg" },
  { id:"ride_bike", word:"ride a bike", img:"images/bike.jpg" }
];
const VOCAB_MATCH = [
  { first:"make",  second:"a sandcastle" },
  { first:"drive", second:"a car" },
  { first:"watch", second:"TV" },
  { first:"paint", second:"a picture" },
  { first:"play",  second:"a game" },
  { first:"fly",   second:"a kite" },
  { first:"ride",  second:"a bike" },
  { first:"face",  second:"of a clown" },
  { first:"drink", second:"lemonade" },
  { first:"ride",  second:"a horse" },
  { first:"play",  second:"soccer" },
  { first:"play",  second:"basketball" }
];
const VOCAB_MEMORY = [
  { id:"play_game", word:"play a game", img:"images/game.jpg" },
  { id:"sleep", word:"sleep", img:"images/sleep.jpg" },
  { id:"wear_mac", word:"wear a mac (raincoat)", img:"images/mac.jpg" },
  { id:"watch_tv", word:"watch TV", img:"images/TV.jpg" },
  { id:"paint_picture", word:"paint a picture", img:"images/picture.jpg" },
  { id:"climb_tree", word:"climb a tree", img:"images/tree.jpg" },
  { id:"fly_kite", word:"fly a kite", img:"images/kite.jpg" },
  { id:"ride_bike", word:"ride a bike", img:"images/bikes.jpg" }
];

const VOCAB_UNSCRAMBLE = [
   { word:'play a game',       img:'images/game.jpg' },
  { word:'make a sandcastle', img:'images/sandcastle.jpg' },
  { word:'paint a picture',   img:'images/picture.jpg' },
  { word:'face of a clown',   img:'images/clown.jpg' },
  { word:'drive a car',       img:'images/car.jpg' },
  { word:'ride a bike',       img:'images/bike.jpg' },
  { word:'climb a tree',      img:'images/tree.jpg' },
  { word:'drink lemonade',    img:'images/lemonade.jpg' },
  { word:'fly a kite',        img:'images/kite.jpg' },
  { word:'play soccer',       img:'images/soccer.jpg' },
  { word:'play basketball',   img:'images/basketball.jpg' },
  { word:'watch TV',          img:'images/TV.jpg' },
  { word:'ride a horse',      img:'images/horse.jpg' },
];
const GRAMMAR_TO_BE = [
  { text:"I ___ playing a game with my friend.", opts:["am","is","are"], ans:"am" },
  { text:"Miss Mary  ___ watching the children.", opts:["am","is","are"], ans:"is" },
  { text:"Maya and Paco ___ having a great time.", opts:["am","is","are"], ans:"are" },
  { text:"The children ___ in the park today.", opts:["am","is","are"], ans:"are" },
  { text:"Lulu ___ painting her face over there.", opts:["am","is","are"], ans:"is" },
  { text:"We ___ riding a horse at King’s Park Day.", opts:["am","is","are"], ans:"are" },
  { text:"I ___ making a sandcastle now.", opts:["am","is","are"], ans:"am" },
  { text:"Sam ___ eating an apple in the park.", opts:["am","is","are"], ans:"is" }
];

const GRAMMAR_ING = [
  { w:"play", cat:"just" },
  { w:"watch", cat:"just" },
  { w:"paint", cat:"just" },
  { w:"eat", cat:"just" },
  { w:"drink", cat:"just" },
  { w:"sing", cat:"just" },
  { w:"read", cat:"just" },
  { w:"fly", cat:"just" },
  { w:"run", cat:"double" },
  { w:"swim", cat:"double" },
  { w:"sit", cat:"double" },
  { w:"stop", cat:"double" },
  { w:"hop", cat:"double" },
  { w:"skip", cat:"double" },
  { w:"drive", cat:"dropE" },
  { w:"make", cat:"dropE" },
  { w:"ride", cat:"dropE" },
  { w:"dance", cat:"dropE" },
  { w:"write", cat:"dropE" },
  { w:"smile", cat:"dropE" }
];

const GRAMMAR_CHOICE = [
  { text:"Sue ___ the cats in the garden.", opts:["are watching","is watching"], ans:"is watching" },
  { text:"Listen! Tom ___ the piano.", opts:["is playing","are playing"], ans:"is playing" },
  { text:"What ___? Is it an orange?", opts:["you are eating","are you eating"], ans:"are you eating" },
  { text:"Look, Mum! I ___ my face!", opts:["’m painting","painting"], ans:"’m painting" },
  { text:"Where’s Sandra? ___ trees again?", opts:["She is climbing","Is she climbing"], ans:"Is she climbing" },
  { text:"The children ___! They’re playing!", opts:["aren’t swimming","isn’t swimming"], ans:"aren’t swimming" },
  { text:"What is Paco doing? He ___ a game.", opts:["is playing","are playing"], ans:"is playing" },
  { text:"Are they singing? Yes, they ___.", opts:["are","is"], ans:"are" }
];

const GRAMMAR_ORDER = [
  {
    label:"",
    words:["Peter","is","driving","his","new","car"],
    answer:["Peter","is","driving","his","new","car"]
  },
  {
    label:"",
    words:["Lulu","is","painting","her","face"],
    answer:["Lulu","is","painting","her","face"]
  },
  {
    label:"",
    words:["The", "children","are","having","a","great","time"],
    answer:["The", "children","are","having","a","great","time"]
  },
  {
    label:"",
    words:["Paco","is","not","drawing","a","clown"],
    answer:["Paco","is","not","drawing","a","clown"]
  },
  {
    label:"",
    words:["They","are","not","swimming","now"],
    answer:["They","are","not","swimming","now"]
  },
  {
    label:"",
    words:["Are","the","children","playing","soccer?"],
    answer:["Are","the","children","playing","soccer?"]
  },
  {
    label:"",
    words:["Is","Sam","making","a","sandcastle?"],
    answer:["Is","Sam","making","a","sandcastle?"]
  },
  {
    label:"",
    words:["What","are","you","doing?"],
    answer:["What","are","you","doing?"]
  }
];

const READING_TEXT = `
It’s Fun Day at Green Park today. There are a lot of children in the park.
Mia is playing a game with the clown. Leo is drinking lemonade.
Anna and Rose are flying a kite. Ben and Max are playing basketball.
Their teacher, Miss Lane, is watching them. Everybody is having a great time!
`;

const READING_QA = [
  { text:"Who is playing a game with the clown?", opts:["Mia","Leo","Miss Lane"], ans:"Mia" },
  { text:"Who is drinking lemonade?", opts:["Leo","Anna","Ben"], ans:"Leo" },
  { text:"Who is flying a kite?", opts:["Anna and Rose","Ben and Max","Mia and Leo"], ans:"Anna and Rose" },
  { text:"Who is watching the children?", opts:["Miss Lane","Rose","The clown"], ans:"Miss Lane" },
  { text:"Where are the children today?", opts:["In the park","At school","At home"], ans:"In the park" },
  { text:"What are Ben and Max doing?", opts:["Playing basketball","Riding a bike","Painting faces"], ans:"Playing basketball" },
  { text:"Is Leo eating an apple?", opts:["No, he isn’t","Yes, he is","No, he is sleeping"], ans:"No, he isn’t" },
  { text:"Are the children having a great time?", opts:["Yes, they are","No, they aren’t","Yes, he is"], ans:"Yes, they are" }
];

const READING_GAPS = [
  { before:"Look! Emma ", ans:"is painting", after:" a big picture near the flowers." },

  { before:"Two boys ", ans:"are playing", after:" soccer on the grass." },

  { before:"A little girl ", ans:"is eating", after:" an apple under the tree." },

  { before:"Her brother ", ans:"is flying", after:" a red kite." },

  { before:"The children ", ans:"are having", after:" a wonderful time." },

  { before:"Be quiet! The baby ", ans:"is sleeping", after:"." },

  { before:"Listen! Anna ", ans:"is playing", after:" the piano." },

  { before:"Look! The cat ", ans:"is climbing", after:" a tree." }
];
const READING_TF_IMAGE = "images/party.jpg";

const READING_TRUE_FALSE = [
  { text:"There are three children in the picture.", ans:"True" },
  { text:"There is a girl on the sofa.", ans:"True" },
  { text:"The girl on the sofa has got fair hair.", ans:"False" },
  { text:"The boy is dancing.", ans:"False" },
  { text:"The dog is next to the sofa.", ans:"False" },
  { text:"It is a birthday party.", ans:"True" },
  { text:"The children are in the kitchen.", ans:"False" },
  { text:"There are four balloons in the room.", ans:"False" }
];
const READING_MATCH = [
  { question:"Where is Fiona?", answer:"She is in the living room." },
  { question:"What is Lulu doing?", answer:"She is painting a picture." },
  { question:"Are you drinking apple juice?", answer:"No, I'm not. I don't like apples." },
  { question:"What are the children doing?", answer:"They are playing soccer in the park." },
  { question:"Where is the dog?", answer:"It is under the table." },
  { question:"What is Pete doing?", answer:"He's riding his new bike." },
  { question:"Is it raining today?", answer:"Yes, take your umbrella." },
  { question:"Who is singing?", answer:"Larry is." }
];
const sections = {
  vocabulary:{
    title:"Vocabulary",
    subtitle:"",
    tasks:[
  { id:"vocab-drag", title:"Task 1 - Drag", desc:"Перетащи слова к правильным картинкам." },

  { id:"vocab-match", title:"Task 2 - Match", desc:"Соедини части фраз." },

  { id:"vocab-memory", title:"Task 3 - Memory", desc:"Найди пары: картинка + действие." },

  { id:"vocab-unscramble", title:"Task 4 - Unscramble", desc:"Собери фразу по буквам." }
]
  },
  grammar:{
    title:"Grammar",
    subtitle:"",
    tasks:[
      { id:"grammar-to-be", title:"Task 1 - am / is / are", desc:"Выбери правильную форму." },
      { id:"grammar-ing", title:"Task 2 - Add -ing", desc:"Распредели глаголы по группам." },
      { id:"grammar-choice", title:"Task 3 - Choose", desc:"Выбери правильный вариант." },
      { id:"grammar-order", title:"Task 4 - Word order", desc:"Поставь слова в правильном порядке." }
    ]
  },
  reading:{
  title:"Reading",
  subtitle:"",
  tasks:[
    { id:"reading-qa", title:"Task 1 - Read and choose", desc:"Прочитай текст и выбери правильный ответ." },
    { id:"reading-gaps", title:"Task 2 - Drag into the gaps", desc:"Перетащи ответы в нужные места." },
    { id:"reading-truefalse", title:"Task 3 - True / False", desc:"Посмотри на картинку и выбери True или False." },
	{ id:"reading-match", title:"Task 4 - Match", desc:"Соедини вопросы и ответы." }
  ]
}
};

/* =========================
   STATE
========================= */

const state = {
  section:null,
  task:null,
  found:0,
  need:0,
  mistakes:0,
  done:{}
};

const main = $("#main");
const homeBtn = $("#homeBtn");

homeBtn.addEventListener("click", renderHome);

/* =========================
   RENDER
========================= */

function renderHome(){
  state.section = null;
  state.task = null;
  homeBtn.style.visibility = "hidden";

  main.innerHTML = `
    <div class="homeGrid">
      <div class="sectionCard" data-section="vocabulary">
        <div>
          <div class="sectionIcon">🔠</div>
          <h2>Vocabulary</h2>
          <p>Drag</p>
		  <p>Match</p>
		  <p>Memory</p>
		  <p>Unscramble</p>
        </div>
        <div class="sectionGo">Open →</div>
      </div>

      <div class="sectionCard" data-section="grammar">
        <div>
          <div class="sectionIcon">🖊️</div>
          <h2>Grammar</h2>
          <p>Am/Is/Are</p>  
		  <p>Add -ing</p>
		  <p>Choose</p>
		  <p>Word order</p>
        </div>
        <div class="sectionGo">Open →</div>
      </div>

      <div class="sectionCard" data-section="reading">
        <div>
          <div class="sectionIcon">📚</div>
          <h2>Reading</h2>
          <p>Read and choose</p>
		  <p>Drag into the gaps</p>
		  <p>True/False</p>
		  <p>Match</p>
        </div>
        <div class="sectionGo">Open →</div>
      </div>
    </div>
  `;

  document.querySelectorAll(".sectionCard").forEach(card=>{
    card.addEventListener("click",()=>openSection(card.dataset.section));
  });
}

function openSection(sectionId){
  state.section = sectionId;
  state.task = null;
  homeBtn.style.visibility = "visible";

  const s = sections[sectionId];

  main.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebarHead">
          <h2>${s.title}</h2>
          <p>${s.subtitle}</p>
        </div>
        <div class="taskList" id="taskList"></div>
      </aside>

      <section class="stage">
        <div class="stageHead">
          <div>
            <h2 id="taskTitle">Выбери Task слева</h2>
            <p id="taskDesc">Нажми на задание в левом меню.</p>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="k">Progress</div>
              <div class="v" id="progVal">0/0</div>
            </div>
            <div class="stat">
              <div class="k">Mistakes</div>
              <div class="v" id="mistVal">0</div>
            </div>
            <button class="btn" id="shuffleBtn" type="button">Shuffle</button>
          </div>
        </div>

        <div class="stageBody" id="stageBody">
          <div class="note">Выбери Task слева.</div>
        </div>

        
      </section>
    </div>
  `;

  $("#shuffleBtn").addEventListener("click",()=>{
    if(state.task) openTask(state.task);
  });

  renderTaskButtons();
}

function renderTaskButtons(){
  const taskList = $("#taskList");
  const s = sections[state.section];

  taskList.innerHTML = "";

  s.tasks.forEach((task, index)=>{
    const btn = document.createElement("button");
    btn.className = "taskBtn" + (state.task === task.id ? " active" : "");
    btn.type = "button";

    const isDone = state.done[task.id];

  btn.innerHTML = `
  <span class="taskText">
    <span class="taskNumber">Task ${index + 1}</span>
    <span class="small">${task.title.replace(/^Task \d+ - /,"")}</span>
  </span>
  <span class="doneDot ${isDone ? "done" : ""}"></span>
`;

    btn.addEventListener("click",()=>openTask(task.id));
    taskList.appendChild(btn);
  });
}

function openTask(taskId){
  state.task = taskId;
  state.found = 0;
  state.need = 0;
  state.mistakes = 0;

  const task = sections[state.section].tasks.find(t=>t.id === taskId);

  $("#taskTitle").textContent = task.title;
  $("#taskDesc").textContent = task.desc;
 

  renderTaskButtons();
  updateStats();
if(taskId === "vocab-drag") buildDragPictures(taskId, VOCAB_DRAG);
if(taskId === "vocab-match") buildMatchTask(taskId);
if(taskId === "vocab-memory") buildMemoryGame(taskId, VOCAB_MEMORY);
if(taskId === "vocab-unscramble") buildLetterUnscramble(taskId);

  if(taskId === "grammar-to-be") buildMCQTask(taskId, GRAMMAR_TO_BE);
  if(taskId === "grammar-ing") buildIngCategories(taskId);
  if(taskId === "grammar-choice") buildMCQTask(taskId, GRAMMAR_CHOICE);
  if(taskId === "grammar-order") buildWordOrder(taskId, GRAMMAR_ORDER);

  if(taskId === "reading-qa") buildReadingQA(taskId);
  if(taskId === "reading-gaps") buildReadingGaps(taskId);
  if(taskId === "reading-truefalse") buildReadingTrueFalse(taskId);
  if(taskId === "reading-match") buildReadingMatch(taskId);
}

function updateStats(){
  $("#progVal").textContent = `${state.found}/${state.need}`;
  $("#mistVal").textContent = String(state.mistakes);
}

function addCorrect(n = 1){
  state.found += n;
  updateStats();

  if(state.found >= state.need){
    finishTask();
  }
}

function addMistake(){
  state.mistakes++;
  updateStats();
}

function finishTask(){
  state.done[state.task] = true;
   renderTaskButtons();
}

/* =========================
   MCQ
========================= */

function buildMCQTask(taskId, items){
  const list = shuffle([...items]);

  state.need = list.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="taskScroll">
      <div class="qList" id="qList"></div>
    </div>
  `;

  const host = $("#qList");

  list.forEach((q, idx)=>{
    const row = document.createElement("div");
    row.className = "qRow";
    row.dataset.done = "0";

    const text = document.createElement("div");
    text.className = "qText";
    text.textContent = `${idx+1}) ${q.text}`;

    const btns = document.createElement("div");
    btns.className = "qBtns";

    shuffle([...q.opts]).forEach(opt=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = opt;

      b.addEventListener("click",()=>{
        if(row.dataset.done === "1") return;

        if(opt === q.ans){
          row.dataset.done = "1";
          b.classList.add("locked");

          [...btns.querySelectorAll(".opt")].forEach(x=>{
            x.disabled = true;
            if(x !== b) x.style.opacity = ".55";
          });

          addCorrect(1);
        }else{
          addMistake();
          b.classList.add("wrong");
          setTimeout(()=>b.classList.remove("wrong"),600);
        }
      });

      btns.appendChild(b);
    });

    row.appendChild(text);
    row.appendChild(btns);
    host.appendChild(row);
  });
}

/* =========================
   DRAG PICTURES
========================= */

function buildDragPictures(taskId, items){
  const list = shuffle([...items]);

  state.need = list.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="taskScroll">
      <div class="dragWrap">
        <div class="picGrid" id="picGrid"></div>

        <div class="wordPanel">
          <div class="wordPanelTitle">Words</div>
          <div class="wordChips" id="wordChips"></div>
        </div>
      </div>
    </div>
  `;

  const grid = $("#picGrid");
  const chips = $("#wordChips");

  list.forEach(item=>{
    const card = document.createElement("div");
    card.className = "picCard";

    card.innerHTML = `
      <div class="pic">
        <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.word)}" draggable="false">
      </div>
      <div class="drop" data-accept="${escapeHtml(item.id)}"></div>
    `;

    grid.appendChild(card);
  });

  shuffle([...items]).forEach(item=>{
    const chip = document.createElement("div");
    chip.className = "wordChip";
    chip.draggable = true;
    chip.dataset.wordId = item.id;
    chip.textContent = item.word;

    chip.addEventListener("dragstart",(e)=>{
      if(chip.classList.contains("used")){
        e.preventDefault();
        return;
      }

      e.dataTransfer.setData("text/plain", item.id);
    });

    chips.appendChild(chip);
  });

  [...grid.querySelectorAll(".drop")].forEach(drop=>{
    drop.addEventListener("dragover",(e)=>{
      e.preventDefault();
      drop.classList.add("over");
    });

    drop.addEventListener("dragleave",()=>{
      drop.classList.remove("over");
    });

    drop.addEventListener("drop",(e)=>{
      e.preventDefault();
      drop.classList.remove("over");

      if(drop.classList.contains("filled")) return;

      const got = e.dataTransfer.getData("text/plain");
      const need = drop.dataset.accept;

      const chip = [...chips.querySelectorAll(".wordChip")].find(c=>c.dataset.wordId === got);
      if(!chip || chip.classList.contains("used")) return;

      if(got === need){
        drop.classList.add("filled");
        drop.textContent = chip.textContent;

        chip.classList.add("used");
        chip.draggable = false;

        addCorrect(1);
      }else{
        addMistake();

        drop.classList.add("bad");
        chip.classList.add("wrong");

        setTimeout(()=>{
          drop.classList.remove("bad");
          chip.classList.remove("wrong");
        },500);
      }
    });
  });
}
function buildMatchTask(){

  state.need = VOCAB_MATCH.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="matchWrap">

      <div class="matchWords" id="matchWords"></div>

      <div class="matchList" id="matchList"></div>

    </div>
  `;

  const wordsHost = $("#matchWords");
  const listHost = $("#matchList");

  const shuffledWords = shuffle(
    VOCAB_MATCH.map(x => x.first)
  );

  shuffledWords.forEach(word => {

    const chip = document.createElement("div");

    chip.className = "matchWord";
    chip.textContent = word;
    chip.draggable = true;

    chip.addEventListener("dragstart", e=>{
      e.dataTransfer.setData("text/plain", word);
    });

    wordsHost.appendChild(chip);

  });

  shuffle([...VOCAB_MATCH]).forEach(item=>{

    const row = document.createElement("div");
    row.className = "matchRow";

    const drop = document.createElement("div");
    drop.className = "matchDrop";

    drop.dataset.answer = item.first;

    drop.addEventListener("dragover",e=>{
      e.preventDefault();
      drop.classList.add("over");
    });

    drop.addEventListener("dragleave",()=>{
      drop.classList.remove("over");
    });

    drop.addEventListener("drop",e=>{

      e.preventDefault();

      drop.classList.remove("over");

      if(drop.classList.contains("correct")) return;

      const value = e.dataTransfer.getData("text/plain");

      if(value === item.first){

        drop.textContent = value;

        drop.classList.add("correct");

        const chip = [...$$(".matchWord")]
          .find(x =>
            x.textContent === value &&
            !x.classList.contains("used")
          );

        if(chip){
          chip.classList.add("used");
        }

        addCorrect(1);

      }else{

        addMistake();

      }

    });

    const text = document.createElement("div");
    text.textContent = item.second;

    row.append(drop);
    row.append(text);

    listHost.appendChild(row);

  });

}
/* =========================
   MEMORY
========================= */

function buildMemoryGame(taskId, items){
  const deck = [];
state.mistakes = 0;
$("#mistVal").textContent = "—";
  items.forEach(a=>{
    deck.push({ pair:a.id, type:"word", value:a.word });
    deck.push({ pair:a.id, type:"img", value:a.img });
  });

  shuffle(deck);

  const numbers = shuffle([...Array(deck.length)].map((_,i)=>i+1));

  state.need = deck.length;
  updateStats();

  $("#stageBody").innerHTML = `<div class="memGrid" id="memGrid"></div>`;

  const host = $("#memGrid");

  let first = null;
  let second = null;
  let lock = false;

  deck.forEach((card, idx)=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "memCard";
    btn.dataset.pair = card.pair;
    btn.dataset.type = card.type;
    btn.dataset.matched = "0";

    btn.innerHTML = `
      <div class="memInner">
        <div class="memFront">${numbers[idx]}</div>
        <div class="memBack">
          ${
            card.type === "img"
              ? `<img src="${escapeHtml(card.value)}" alt="${escapeHtml(card.pair)}">`
              : `<div class="word">${escapeHtml(card.value)}</div>`
          }
        </div>
      </div>
    `;

    btn.addEventListener("click",()=>{
      if(lock) return;
      if(btn.dataset.matched === "1") return;
      if(btn.classList.contains("open")) return;

      btn.classList.add("open");

      if(!first){
        first = btn;
        return;
      }

      second = btn;
      lock = true;

      const isMatch = first.dataset.pair === second.dataset.pair && first.dataset.type !== second.dataset.type;

      if(isMatch){
        first.dataset.matched = "1";
        second.dataset.matched = "1";
        first.classList.add("matched");
        second.classList.add("matched");

        addCorrect(2);

        first = null;
        second = null;
        lock = false;
      }else{
       

        setTimeout(()=>{
          first.classList.remove("open");
          second.classList.remove("open");
          first = null;
          second = null;
          lock = false;
        },700);
      }
    });

    host.appendChild(btn);
  });
}

/* =========================
   WORD ORDER / UNSCRAMBLE
========================= */
function buildLetterUnscramble(taskId){
  const items = shuffle([...VOCAB_UNSCRAMBLE]);

  state.need = items.length;
  state.found = 0;
  state.mistakes = 0;
  updateStats();

  let currentIndex = 0;
  let currentAnswer = "";
  let draggedLetter = null;

  $("#stageBody").innerHTML = `
    <div class="letterUnscrambleBox">
      <div class="luCard">
        <img id="luImage" class="luImage" src="" alt="">
      </div>

      <div class="luSlots" id="luSlots"></div>
      <div class="luLetters" id="luLetters"></div>
    </div>
  `;

  const imgEl = $("#luImage");
  const slotsWrap = $("#luSlots");
  const lettersWrap = $("#luLetters");

  function renderItem(){
    const item = items[currentIndex];

    currentAnswer = item.word.toLowerCase();

    imgEl.src = item.img;
    imgEl.alt = item.word;

    slotsWrap.innerHTML = "";
    lettersWrap.innerHTML = "";
    draggedLetter = null;
if(currentAnswer.length > 14){
  slotsWrap.classList.add("long");
}else{
  slotsWrap.classList.remove("long");
}
 const words = currentAnswer.split(" ");
let globalIndex = 0;

words.forEach(wordPart => {
  const wordBox = document.createElement("div");
  wordBox.className = "luWord";

  for(let j = 0; j < wordPart.length; j++){
    const i = globalIndex;
    const ch = currentAnswer[i];

    const slot = document.createElement("div");
    slot.className = "luSlot";
    slot.dataset.index = String(i);
    slot.dataset.filled = "0";

    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
      e.preventDefault();

      if(!draggedLetter) return;
      if(slot.dataset.filled === "1") return;

      const got = draggedLetter.textContent.toLowerCase();
      const need = currentAnswer[i];

      if(got === need){
        slot.textContent = got;
        slot.dataset.filled = "1";
        slot.classList.add("correct");

        draggedLetter.classList.add("used");
        draggedLetter.draggable = false;
        draggedLetter = null;

        const allFilled = [...slotsWrap.querySelectorAll(".luSlot")]
          .every(s => s.dataset.filled === "1");

        if(allFilled){
          addCorrect(1);

          setTimeout(()=>{
            currentIndex++;

            if(currentIndex >= items.length){
              finishTask();
              return;
            }

            renderItem();
          }, 600);
        }

      }else{
        addMistake();
        slot.classList.add("wrong");

        setTimeout(()=>{
          slot.classList.remove("wrong");
        }, 400);

        draggedLetter = null;
      }
    });

    wordBox.appendChild(slot);
    globalIndex++;
  }

  slotsWrap.appendChild(wordBox);

  globalIndex++;
});

    const letters = shuffle(
      currentAnswer
        .replaceAll(" ","")
        .split("")
    );

    letters.forEach(ch=>{
      const letter = document.createElement("div");
      letter.className = "luLetter";
      letter.textContent = ch;
      letter.draggable = true;

      letter.addEventListener("dragstart", e=>{
        if(letter.classList.contains("used")){
          e.preventDefault();
          return;
        }

        draggedLetter = letter;
        e.dataTransfer.setData("text/plain", ch);
      });

      lettersWrap.appendChild(letter);
    });
  }

  renderItem();
}
function buildWordOrder(taskId, data){
  const items = shuffle([...data]);

  state.need = items.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="taskScroll">
      <div class="orderList" id="orderList"></div>
    </div>
  `;

  const host = $("#orderList");

  items.forEach((item, idx)=>{
    const card = document.createElement("div");
    card.className = "orderCard";
    card.dataset.done = "0";

    card.innerHTML = `
      <div class="orderTop">
        <div class="orderType">${idx+1}) ${item.label}</div>
        <div class="miniStatus"></div>
      </div>
      <div class="clouds"></div>
      <div class="answerLine"></div>
      <div class="orderControls">
        <button class="btn checkBtn" type="button">Check</button>
        <button class="btn clearBtn" type="button">Clear</button>
      </div>
    `;

    const clouds = $(".clouds", card);
    const line = $(".answerLine", card);
    const status = $(".miniStatus", card);

    shuffle([...item.words]).forEach((w, n)=>{
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.draggable = true;
      cloud.dataset.word = w;
      cloud.dataset.uid = `${idx}-${n}-${Math.random()}`;
      cloud.textContent = w;

      cloud.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData("text/plain", cloud.dataset.uid);
      });

      clouds.appendChild(cloud);
    });

    line.addEventListener("dragover",(e)=>{
      e.preventDefault();
      line.classList.add("dropOk");
    });

    line.addEventListener("dragleave",()=>{
      line.classList.remove("dropOk");
    });

    line.addEventListener("drop",(e)=>{
      if(card.dataset.done === "1") return;

      e.preventDefault();
      line.classList.remove("dropOk");

      const uid = e.dataTransfer.getData("text/plain");
      const cloud = card.querySelector(`.cloud[data-uid="${CSS.escape(uid)}"]`);
      if(!cloud) return;

      const pill = document.createElement("div");
      pill.className = "wordPill";
      pill.dataset.word = cloud.dataset.word;
      pill.textContent = cloud.dataset.word;

      pill.addEventListener("click",()=>{
        if(card.dataset.done === "1") return;
        clouds.appendChild(cloud);
        pill.remove();
      });

      line.appendChild(pill);
      cloud.remove();
    });

    $(".checkBtn", card).addEventListener("click",()=>{
      if(card.dataset.done === "1") return;

      const got = [...line.querySelectorAll(".wordPill")].map(x=>x.dataset.word);
      const ok = got.length === item.answer.length && got.every((w,i)=>w === item.answer[i]);

      if(ok){
        card.dataset.done = "1";
        status.textContent = "Correct!";
        status.className = "miniStatus good";

        [...card.querySelectorAll("button")].forEach(b=>b.disabled = true);

        addCorrect(1);
      }else{
        status.textContent = "Try again.";
        status.className = "miniStatus bad";
        addMistake();
      }
    });

    $(".clearBtn", card).addEventListener("click",()=>{
      if(card.dataset.done === "1") return;

      [...line.querySelectorAll(".wordPill")].forEach((pill, n)=>{
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        cloud.draggable = true;
        cloud.dataset.word = pill.dataset.word;
        cloud.dataset.uid = `${idx}-r-${n}-${Math.random()}`;
        cloud.textContent = pill.dataset.word;

        cloud.addEventListener("dragstart",(e)=>{
          e.dataTransfer.setData("text/plain", cloud.dataset.uid);
        });

        clouds.appendChild(cloud);
        pill.remove();
      });

      status.textContent = "";
      status.className = "miniStatus";
    });

    host.appendChild(card);
  });
}

/* =========================
   ING CATEGORIES
========================= */

function buildIngCategories(taskId){
  state.need = GRAMMAR_ING.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="taskScroll">
      <div class="sortArea">
        <div class="pool">
          <div class="poolTitle"></div>
          <div class="items" id="wordPool"></div>
        </div>

        <div class="bin" id="binJust" data-cat="just">
          <div class="binTitle"></div>
          <div class="binHint">play → playing</div>
          <div class="items" id="justItems"></div>
        </div>

        <div class="bin" id="binDouble" data-cat="double">
          <div class="binTitle"></div>
          <div class="binHint">run → running</div>
          <div class="items" id="doubleItems"></div>
        </div>

        <div class="bin" id="binDropE" data-cat="dropE">
          <div class="binTitle"></div>
          <div class="binHint">make → making</div>
          <div class="items" id="dropEItems"></div>
        </div>
      </div>
    </div>
  `;

  const pool = $("#wordPool");

  shuffle([...GRAMMAR_ING]).forEach(item=>{
    const el = document.createElement("div");
    el.className = "chip";
    el.draggable = true;
    el.dataset.word = item.w;
    el.dataset.cat = item.cat;
    el.textContent = item.w;

    el.addEventListener("dragstart",(e)=>{
      e.dataTransfer.setData("text/plain", item.w);
    });

    pool.appendChild(el);
  });

  setupBin($("#binJust"));
  setupBin($("#binDouble"));
  setupBin($("#binDropE"));

  function setupBin(binEl){
    binEl.addEventListener("dragover",(e)=>{
      e.preventDefault();
      binEl.classList.add("dropOk");
    });

    binEl.addEventListener("dragleave",()=>{
      binEl.classList.remove("dropOk");
    });

    binEl.addEventListener("drop",(e)=>{
      e.preventDefault();
      binEl.classList.remove("dropOk");

      const w = e.dataTransfer.getData("text/plain");
      if(!w) return;

      handlePlace(w, binEl.dataset.cat);
    });
  }

  function handlePlace(word, cat){
    const chip = [...document.querySelectorAll(".chip")].find(x=>x.dataset.word === word);
    if(!chip) return;

    if(chip.dataset.cat === cat){
      let targetBox = $("#justItems");
      if(cat === "double") targetBox = $("#doubleItems");
      if(cat === "dropE") targetBox = $("#dropEItems");

      targetBox.appendChild(chip);
      chip.draggable = false;
      chip.style.cursor = "default";

      addCorrect(1);
    }else{
      addMistake();
      chip.classList.add("wrong");
      setTimeout(()=>chip.classList.remove("wrong"),600);
    }
  }
}

/* =========================
   READING
========================= */

function buildReadingQA(taskId){
  state.need = READING_QA.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="readingSplit">

      <div class="readingFixed">
        <div class="readingBox">
          ${READING_TEXT.split("\n").filter(Boolean).map(p=>`<p>${escapeHtml(p)}</p>`).join("")}
        </div>
      </div>

      <div class="readingQuestionsScroll">
        <div class="qList" id="qList"></div>
      </div>

    </div>
  `;

  const host = $("#qList");

  READING_QA.forEach((q, idx)=>{

    const row = document.createElement("div");
    row.className = "qRow";
    row.dataset.done = "0";

    const text = document.createElement("div");
    text.className = "qText";
    text.textContent = `${idx+1}) ${q.text}`;

    const btns = document.createElement("div");
    btns.className = "qBtns";

    shuffle([...q.opts]).forEach(opt=>{

      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = opt;

      b.addEventListener("click",()=>{

        if(row.dataset.done === "1") return;

        if(opt === q.ans){

          row.dataset.done = "1";
          b.classList.add("locked");

          [...btns.querySelectorAll(".opt")].forEach(x=>{
            x.disabled = true;

            if(x !== b){
              x.style.opacity = ".55";
            }
          });

          addCorrect(1);

        }else{

          addMistake();

          b.classList.add("wrong");

          setTimeout(()=>{
            b.classList.remove("wrong");
          },600);
        }
      });

      btns.appendChild(b);
    });

    row.appendChild(text);
    row.appendChild(btns);

    host.appendChild(row);
  });
}

function buildReadingGaps(taskId){

  const items = shuffle([...READING_GAPS]);

  state.need = items.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="taskScroll">

      <div class="readingDnD">

        <div class="gapOptions" id="gapOptions"></div>

        <div class="readingBox" id="gapText"></div>

      </div>

    </div>
  `;

  const textBox = $("#gapText");
  const optionsBox = $("#gapOptions");

  shuffle(items.map(x => x.ans)).forEach(ans=>{

    const chip = document.createElement("div");
    chip.className = "gapChip";
    chip.draggable = true;
    chip.dataset.answer = ans;
    chip.textContent = ans;

    chip.addEventListener("dragstart", e=>{
      e.dataTransfer.setData("text/plain", ans);
    });

    optionsBox.appendChild(chip);
  });
const textLine = document.createElement("div");
textLine.className = "gapTextLine";

items.forEach((gap, idx)=>{

  const span = document.createElement("span");

  span.innerHTML = `
    ${escapeHtml(gap.before)}
    <span class="gapDrop"
          data-answer="${escapeHtml(gap.ans)}"></span>
    ${escapeHtml(gap.after)}
  `;

  textLine.appendChild(span);
  textLine.appendChild(document.createTextNode(" "));
});

textBox.appendChild(textLine);

  document.querySelectorAll(".gapDrop").forEach(drop=>{

    drop.addEventListener("dragover", e=>{
      e.preventDefault();
      drop.classList.add("over");
    });

    drop.addEventListener("dragleave", ()=>{
      drop.classList.remove("over");
    });

    drop.addEventListener("drop", e=>{
      e.preventDefault();

      drop.classList.remove("over");

      if(drop.classList.contains("filled")) return;

      const got = e.dataTransfer.getData("text/plain");
      const need = drop.dataset.answer;

      const chip = [...document.querySelectorAll(".gapChip")]
        .find(c => c.dataset.answer === got);

      if(!chip) return;

      if(got === need){

        drop.textContent = got;
        drop.classList.add("filled");

        chip.classList.add("used");
        chip.draggable = false;

        addCorrect(1);

      }else{

        addMistake();

        drop.classList.add("wrong");
        chip.classList.add("wrong");

        setTimeout(()=>{
          drop.classList.remove("wrong");
          chip.classList.remove("wrong");
        }, 500);
      }
    });

  });

}
function buildReadingTrueFalse(taskId){
  state.need = READING_TRUE_FALSE.length;
  state.found = 0;
  state.mistakes = 0;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="readingTF">
      <div class="readingTFImageBox">
        <img src="${escapeHtml(READING_TF_IMAGE)}" alt="party scene" class="readingTFImage">
      </div>

      <div class="readingTFQuestions">
        <div class="qList" id="tfList"></div>
      </div>
    </div>
  `;

  const host = $("#tfList");
shuffle([...READING_TRUE_FALSE]).forEach((q, idx)=>{
    const row = document.createElement("div");
    row.className = "qRow";
    row.dataset.done = "0";

    const text = document.createElement("div");
    text.className = "qText";
    text.textContent = `${idx + 1}) ${q.text}`;

    const btns = document.createElement("div");
    btns.className = "qBtns";

    ["True","False"].forEach(opt=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = opt;

      b.addEventListener("click",()=>{
        if(row.dataset.done === "1") return;

        if(opt === q.ans){
          row.dataset.done = "1";
          b.classList.add("locked");

          [...btns.querySelectorAll(".opt")].forEach(x=>{
            x.disabled = true;
            if(x !== b) x.style.opacity = ".55";
          });

          addCorrect(1);
        }else{
          addMistake();
          b.classList.add("wrong");
          setTimeout(()=>b.classList.remove("wrong"),600);
        }
      });

      btns.appendChild(b);
    });

    row.appendChild(text);
    row.appendChild(btns);
    host.appendChild(row);
  });
}
function buildReadingMatch(taskId){

  const data = shuffle([...READING_MATCH]);

  const questions = shuffle(
    data.map(x => ({
      id:crypto.randomUUID(),
      text:x.question,
      answer:x.answer
    }))
  );

  const answers = shuffle(
    data.map(x => ({
      id:crypto.randomUUID(),
      text:x.answer
    }))
  );

  state.need = data.length;
  updateStats();

  $("#stageBody").innerHTML = `
    <div class="matchWrap">

      <div class="matchWords" id="matchQuestions"></div>

      <div class="matchList" id="matchAnswers"></div>

    </div>
  `;

  const qHost = $("#matchQuestions");
  const aHost = $("#matchAnswers");

  questions.forEach(q=>{

    const el = document.createElement("div");
    el.className = "matchWord";
    el.draggable = true;

    el.textContent = q.text;

    el.dataset.answer = q.answer;

    el.addEventListener("dragstart", e=>{
      e.dataTransfer.setData("text/plain", q.answer);
      e.dataTransfer.setData("question", q.text);
     
    });

    qHost.appendChild(el);
  });

  answers.forEach(a=>{

    const row = document.createElement("div");
    row.className = "matchRow";

    row.innerHTML = `
      <div class="matchDrop"></div>
      <div>${escapeHtml(a.text)}</div>
    `;

    const drop = row.querySelector(".matchDrop");

    drop.dataset.answer = a.text;

    drop.addEventListener("dragover", e=>{
      e.preventDefault();
      drop.classList.add("over");
    });

    drop.addEventListener("dragleave", ()=>{
      drop.classList.remove("over");
    });

    drop.addEventListener("drop", e=>{
      e.preventDefault();

      drop.classList.remove("over");

      if(drop.classList.contains("filled")) return;

      const draggedAnswer = e.dataTransfer.getData("text/plain");
      const draggedQuestion = e.dataTransfer.getData("question");

    if(draggedAnswer === drop.dataset.answer){

  drop.textContent = draggedQuestion;
  drop.classList.add("correct");

  const usedQuestion = [...document.querySelectorAll("#matchQuestions .matchWord")]
    .find(x => x.textContent === draggedQuestion);

  if(usedQuestion){
    usedQuestion.classList.add("used");
    usedQuestion.draggable = false;
  }

  addCorrect(1);

}else{
        drop.classList.add("wrong");

        addMistake();

        setTimeout(()=>{
          drop.classList.remove("wrong");
        },500);
      }
    });

    aHost.appendChild(row);
  });
}
/* =========================
   INIT
========================= */

renderHome();