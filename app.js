const topics = [
  ["AI in Learning", "Should students use AI tools for learning?", [["Personalized learning", ["customized learning paths", "track weak areas", "adjust difficulty", "study at their own pace"], ["personalized", "tailor-made", "progress", "weaknesses"]], ["Immediate feedback", ["correct grammar quickly", "notice repeated mistakes", "revise writing right away", "build confidence"], ["instant feedback", "grammar checker", "revision", "accuracy"]], ["Over-reliance risk", ["copy answers without thinking", "weaken problem-solving", "reduce originality", "trust wrong information"], ["over-reliant", "originality", "critical thinking", "misinformation"]]]],
  ["AI in Work and Society", "Does AI create more benefits or problems for society?", [["Public services", ["help doctors diagnose disease", "analyze data quickly", "support safer transport", "improve daily convenience"], ["diagnosis", "efficiency", "public services", "convenience"]], ["Jobs and productivity", ["automate repetitive work", "increase output", "create new tech jobs", "support innovation"], ["automation", "productivity", "innovation", "new industries"]], ["Social concerns", ["replace workers", "raise privacy concerns", "spread fake content", "increase inequality"], ["job displacement", "privacy", "fake content", "inequality"]]]],
  ["Social Media and Influencers", "Are social media influencers good for young people?", [["Information access", ["share useful tips", "introduce social issues", "explain trends in simple ways", "connect people with communities"], ["awareness", "platform", "community", "trend"]], ["Business and networking", ["support small brands", "create career chances", "help users build networks", "promote creative work"], ["marketing", "networking", "career", "promotion"]], ["Negative influence", ["create unrealistic lifestyles", "encourage overconsumption", "spread misinformation", "pressure teenagers"], ["unrealistic", "consumerism", "misinformation", "peer pressure"]]]],
  ["Interdisciplinary Courses", "Should students take courses from different fields?", [["Broader thinking", ["connect ideas from science, art, and society", "solve problems creatively", "avoid narrow learning"], ["interdisciplinary", "creative", "perspective", "problem-solving"]], ["Career preparation", ["match modern job needs", "build flexible skills", "communicate with different teams"], ["career-ready", "adaptability", "teamwork", "communication"]], ["Possible downside", ["less time for core subjects", "harder course planning", "may feel confusing for beginners"], ["core subjects", "planning", "confusing", "depth"]]]],
  ["Online vs. Traditional Classes", "Are online classes better than traditional classes?", [["Flexibility", ["study from any location", "review recorded lessons", "save commuting time", "learn at a personal pace"], ["flexible", "recorded lessons", "commuting", "self-paced"]], ["Classroom support", ["ask teachers directly", "join discussions easily", "stay focused", "build relationships"], ["interaction", "discussion", "focus", "support"]], ["Online challenges", ["delayed feedback", "internet problems", "distractions at home", "less social contact"], ["feedback", "technical issues", "distraction", "isolation"]]]],
  ["Printed vs. Online Reading", "Do students learn better from printed books or online reading?", [["Printed focus", ["reduce screen distraction", "support deep reading", "make notes by hand", "protect eye health"], ["printed books", "deep reading", "notes", "focus"]], ["Digital access", ["search information quickly", "carry many books", "use videos and links", "adjust font size"], ["online reading", "search function", "portable", "interactive"]], ["Digital drawbacks", ["more distractions", "eye strain", "unreliable sources", "shallow reading"], ["distraction", "eye strain", "credibility", "skimming"]]]],
  ["Studying Abroad", "Is studying abroad worth the cost?", [["Cultural growth", ["experience different lifestyles", "become open-minded", "learn independence", "build confidence"], ["cultural immersion", "independence", "confidence", "global mindset"]], ["Academic and career value", ["improve language skills", "learn new systems", "build global networks", "increase job prospects"], ["language proficiency", "academic system", "network", "employability"]], ["Challenges", ["high tuition", "culture shock", "homesickness", "language barriers"], ["financial burden", "culture shock", "isolation", "barrier"]]]],
  ["University Course Requirements", "Should universities require liberal arts or PE courses?", [["Whole-person education", ["develop communication", "build cultural awareness", "protect health", "reduce stress"], ["liberal arts", "physical education", "well-rounded", "well-being"]], ["Practical skills", ["practice teamwork", "manage stress", "think critically", "learn outside the major"], ["teamwork", "critical thinking", "stress management", "breadth"]], ["Student choice", ["requirements may waste time", "students need major courses", "fees and schedules can be difficult"], ["compulsory", "major", "schedule", "choice"]]]],
  ["Standardized Tests", "Should schools use standardized tests for admission?", [["Fair comparison", ["use the same standard", "compare many students", "measure basic skills", "support transparent admission"], ["uniform metric", "comparison", "basic skills", "transparent"]], ["Motivation and goals", ["give students a clear target", "show learning gaps", "prepare for academic pressure"], ["goal", "learning gap", "preparation", "performance"]], ["Limitations", ["increase stress", "ignore creativity", "favor test preparation", "do not show full ability"], ["test anxiety", "creativity", "inequality", "full potential"]]]],
  ["Cellphones in Class", "Should schools ban cellphones in class?", [["Better focus", ["reduce distractions", "help students listen", "improve classroom management", "support note-taking"], ["concentration", "distraction", "classroom management", "attention"]], ["Learning tool", ["research quickly", "use dictionaries", "join digital activities", "communicate in group work"], ["research", "dictionary", "digital tool", "collaboration"]], ["Balanced rule", ["allow phones for learning tasks", "ban social media during lessons", "teach digital responsibility"], ["policy", "responsibility", "limited use", "self-control"]]]],
  ["School Uniforms", "Should students be required to wear school uniforms?", [["Equality and focus", ["reduce visible wealth gaps", "avoid fashion pressure", "help students focus", "create school identity"], ["equality", "peer pressure", "identity", "focus"]], ["Safety and discipline", ["identify outsiders", "simplify morning routines", "create a professional environment"], ["safety", "routine", "discipline", "professional"]], ["Freedom of expression", ["limit individuality", "cost money", "may feel uncomfortable", "ignore diversity"], ["individuality", "cost", "comfort", "diversity"]]]],
  ["Electives vs. Required Credits", "Should schools offer more electives and fewer required courses?", [["Student interest", ["choose subjects they enjoy", "increase motivation", "discover career interests", "build confidence"], ["electives", "motivation", "career interest", "choice"]], ["Future skills", ["learn practical skills", "combine different fields", "prepare for changing jobs"], ["practical skills", "interdisciplinary", "future-ready", "creativity"]], ["Academic risk", ["miss core knowledge", "choose without guidance", "create scheduling problems"], ["core knowledge", "guidance", "academic rigor", "schedule"]]]],
  ["Economic Growth vs. Environment", "Which is more important: economic growth or environmental protection?", [["Economic growth", ["create jobs", "reduce poverty", "fund healthcare and education", "support innovation"], ["jobs", "living standards", "tax revenue", "innovation"]], ["Environmental protection", ["protect public health", "reduce pollution", "save resources", "prevent climate damage"], ["sustainability", "pollution", "resources", "climate"]], ["Balanced development", ["use green technology", "regulate harmful industries", "grow without wasting resources"], ["green growth", "regulation", "renewable energy", "balance"]]]],
  ["Electric vs. Traditional Cars", "Are electric cars better than traditional cars?", [["Electric vehicles", ["reduce air pollution", "lower fuel costs", "support green technology", "decrease oil dependence"], ["electric vehicles", "emissions", "green technology", "fuel costs"]], ["Traditional cars", ["cheaper to buy", "easy to refuel", "more repair options", "work well for long trips"], ["combustion vehicles", "affordable", "refuel", "maintenance"]], ["Transition issues", ["battery waste", "charging stations", "electricity sources", "high initial price"], ["battery", "charging infrastructure", "transition", "cost"]]]],
  ["Checkups vs. Healthy Diet", "Which matters more for health: regular checkups or a healthy diet?", [["Medical checkups", ["detect disease early", "receive professional advice", "track health changes", "prevent serious problems"], ["checkups", "early detection", "diagnosis", "prevention"]], ["Healthy diet", ["support daily energy", "control weight", "reduce disease risk", "build long-term habits"], ["balanced diet", "nutrition", "immune system", "lifestyle"]], ["Best combination", ["eat well every day", "use checkups for warning signs", "combine habits and medical care"], ["combination", "routine", "professional care", "long-term health"]]]],
  ["Dupe Culture and Trends", "Is dupe culture positive or negative?", [["Affordable access", ["let people enjoy trends cheaply", "support style experimentation", "increase consumer choice"], ["affordable", "trend", "consumer choice", "inclusive"]], ["Creativity and market", ["pressure brands to innovate", "support small businesses", "make fashion more democratic"], ["innovation", "small business", "market", "style"]], ["Ethical concerns", ["copy original designs", "lower quality", "encourage waste", "harm creative workers"], ["intellectual property", "quality", "overconsumption", "ethics"]]]],
  ["Stress and Leisure", "What is the best way for students to reduce stress?", [["Exercise", ["release tension", "improve mood", "protect health", "increase energy"], ["exercise", "stress relief", "mood", "energy"]], ["Clubs and friends", ["share problems", "receive emotional support", "build communication skills", "feel less isolated"], ["social support", "club", "connection", "resilience"]], ["Hobbies and entertainment", ["take a mental break", "enjoy music or movies", "balance study and life"], ["hobby", "balance", "relaxation", "motivation"]]]],
  ["Travel and Gap Year", "Should young people travel or take a gap year before university?", [["Personal growth", ["become independent", "learn real-world skills", "meet different cultures", "gain confidence"], ["gap year", "independence", "cultural awareness", "confidence"]], ["Travel options", ["solo travel builds self-reliance", "group tours reduce planning stress", "travel stimulates creativity"], ["solo travel", "group tour", "planning", "creativity"]], ["Risks", ["costs money", "may delay study", "safety concerns", "possible loneliness"], ["financial cost", "delay", "safety", "loneliness"]]]],
  ["Environment and Natural Disasters", "How should people protect the environment and prepare for disasters?", [["Daily protection", ["reduce plastic waste", "use public transport", "save energy", "recycle properly"], ["plastic waste", "public transportation", "recycling", "energy saving"]], ["Government action", ["build warning systems", "teach emergency drills", "invest in green infrastructure"], ["warning system", "emergency drill", "infrastructure", "policy"]], ["Community readiness", ["prepare emergency kits", "support neighbors", "share reliable information"], ["preparedness", "emergency kit", "community support", "reliable information"]]]],
  ["Learning Skills and Languages", "Why should people learn new skills or foreign languages?", [["Personal development", ["keep the brain active", "build curiosity", "become more flexible", "solve problems better"], ["cognitive flexibility", "curiosity", "lifelong learning", "problem-solving"]], ["Career value", ["increase employability", "communicate internationally", "join global projects", "stand out in interviews"], ["employability", "bilingual", "global", "competitive advantage"]], ["Challenges", ["takes time", "requires practice", "can feel frustrating", "needs clear goals"], ["practice", "discipline", "motivation", "goal"]]]],
  ["Volunteering", "Should students spend time volunteering?", [["Community benefit", ["help people in need", "support local organizations", "make society warmer"], ["community service", "support", "responsibility", "kindness"]], ["Personal growth", ["develop empathy", "build confidence", "learn teamwork", "reduce stress"], ["empathy", "teamwork", "purpose", "well-being"]], ["Time pressure", ["may affect study time", "requires planning", "some work is emotionally difficult"], ["time management", "pressure", "balance", "commitment"]]]],
  ["Part-Time Jobs for Students", "Should university students have part-time jobs?", [["Work experience", ["practice communication", "learn responsibility", "explore careers", "build confidence"], ["part-time job", "work experience", "responsibility", "career"]], ["Financial benefit", ["earn income", "reduce family pressure", "learn budgeting", "understand money management"], ["income", "financial burden", "budgeting", "financial literacy"]], ["Study pressure", ["less time for homework", "possible fatigue", "schedule conflicts", "stress and burnout"], ["academic performance", "fatigue", "schedule conflict", "burnout"]]]],
  ["Online Shopping and Payment", "Is online shopping good for consumers?", [["Convenience", ["buy products quickly", "compare prices", "access global markets", "track spending"], ["convenience", "transaction", "global market", "efficiency"]], ["Business growth", ["support small sellers", "expand customer reach", "offer personalized recommendations"], ["e-commerce", "small business", "recommendation", "market"]], ["Risks", ["privacy leaks", "identity theft", "impulse buying", "packaging waste"], ["privacy", "cybersecurity", "overconsumption", "waste"]]]],
  ["Targeted Advertising", "Is targeted advertising helpful or harmful?", [["Business efficiency", ["reach the right consumers", "reduce marketing costs", "increase sales", "support small companies"], ["targeted advertising", "consumer segment", "marketing", "sales"]], ["User experience", ["show relevant products", "save search time", "match personal needs"], ["personalized", "recommendation", "preference", "relevant"]], ["Privacy and manipulation", ["collect personal data", "shape choices secretly", "cause digital fatigue", "encourage overbuying"], ["personal data", "privacy", "manipulation", "digital fatigue"]]]],
  ["Changing Laws: Voting Age and Equality", "Should governments change laws about voting age or equality?", [["Youth participation", ["encourage civic engagement", "represent young people", "teach responsibility", "include future-focused voices"], ["voting age", "civic engagement", "representation", "responsibility"]], ["Equality laws", ["protect different groups", "reduce discrimination", "make society fairer"], ["equality", "rights", "discrimination", "fairness"]], ["Concerns", ["young voters may lack experience", "laws may be hard to enforce", "change can create public debate"], ["maturity", "enforcement", "public debate", "legal responsibility"]]]],
  ["Military Service", "Should young people be required to do military service?", [["National defense", ["prepare enough manpower", "protect national security", "respond to emergencies"], ["conscription", "national defense", "security", "preparedness"]], ["Personal discipline", ["learn teamwork", "build physical fitness", "develop responsibility", "increase unity"], ["discipline", "teamwork", "civic responsibility", "unity"]], ["Personal freedom", ["interrupt education", "delay careers", "create stress", "limit personal choice"], ["career plans", "stress", "freedom", "resource cost"]]]],
  ["Government Intervention", "Should the government intervene to boost the economy?", [["Crisis support", ["stabilize markets", "protect jobs", "give stimulus funds", "prevent business collapse"], ["intervention", "stimulus", "market stability", "jobs"]], ["Industry protection", ["support local companies", "use tariffs carefully", "invest in infrastructure", "fund innovation"], ["tariff", "domestic industry", "infrastructure", "innovation"]], ["Free market concern", ["too much control reduces competition", "tax money may be wasted", "businesses may depend on support"], ["competition", "tax burden", "dependency", "efficiency"]]]],
].map(([title, prompt, viewpoints]) => ({ title, prompt, viewpoints: viewpoints.map(([title, bullets, keywords]) => ({ title, bullets, keywords })) }));

const topicList = document.querySelector("#topicList");
const topicCount = document.querySelector("#topicCount");
const searchInput = document.querySelector("#searchInput");
const promptText = document.querySelector("#promptText");
const viewpointGrid = document.querySelector("#viewpointGrid");
const readPromptBtn = document.querySelector("#readPromptBtn");
const timeSelect = document.querySelector("#timeSelect");
const timerDisplay = document.querySelector("#timerDisplay");
const recordBtn = document.querySelector("#recordBtn");
const stopBtn = document.querySelector("#stopBtn");
const clearBtn = document.querySelector("#clearBtn");
const sendBtn = document.querySelector("#sendBtn");
const transcript = document.querySelector("#transcript");
const speechStatus = document.querySelector("#speechStatus");
const audioPlayback = document.querySelector("#audioPlayback");
const resultsPanel = document.querySelector("#resultsPanel");
const gradeBadge = document.querySelector("#gradeBadge");
const correctedText = document.querySelector("#correctedText");
const feedbackList = document.querySelector("#feedbackList");
const upgradedSample = document.querySelector("#upgradedSample");
const exportBtn = document.querySelector("#exportBtn");

let activeTopic = topics[0];
let timer = null;
let remainingSeconds = Number(timeSelect.value);
let recognition = null;
let finalTranscript = "";
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentOriginalReference = "";

function recordingSupport() {
  return {
    speechRecognition: Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
    microphone: Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    mediaRecorder: Boolean(window.MediaRecorder),
  };
}

function setStatus(message, kind = "") {
  speechStatus.textContent = message;
  speechStatus.className = `status-text ${kind}`.trim();
}

function formatTime(total) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = Math.floor(total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function allKeywords(topic = activeTopic) {
  return topic.viewpoints.flatMap(view => view.keywords);
}

function targetWords(seconds) {
  if (seconds <= 30) return 65;
  if (seconds <= 45) return 85;
  if (seconds <= 60) return 115;
  if (seconds <= 90) return 155;
  if (seconds <= 120) return 200;
  return 250;
}

function chooseBestViewpoint(payload) {
  const lower = payload.transcript.toLowerCase();
  let best = payload.viewpoints[0];
  let bestScore = -1;
  payload.viewpoints.forEach(view => {
    const keywordScore = view.keywords.filter(word => lower.includes(word.toLowerCase())).length * 2;
    const bulletScore = view.bullets.filter(item => item.toLowerCase().split(/\W+/).filter(word => word.length > 5).some(word => lower.includes(word))).length;
    const score = keywordScore + bulletScore;
    if (score > bestScore) {
      best = view;
      bestScore = score;
    }
  });
  return best;
}

function polishStudentText(text) {
  return text
    .replace(/\bi think\b/gi, "I believe")
    .replace(/\bai\b/g, "AI")
    .replace(/\bi\b/g, "I")
    .replace(/\ba lot of\b/gi, "many")
    .replace(/\bkids\b/gi, "students")
    .replace(/\bstuff\b/gi, "learning materials")
    .replace(/\bthings\b/gi, "factors")
    .replace(/\bgood\b/gi, "beneficial")
    .replace(/\bbad\b/gi, "harmful")
    .replace(/\bget better\b/gi, "improve")
    .replace(/\bhelp them\b/gi, "help learners")
    .replace(/\bsupport learners improve\b/gi, "help learners improve")
    .replace(/\bfaster\b/gi, "more efficiently")
    .trim();
}

function promptTopicText(prompt) {
  return prompt
    .replace(/^should students use /i, "using ")
    .replace(/^should students /i, "students should ")
    .replace(/^are /i, "")
    .replace(/^is /i, "")
    .replace(/^do /i, "")
    .replace(/\?$/, "")
    .replace(/\bai\b/gi, "AI")
    .toLowerCase()
    .replace(/\bai\b/g, "AI");
}

function canPhrase(note) {
  const text = String(note || "").trim();
  const lower = text.toLowerCase();
  if (!text) return "develop a clearer answer";
  if (lower.startsWith("customized ") || lower.startsWith("personalized ")) return `create ${lower}`;
  if (lower.startsWith("better ")) return `build ${lower}`;
  if (lower.startsWith("high ")) return `access ${lower}`;
  if (lower.startsWith("lower ")) return `enjoy ${lower}`;
  if (lower.startsWith("cheaper ")) return `choose ${lower}`;
  if (/^(reduce|improve|support|protect|increase|develop|build|track|adjust|study|learn|revise|avoid|save|use|receive|prepare|connect|communicate|practice|earn|compare|access|share|give|make)\b/.test(lower)) return lower;
  return `develop ${lower}`;
}

function renderTopics() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = topics.filter(topic => {
    const haystack = [topic.title, topic.prompt, ...allKeywords(topic)].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  topicCount.textContent = `${filtered.length} shown`;
  topicList.innerHTML = "";
  filtered.forEach(topic => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.textContent = topic.title;
    button.setAttribute("aria-current", topic === activeTopic ? "true" : "false");
    button.addEventListener("click", () => {
      activeTopic = topic;
      finalTranscript = "";
      renderTopics();
      renderActiveTopic();
    });
    topicList.append(button);
  });
}

function renderActiveTopic() {
  promptText.textContent = activeTopic.prompt;
  upgradedSample.textContent = "Loading matching original Google Doc section...";
  viewpointGrid.innerHTML = "";
  activeTopic.viewpoints.forEach(view => {
    const section = document.createElement("section");
    section.className = "viewpoint";
    section.innerHTML = `
      <h3>${view.title}</h3>
      <ul>${view.bullets.map(item => `<li>${item}</li>`).join("")}</ul>
      <div class="keywords">${view.keywords.map(word => `<span class="keyword">${word}</span>`).join("")}</div>
    `;
    viewpointGrid.append(section);
  });
  loadOriginalReference();
}

async function loadOriginalReference() {
  try {
    const response = await fetch(`/api/original?topic=${encodeURIComponent(activeTopic.title)}`);
    if (!response.ok) throw new Error("server reference unavailable");
    const data = await response.json();
    currentOriginalReference = data.excerpt || "";
    upgradedSample.textContent = currentOriginalReference || "No matching original Google Doc section was found.";
  } catch (error) {
    try {
      const staticResponse = await fetch("data/original-references.json");
      if (!staticResponse.ok) throw new Error("static reference unavailable");
      const references = await staticResponse.json();
      currentOriginalReference = references[activeTopic.title] || "";
      upgradedSample.textContent = currentOriginalReference || "No matching original Google Doc section was found.";
    } catch (staticError) {
      currentOriginalReference = "";
      upgradedSample.textContent = `Could not load the original Google Doc section: ${staticError.message}`;
    }
  }
}

function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  remainingSeconds = Number(timeSelect.value);
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  resetTimer();
  timer = setInterval(() => {
    remainingSeconds -= 1;
    timerDisplay.textContent = formatTime(Math.max(remainingSeconds, 0));
    if (remainingSeconds <= 0) stopRecording();
  }, 1000);
}

function setupRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const instance = new SpeechRecognition();
  instance.lang = "en-US";
  instance.continuous = true;
  instance.interimResults = true;
  instance.onresult = event => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const text = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += `${text.trim()} `;
      } else {
        interim += text;
      }
    }
    transcript.value = `${finalTranscript}${interim}`.trim();
  };
  instance.onerror = event => {
    if (["not-allowed", "service-not-allowed", "audio-capture"].includes(event.error)) {
      stopRecording(`Speech typing was blocked by this browser (${event.error}). Open http://localhost:5174 in Chrome or Edge and allow microphone access, or type your answer manually.`, "warning");
      return;
    }
    setStatus(`Speech typing paused: ${event.error}. Audio recording may still continue, and you can type or edit the answer.`, "warning");
  };
  instance.onend = () => {
    if (isRecording) {
      try {
        instance.start();
      } catch {
        setStatus("Speech typing stopped. Audio recording may still continue, and you can type your answer.", "warning");
      }
    }
  };
  return instance;
}

async function startAudioRecording() {
  const support = recordingSupport();
  if (!support.microphone || !support.mediaRecorder) {
    return false;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioChunks = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) audioChunks.push(event.data);
  };
  mediaRecorder.onstop = () => {
    stream.getTracks().forEach(track => track.stop());
    if (!audioChunks.length) return;
    const blob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
    audioPlayback.src = URL.createObjectURL(blob);
    audioPlayback.hidden = false;
  };
  mediaRecorder.start();
  return true;
}

async function startRecording() {
  const support = recordingSupport();
  if (!support.speechRecognition && !support.microphone) {
    setStatus("This browser cannot access microphone recording or live speech typing. Please open http://localhost:5174 in Chrome or Edge, or type your answer in the transcript box.", "warning");
    return;
  }

  recognition = recognition || setupRecognition();
  finalTranscript = transcript.value ? `${transcript.value.trim()} ` : "";
  recordBtn.disabled = true;
  stopBtn.disabled = false;
  audioPlayback.hidden = true;
  audioPlayback.removeAttribute("src");
  isRecording = true;
  setStatus("Starting microphone...", "active");
  startTimer();

  let audioStarted = false;
  try {
    audioStarted = await startAudioRecording();
  } catch (error) {
    setStatus(`Microphone permission was blocked or unavailable: ${error.message}. You can still type your answer.`, "warning");
  }

  if (recognition) {
    try {
      recognition.start();
      setStatus(audioStarted ? "Recording audio and typing your speech live..." : "Typing your speech live. Audio recording is not available in this browser.", "active");
    } catch {
      setStatus(audioStarted ? "Recording audio. Live speech typing did not start, so type or edit the transcript after speaking." : "Speech typing is already active.", "warning");
    }
  } else {
    setStatus(audioStarted ? "Recording audio. This browser does not support live voice typing, so type or edit the transcript after speaking." : "This browser does not support live speech typing. You can type your response.", "warning");
  }
}

function stopRecording(message = "Stopped. Review your transcript, then send it for grading.", kind = "") {
  clearInterval(timer);
  timer = null;
  isRecording = false;
  recordBtn.disabled = false;
  stopBtn.disabled = true;
  setStatus(message, kind);
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  mediaRecorder = null;
  if (recognition) {
    recognition.onend = null;
    try {
      recognition.stop();
    } catch {
      // The browser may already have stopped speech recognition.
    }
    recognition = null;
  }
}

async function sendForGrading() {
  const text = transcript.value.trim();
  if (!text) {
    speechStatus.textContent = "Please record or type a response before sending.";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Grading...";
  const payload = {
    topic: activeTopic.title,
    prompt: activeTopic.prompt,
    transcript: text,
    seconds: Number(timeSelect.value),
    keywords: allKeywords(),
    viewpoints: activeTopic.viewpoints,
  };

  try {
    const response = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Grading failed");
    renderResults(result);
  } catch (error) {
    renderResults(localGrade(payload));
    speechStatus.textContent = `Used local grading because AI grading was unavailable: ${error.message}`;
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send for Grading";
  }
}

function localGrade(payload) {
  const text = payload.transcript;
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const used = payload.keywords.filter(keyword => lower.includes(keyword.toLowerCase()));
  const markers = ["because", "for example", "as a result", "overall", "however", "therefore"].filter(marker => lower.includes(marker));
  const view = chooseBestViewpoint(payload);
  const score = Math.min(100, 62 + used.length * 4 + markers.length * 5 + Math.min(20, Math.floor(words.length / 6)));
  const polished = polishStudentText(text);
  const mainKeyword = view.title.toLowerCase() || view.keywords[0];
  const example = canPhrase(view.bullets[0] || "apply this idea in a real situation");
  const effect = canPhrase(view.bullets[view.bullets.length - 1] || "create a stronger result");
  return {
    score,
    band: score >= 90 ? "Excellent" : score >= 78 ? "Strong" : score >= 65 ? "Good" : score >= 50 ? "Developing" : "Needs Support",
    correctedText: `Argument: I believe ${promptTopicText(payload.prompt)} is important, especially because it is connected to ${mainKeyword}. Explanation: ${polished} Concrete example: For example, students can ${example}, which makes the idea easier to understand in daily life. Effect: As a result, they can ${effect}, and the answer becomes more specific. Wrap-up: Overall, this response is stronger with clear structure, polished vocabulary, and one concrete example.`,
    feedback: [
      markers.length ? `Structure: You used ${markers.join(", ")}. To sound more test-ready, organize it as Argument -> Explanation -> Concrete example -> Effect -> Wrap-up.` : "Structure: Add clear structure words such as because, for example, as a result, and overall.",
      used.length ? `Vocabulary/Formality: You used topic vocabulary: ${used.slice(0, 5).join(", ")}. Replace casual words with more polished terms when possible.` : "Vocabulary/Formality: Use more topic vocabulary from the viewpoint grid and avoid vague words such as good, bad, stuff, and things.",
      words.length < targetWords(payload.seconds) * 0.55 ? `Development: For ${payload.seconds} seconds, this is a bit short. Add one concrete example and one effect sentence.` : "Development: The response length is suitable. Make the example more concrete and connected to the prompt.",
      `Teacher focus: Your strongest content direction is "${view.title}". Build the whole answer around this one viewpoint.`,
    ],
    upgradedSample: buildModelResponse(payload.prompt, payload.seconds, view),
  };
}

function buildModelResponse(prompt, seconds, view) {
  const keywords = view.keywords || [];
  const bullets = view.bullets || [];
  const kw1 = keywords[0] || view.title.toLowerCase();
  const kw2 = keywords[1] || "practical benefits";
  const b1 = canPhrase(bullets[0] || "handle the situation more effectively");
  const b2 = canPhrase(bullets[1] || "make better decisions");
  const b3 = canPhrase(bullets[2] || "achieve a positive result");
  const b4 = canPhrase(bullets[3] || "develop stronger confidence");

  if (seconds <= 45) {
    return `Argument: I believe ${view.title.toLowerCase()} is the strongest point for this topic. Explanation: It matters because it gives students a clear and practical benefit. Concrete example: For example, when students answer "${prompt}", they can explain how people can ${b1} and ${b2}. Effect: As a result, the answer becomes more specific and easier to follow. Wrap-up: Overall, ${kw1} is useful because it helps students give a focused and confident response.`;
  }

  if (seconds <= 75) {
    return `Argument: I believe ${view.title.toLowerCase()} is the strongest viewpoint for this topic. Explanation: The main reason is that it gives students a practical way to discuss the issue with clear content and useful vocabulary, such as ${kw1} and ${kw2}. Concrete example: For example, when students answer "${prompt}", they can say that people can ${b1}. They can also mention that this helps them ${b2}. Effect: As a result, the response sounds more organized, realistic, and convincing. Wrap-up: Overall, this viewpoint is effective because it combines a clear argument, a concrete example, and a meaningful result within a short speaking time.`;
  }

  return `Argument: I believe ${view.title.toLowerCase()} is a strong and reasonable viewpoint for this topic. Explanation: This idea is important because it connects the question to a real situation and gives students enough content to develop their answer. Instead of only saying the topic is good or bad, students can use more precise words such as ${kw1}, ${kw2}, and ${keywords[2] || "long-term improvement"}. Concrete example: For example, when answering "${prompt}", a student could explain that people can ${b1}. In addition, they may ${b2}, so the benefit becomes easier to understand. Effect: As a result, this viewpoint can ${b3}, and it may also help people ${b4}. This makes the answer sound more complete and more academic. Wrap-up: Overall, a full-mark response should present one clear argument, explain the reason, give a concrete example, describe the effect, and end with a confident conclusion.`;
}

function renderResults(result) {
  resultsPanel.hidden = false;
  gradeBadge.textContent = `${result.score}/100 ${result.band || ""}`.trim();
  correctedText.textContent = result.correctedText || "";
  feedbackList.innerHTML = "";
  (result.feedback || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackList.append(li);
  });
  upgradedSample.textContent = result.upgradedSample || currentOriginalReference || "";
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportResult() {
  const content = [
    "iTEP Speaking Practice Result",
    `Topic: ${activeTopic.title}`,
    `Prompt: ${activeTopic.prompt}`,
    "",
    "Transcript:",
    transcript.value.trim(),
    "",
    "Corrected Text:",
    correctedText.textContent.trim(),
    "",
    "Feedback:",
    [...feedbackList.querySelectorAll("li")].map(li => `- ${li.textContent}`).join("\n"),
    "",
    "Upgraded Sample:",
    upgradedSample.textContent.trim(),
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${activeTopic.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-speaking-result.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

readPromptBtn.addEventListener("click", () => {
  const words = activeTopic.viewpoints
    .map(view => `${view.title}. ${view.bullets.join(". ")}. Key words: ${view.keywords.join(", ")}.`)
    .join(" ");
  speak(`${activeTopic.prompt}. ${words}`);
});
timeSelect.addEventListener("change", resetTimer);
recordBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);
clearBtn.addEventListener("click", () => {
  transcript.value = "";
  finalTranscript = "";
  resultsPanel.hidden = true;
  audioPlayback.hidden = true;
  audioPlayback.removeAttribute("src");
  resetTimer();
});
sendBtn.addEventListener("click", sendForGrading);
searchInput.addEventListener("input", renderTopics);
exportBtn.addEventListener("click", exportResult);

renderTopics();
renderActiveTopic();
resetTimer();

const support = recordingSupport();
if (!support.speechRecognition && !support.microphone) {
  setStatus("This browser does not support microphone recording or live speech typing. Open this same link in Chrome or Edge for recording, or type in the transcript box.", "warning");
} else if (!support.speechRecognition) {
  setStatus("Microphone recording is available, but live voice typing is not supported in this browser. Chrome or Edge is recommended.", "warning");
} else if (!support.microphone) {
  setStatus("Live voice typing is available, but audio recording is not available in this browser.", "warning");
}
