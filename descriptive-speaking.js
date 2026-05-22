const topicList = document.querySelector("#topicList");
const topicCount = document.querySelector("#topicCount");
const searchInput = document.querySelector("#searchInput");
const categoryTabs = document.querySelector("#categoryTabs");
const categoryLabel = document.querySelector("#categoryLabel");
const promptText = document.querySelector("#promptText");
const modelAnswer = document.querySelector("#modelAnswer");
const keywordGrid = document.querySelector("#keywordGrid");
const readPromptBtn = document.querySelector("#readPromptBtn");
const readKeywordsBtn = document.querySelector("#readKeywordsBtn");
const timeSelect = document.querySelector("#timeSelect");
const timerDisplay = document.querySelector("#timerDisplay");
const recordBtn = document.querySelector("#recordBtn");
const stopBtn = document.querySelector("#stopBtn");
const clearBtn = document.querySelector("#clearBtn");
const sendBtn = document.querySelector("#sendBtn");
const gptBotBtn = document.querySelector("#gptBotBtn");
const transcript = document.querySelector("#transcript");
const speechStatus = document.querySelector("#speechStatus");
const botStatus = document.querySelector("#botStatus");
const audioPlayback = document.querySelector("#audioPlayback");
const resultsPanel = document.querySelector("#resultsPanel");
const gradeBadge = document.querySelector("#gradeBadge");
const feedbackList = document.querySelector("#feedbackList");
const correctedText = document.querySelector("#correctedText");
const upgradedSample = document.querySelector("#upgradedSample");

const ieltsBotUrl = "https://chatgpt.com/g/g-2DNF8ArXs-grade-your-ielts-speaking";
const categories = ["All", ...new Set(descriptivePrompts.map(item => item.category))];
let activeCategory = "All";
let activePrompt = descriptivePrompts[0];
let timer = null;
let remainingSeconds = Number(timeSelect.value);
let recognition = null;
let finalTranscript = "";
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

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

function setBotStatus(message, kind = "") {
  botStatus.textContent = message;
  botStatus.className = `status-text compact ${kind}`.trim();
}

function formatTime(total) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = Math.floor(total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function speak(text, rate = 0.88) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function filteredPrompts() {
  const query = searchInput.value.trim().toLowerCase();
  return descriptivePrompts.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const haystack = [item.category, item.title, item.prompt, item.model, ...item.keywords].join(" ").toLowerCase();
    return categoryMatch && haystack.includes(query);
  });
}

function renderCategories() {
  categoryTabs.innerHTML = "";
  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-tab";
    button.textContent = category;
    button.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
    button.addEventListener("click", () => {
      activeCategory = category;
      const first = filteredPrompts()[0];
      if (first) activePrompt = first;
      renderCategories();
      renderTopics();
      renderActivePrompt();
    });
    categoryTabs.append(button);
  });
}

function renderTopics() {
  const prompts = filteredPrompts();
  topicCount.textContent = `${prompts.length} shown`;
  topicList.innerHTML = "";
  prompts.forEach(item => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.innerHTML = `<strong>${item.title}</strong><br><span>${item.category}</span>`;
    button.setAttribute("aria-current", item === activePrompt ? "true" : "false");
    button.addEventListener("click", () => {
      activePrompt = item;
      finalTranscript = "";
      renderTopics();
      renderActivePrompt();
    });
    topicList.append(button);
  });
}

function renderActivePrompt() {
  categoryLabel.textContent = activePrompt.category;
  promptText.textContent = activePrompt.prompt;
  modelAnswer.textContent = activePrompt.model;
  keywordGrid.innerHTML = "";
  activePrompt.keywords.forEach(word => {
    const span = document.createElement("span");
    span.className = "keyword";
    span.textContent = word;
    keywordGrid.append(span);
  });
  upgradedSample.textContent = activePrompt.model;
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
      if (event.results[i].isFinal) finalTranscript += `${text.trim()} `;
      else interim += text;
    }
    transcript.value = `${finalTranscript}${interim}`.trim();
  };
  instance.onerror = event => {
    if (["not-allowed", "service-not-allowed", "audio-capture"].includes(event.error)) {
      stopRecording(`Speech typing was blocked by this browser (${event.error}). Open this page in Chrome or Edge and allow microphone access, or type manually.`, "warning");
      return;
    }
    setStatus(`Speech typing paused: ${event.error}. You can continue by typing.`, "warning");
  };
  instance.onend = () => {
    if (isRecording) {
      try {
        instance.start();
      } catch {
        setStatus("Speech typing stopped. Audio recording may still continue.", "warning");
      }
    }
  };
  return instance;
}

async function startAudioRecording() {
  const support = recordingSupport();
  if (!support.microphone || !support.mediaRecorder) return false;
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
    setStatus("This browser cannot access recording or live speech typing. Please use Chrome or Edge, or type your response.", "warning");
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
    setStatus(`Microphone permission was blocked or unavailable: ${error.message}. You can still type.`, "warning");
  }

  if (recognition) {
    try {
      recognition.start();
      setStatus(audioStarted ? "Recording audio and typing your speech live..." : "Typing your speech live. Audio recording is not available.", "active");
    } catch {
      setStatus(audioStarted ? "Recording audio. Live typing did not start, so type or edit after speaking." : "Speech typing is already active.", "warning");
    }
  } else {
    setStatus(audioStarted ? "Recording audio. Live voice typing is not supported here, so type or edit after speaking." : "Type your response manually.", "warning");
  }
}

function stopRecording(message = "Stopped. Review your transcript, then send it for feedback.", kind = "") {
  clearInterval(timer);
  timer = null;
  isRecording = false;
  recordBtn.disabled = false;
  stopBtn.disabled = true;
  setStatus(message, kind);
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  mediaRecorder = null;
  if (recognition) {
    recognition.onend = null;
    try {
      recognition.stop();
    } catch {
      // Already stopped.
    }
    recognition = null;
  }
}

function localFeedback() {
  const text = transcript.value.trim();
  if (!text) {
    setStatus("Please record or type a response first.", "warning");
    return;
  }
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const used = activePrompt.keywords.filter(word => lower.includes(word.toLowerCase()));
  const structureMarkers = ["I would like to talk about", "because", "whenever", "for example", "thanks to", "as a result", "overall"].filter(marker => lower.includes(marker.toLowerCase()));
  const targetWords = Number(timeSelect.value) <= 45 ? 90 : 110;
  const score = Math.min(100, 60 + used.length * 2 + structureMarkers.length * 4 + Math.min(18, Math.floor(words.length / 6)));

  gradeBadge.textContent = `${score}/100`;
  feedbackList.innerHTML = "";
  [
    structureMarkers.length ? `Structure: Good. You used ${structureMarkers.join(", ")}. Try to follow this order: opening, details, feeling/reason, ending.` : "Structure: Add clearer sequence words such as first, what I like most, for example, because, and overall.",
    used.length ? `Vocabulary: You used ${used.slice(0, 8).join(", ")}. Add 2-3 more high-yield phrases from the model.` : "Vocabulary: Try to reuse phrases from the key word list, not only simple words.",
    words.length < targetWords * 0.65 ? `Development: Your answer is short for this time limit. Add one extra detail and one feeling/reason sentence.` : "Development: The response length is suitable. Make sure every detail connects to the prompt.",
  ].forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackList.append(li);
  });

  correctedText.textContent = `Opening: I would like to talk about ${activePrompt.title.toLowerCase()}.\nDetails: Add who/what/where/when clearly.\nReason or feeling: Explain why it is special, useful, meaningful, or memorable.\nEnding: Finish with one personal reflection, such as what you learned or why you still remember it.`;
  upgradedSample.textContent = activePrompt.model;
  resultsPanel.hidden = false;
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildBotPrompt() {
  return `Please grade and revise my descriptive speaking response.

Test style: iTEP Speaking Part 1 / IELTS-style descriptive speaking
Target level: CEFR B1
Prompt: ${activePrompt.prompt}
Time limit: ${timeSelect.value} seconds

My voice-typed response:
${transcript.value.trim()}

Reference model answer:
${activePrompt.model}

Useful key words and phrases:
${activePrompt.keywords.join(", ")}

Please provide:
1. A fair B1-level speaking score. Do not be overly strict.
2. Organized feedback on fluency/coherence, vocabulary, grammar, and topic development.
3. A polished revision of my original response. Keep my meaning, but add structure words and improve casual or unclear expressions.
4. A full-mark model answer within the same time limit.
5. Useful phrases I should reuse next time.`;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const box = document.createElement("textarea");
  box.value = text;
  box.style.position = "fixed";
  box.style.left = "-9999px";
  document.body.append(box);
  box.focus();
  box.select();
  const ok = document.execCommand("copy");
  box.remove();
  return ok;
}

async function openIeltsBot() {
  if (!transcript.value.trim()) {
    setBotStatus("Please record, voice-type, or type a response first.", "warning");
    transcript.focus();
    return;
  }
  try {
    const copied = await copyText(buildBotPrompt());
    setBotStatus(copied ? "Copied. The IELTS grading bot is opening. Paste the prompt into ChatGPT." : "Could not copy automatically. Please copy manually.", copied ? "active" : "warning");
  } catch (error) {
    setBotStatus(`Copy was blocked: ${error.message}. You can manually copy your response.`, "warning");
  }
  window.open(ieltsBotUrl, "_blank", "noopener,noreferrer");
}

readPromptBtn.addEventListener("click", () => speak(`${activePrompt.prompt}. Model answer. ${activePrompt.model}`));
readKeywordsBtn.addEventListener("click", () => speak(activePrompt.keywords.join(". "), 0.82));
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
sendBtn.addEventListener("click", localFeedback);
gptBotBtn.addEventListener("click", openIeltsBot);
searchInput.addEventListener("input", () => {
  renderTopics();
});

renderCategories();
renderTopics();
renderActivePrompt();
resetTimer();

const support = recordingSupport();
if (!support.speechRecognition && !support.microphone) {
  setStatus("This browser does not support microphone recording or live speech typing. Open this page in Chrome or Edge, or type manually.", "warning");
} else if (!support.speechRecognition) {
  setStatus("Microphone recording is available, but live voice typing is not supported in this browser. Chrome or Edge is recommended.", "warning");
}
