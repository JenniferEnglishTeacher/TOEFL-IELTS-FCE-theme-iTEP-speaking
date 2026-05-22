const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 5174);
const sourcePath = path.join(root, "..", "source_google_doc_export.txt");

const topicAliases = {
  "AI in Learning": ["AI on learning", "Positive Influences of AI on Education/Learning and Teaching", "Positive Influences of AI on Learning/Education"],
  "AI in Work and Society": ["AI work/society", "Positive Influences of AI on Society", "Positive Influences of AI on Work/Jobs"],
  "Social Media and Influencers": ["social media", "Positive Influences of Social Media Influencers"],
  "Interdisciplinary Courses": ["Interdisciplinary Courses"],
  "Online vs. Traditional Classes": ["Online/traditional Classes", "Online Classes", "Traditional Courses"],
  "Printed vs. Online Reading": ["printed/online reading", "Printed Books", "Online Reading"],
  "Studying Abroad": ["school courses teach test campus", "Benefits of Studying Abroad"],
  "University Course Requirements": ["Downsides of Taking Liberal Arts Courses", "Downsides of Taking PE Courses"],
  "Standardized Tests": ["Traditional Tests", "standardized tests"],
  "Cellphones in Class": ["Benefits of Limiting or Banning Cellphone Use in Class"],
  "School Uniforms": ["Benefits of Requiring School Uniforms"],
  "Electives vs. Required Credits": ["Benefits of Introducing More Electives"],
  "Economic Growth vs. Environment": ["economics VS environment", "Economic growth VS environment"],
  "Electric vs. Traditional Cars": ["electric or traditional cars"],
  "Checkups vs. Healthy Diet": ["checkups VS diet"],
  "Dupe Culture and Trends": ["culture social trend", "Benefits of Dupe Culture"],
  "Stress and Leisure": ["leisure music movie PE stress"],
  "Travel and Gap Year": ["travel gap year"],
  "Environment and Natural Disasters": ["natural disaster", "Environment", "Protecting the Environment by Reducing Plastic Waste"],
  "Learning Skills and Languages": ["new skill/language", "Benefits of Learning New Skill Sets"],
  "Volunteering": ["Volunteering"],
  "Part-Time Jobs for Students": ["jobs career economics", "Benefits of Taking a Part-Time Job"],
  "Online Shopping and Payment": ["online payment/shopping"],
  "Targeted Advertising": ["advertising", "Benefits of Targeted Advertising"],
  "Changing Laws: Voting Age and Equality": ["change laws (age/gender)", "Benefits of Lowering Age Requirements for Voting"],
  "Military Service": ["military", "Benefits of Conscription"],
  "Government Intervention": ["government intervene", "Government Should Intervene to Boost the Economy"],
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function cleanSourceLines(lines) {
  return lines
    .map(line => line.trim())
    .filter(line => line && line !== "________________" && line !== "________________" && line !== "------")
    .filter(line => !line.includes("____________________"))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

function getOriginalReference(topic) {
  let text = "";
  try {
    text = fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return "Original Google Doc export was not found in the workspace.";
  }

  const lines = text.split(/\r?\n/);
  const aliases = topicAliases[topic] || [topic];
  const start = lines.findIndex(line =>
    aliases.some(alias => line.toLowerCase().includes(alias.toLowerCase()))
  );

  if (start < 0) return "No matching original Google Doc section was found for this topic.";

  const majorAliases = Object.values(topicAliases).flat().map(alias => alias.toLowerCase());
  let end = Math.min(lines.length, start + 95);
  for (let i = start + 12; i < Math.min(lines.length, start + 180); i += 1) {
    const line = lines[i].trim().toLowerCase();
    if (majorAliases.some(alias => alias !== aliases[0].toLowerCase() && line === alias)) {
      end = i;
      break;
    }
  }

  const excerpt = cleanSourceLines(lines.slice(start, end));
  return excerpt.length > 4500 ? `${excerpt.slice(0, 4500).trim()}\n\n[Excerpt shortened from the original Google Doc section.]` : excerpt;
}

function getTargetWords(seconds) {
  if (seconds <= 30) return 65;
  if (seconds <= 45) return 85;
  if (seconds <= 60) return 115;
  if (seconds <= 90) return 155;
  if (seconds <= 120) return 200;
  return 250;
}

function chooseViewpoint({ transcript = "", viewpoints = [] }) {
  const lower = transcript.toLowerCase();
  let best = viewpoints[0] || {
    title: "Clear main viewpoint",
    bullets: ["give a clear opinion", "support it with one example", "explain the result"],
    keywords: ["clear opinion", "example", "result"],
  };
  let bestScore = -1;

  for (const view of viewpoints) {
    const keywordScore = (view.keywords || []).filter(k => lower.includes(String(k).toLowerCase())).length * 2;
    const bulletScore = (view.bullets || []).filter(b => {
      const mainWords = String(b).toLowerCase().split(/\W+/).filter(w => w.length > 5);
      return mainWords.some(w => lower.includes(w));
    }).length;
    const score = keywordScore + bulletScore;
    if (score > bestScore) {
      best = view;
      bestScore = score;
    }
  }

  return best;
}

function polishText(text) {
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

function promptTopic(prompt) {
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
  if (lower.startsWith("reduce ") || lower.startsWith("improve ") || lower.startsWith("support ") || lower.startsWith("protect ") || lower.startsWith("increase ") || lower.startsWith("develop ") || lower.startsWith("build ") || lower.startsWith("track ") || lower.startsWith("adjust ") || lower.startsWith("study ") || lower.startsWith("learn ") || lower.startsWith("revise ") || lower.startsWith("avoid ") || lower.startsWith("save ") || lower.startsWith("use ") || lower.startsWith("receive ") || lower.startsWith("prepare ") || lower.startsWith("connect ") || lower.startsWith("communicate ") || lower.startsWith("practice ") || lower.startsWith("earn ") || lower.startsWith("compare ") || lower.startsWith("access ") || lower.startsWith("share ") || lower.startsWith("give ") || lower.startsWith("make ")) {
    return lower;
  }
  return `develop ${lower}`;
}

function polishedRevision({ transcript = "", prompt = "", viewpoint }) {
  const cleaned = polishText(transcript);
  const mainKeyword = viewpoint.title?.toLowerCase() || viewpoint.keywords?.[0] || "the main viewpoint";
  const example = canPhrase(viewpoint.bullets?.[0] || "apply this idea in a real learning situation");
  const effect = canPhrase(viewpoint.bullets?.[viewpoint.bullets.length - 1] || "produce a clearer and more useful result");

  if (!cleaned) return "No transcript was submitted.";

  return [
    `Argument: I believe ${promptTopic(prompt)} is an important issue, especially because it is connected to ${mainKeyword}.`,
    `Explanation: In other words, ${cleaned}`,
    `Concrete example: For example, students can ${example}, which makes the idea easier to understand in daily life.`,
    `Effect: As a result, they can ${effect}, and their response becomes more specific and persuasive.`,
    "Wrap-up: Overall, this answer is stronger when it uses clear structure, polished vocabulary, and one concrete example.",
  ].join(" ");
}

function modelResponse({ prompt = "", seconds = 60, viewpoint }) {
  const target = getTargetWords(seconds);
  const title = viewpoint.title || "this viewpoint";
  const bullets = viewpoint.bullets || [];
  const keywords = viewpoint.keywords || [];
  const kw1 = keywords[0] || title.toLowerCase();
  const kw2 = keywords[1] || "practical benefits";
  const b1 = canPhrase(bullets[0] || "handle the situation more effectively");
  const b2 = canPhrase(bullets[1] || "make better decisions");
  const b3 = canPhrase(bullets[2] || "achieve a positive result");
  const b4 = canPhrase(bullets[3] || "develop stronger confidence");

  if (seconds <= 45) {
    return `Argument: I believe ${title.toLowerCase()} is the strongest point for this topic. Explanation: It matters because it gives students a clear and practical benefit, not just a general idea. Concrete example: For example, when students answer "${prompt}", they can explain how people can ${b1} and ${b2}. Effect: As a result, the answer becomes more specific and easier to follow. Wrap-up: Overall, ${kw1} is useful because it helps students give a focused and confident response.`;
  }

  if (seconds <= 75) {
    return `Argument: I believe ${title.toLowerCase()} is the strongest viewpoint for this topic. Explanation: The main reason is that it gives students a practical way to discuss the issue with clear content and useful vocabulary, such as ${kw1} and ${kw2}. Concrete example: For example, when students answer "${prompt}", they can say that people can ${b1}. They can also mention that this helps them ${b2}. Effect: As a result, the response sounds more organized, more realistic, and more convincing to the listener. Wrap-up: Overall, this viewpoint is effective because it combines a clear argument, a concrete example, and a meaningful result within a short speaking time.`;
  }

  if (seconds <= 120) {
    return `Argument: I believe ${title.toLowerCase()} is a strong and reasonable viewpoint for this topic. Explanation: This idea is important because it connects the question to a real situation and gives students enough content to develop their answer. Instead of only saying the topic is good or bad, students can use more precise words such as ${kw1}, ${kw2}, and ${keywords[2] || "long-term improvement"}. Concrete example: For example, when answering "${prompt}", a student could explain that people can ${b1}. In addition, they may ${b2}, so the benefit becomes easier to understand. Effect: As a result, this viewpoint can ${b3}, and it may also help people ${b4}. This makes the answer sound more complete and more academic. Wrap-up: Overall, a full-mark response should not be complicated. It should present one clear argument, explain the reason, give a concrete example, describe the effect, and end with a confident conclusion.`;
  }

  return `Argument: I believe ${title.toLowerCase()} is one of the most persuasive ways to answer this topic. Explanation: The reason is that it allows the speaker to move beyond a simple personal opinion and develop a clear, academic response. This viewpoint is especially useful because it includes key ideas such as ${kw1}, ${kw2}, and ${keywords[2] || "responsible decision-making"}. Concrete example: For example, when students answer "${prompt}", they can explain that people can ${b1}. They can then add a second layer by saying that this also helps them ${b2}. A specific classroom, family, work, or community example would make the response sound more natural and believable. Effect: As a result, the answer can ${b3}. It can also help people ${b4}, which shows the examiner that the student understands both the direct benefit and the wider influence of the issue. Wrap-up: Overall, this is a strong full-mark style response because it is organized, specific, and fluent. It uses clear transitions, polished vocabulary, and a complete argument-example-effect structure. Target length: about ${target} words.`;
}

function heuristicGrade({ prompt = "", transcript = "", seconds = 60, keywords = [], viewpoints = [] }) {
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const lower = transcript.toLowerCase();
  const usedKeywords = keywords.filter(k => lower.includes(k.toLowerCase()));
  const structureHits = ["because", "for example", "as a result", "overall", "therefore", "however"]
    .filter(marker => lower.includes(marker));
  const wordTarget = getTargetWords(seconds);
  const lengthScore = Math.min(25, Math.round((words.length / wordTarget) * 25));
  const keywordScore = Math.min(20, usedKeywords.length * 4);
  const structureScore = Math.min(20, structureHits.length * 4);
  const clarityScore = transcript.includes(".") || transcript.includes(",") ? 15 : 11;
  const effortScore = words.length >= 18 ? 20 : 14;
  const total = Math.min(100, lengthScore + keywordScore + structureScore + clarityScore + effortScore + 18);

  const band = total >= 90 ? "Excellent" : total >= 78 ? "Strong" : total >= 65 ? "Good" : total >= 50 ? "Developing" : "Needs Support";
  const viewpoint = chooseViewpoint({ transcript, viewpoints });

  return {
    source: "local practice grader",
    score: total,
    band,
    correctedText: polishedRevision({ transcript, prompt, viewpoint }),
    feedback: [
      `Structure: ${structureHits.length ? `You already used ${structureHits.join(", ")}. To make it sound more test-ready, organize it as Argument -> Explanation -> Concrete example -> Effect -> Wrap-up.` : "Add clear signposting words: Argument, because, for example, as a result, and overall."}`,
      usedKeywords.length ? `Vocabulary/Formality: You used useful topic language such as ${usedKeywords.slice(0, 5).join(", ")}. Next, replace casual expressions with polished terms, for example kids -> students, good -> beneficial, and stuff -> learning materials.` : "Vocabulary/Formality: Add 2-3 key words from the viewpoint grid and avoid vague words such as good, bad, stuff, and things.",
      words.length < wordTarget * 0.55 ? `Development: For ${seconds} seconds, this is a bit short. Add one real example and one effect sentence to make the answer feel complete.` : "Development: The amount of content is appropriate. Now focus on making the example more concrete and connected to the prompt.",
      `Teacher focus: Your strongest content direction is "${viewpoint.title}". Build the answer around this one viewpoint instead of trying to mention too many ideas.`,
    ],
    rubric: {
      content: Math.min(25, lengthScore),
      vocabulary: keywordScore,
      structure: structureScore,
      clarity: clarityScore,
    },
    upgradedSample: modelResponse({ prompt, seconds, viewpoint }),
  };
}

async function aiGrade(payload) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return heuristicGrade(payload);

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are an English speaking test rater for CEFR B1 to B2 students. Return strict JSON with score, band, correctedText, feedback array, rubric object, and upgradedSample. correctedText must be a polished revision of the student's own speech: add structural words, keep the student's meaning, replace overly colloquial expressions with more polished academic terms, and improve grammar. feedback must be organized into Structure, Vocabulary/Formality, Grammar, and Development. upgradedSample must be a full-mark response that fits the selected time limit, using Argument, Explanation, Concrete example, Effect, and Wrap-up. Keep feedback kind, specific, and useful for iTEP/TOEFL/IELTS speaking practice.",
        },
        {
          role: "user",
          content: JSON.stringify(payload),
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/grade") {
      const body = await readBody(req);
      const payload = JSON.parse(body || "{}");
      const result = await aiGrade(payload);
      result.upgradedSample = getOriginalReference(payload.topic);
      send(res, 200, JSON.stringify(result));
      return;
    }

    if (req.method === "GET" && req.url.startsWith("/api/original")) {
      const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
      const topic = requestUrl.searchParams.get("topic") || "";
      send(res, 200, JSON.stringify({ topic, excerpt: getOriginalReference(topic) }));
      return;
    }

    const pathname = decodeURIComponent(req.url.split("?")[0]);
    const requested = pathname === "/" ? "/index.html" : pathname;
    const filePath = path.normalize(path.join(root, requested));
    if (!filePath.startsWith(root)) {
      send(res, 403, "Forbidden", "text/plain; charset=utf-8");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        send(res, 404, "Not found", "text/plain; charset=utf-8");
        return;
      }
      const type = mimeTypes[path.extname(filePath)] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    });
  } catch (error) {
    send(res, 500, JSON.stringify({ error: error.message }));
  }
});

server.listen(port, () => {
  console.log(`iTEP Speaking Practice app running at http://localhost:${port}`);
});
