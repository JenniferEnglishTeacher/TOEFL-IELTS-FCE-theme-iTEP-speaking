# iTEP Speaking Practice App

This is a local classroom prototype for topic-based speaking practice.

## What It Does

- Shows a public topic board with iTEP-style speaking themes.
- Displays viewpoints, bullet ideas, and key vocabulary for each topic.
- Reads the prompt and learning content aloud using browser text-to-speech.
- Lets students choose a response time and practice with a countdown timer.
- Uses browser speech recognition for live transcription when supported.
- Sends the transcript for correction and grading.
- Exports a student's result as a text file.

## Run Locally

From this folder, run:

```powershell
& 'C:\Users\Jennifer\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.js
```

Then open:

```text
http://localhost:5174
```

Chrome or Edge is recommended for live speech typing.

## Publish With GitHub Pages

This app can run as a static GitHub Pages site. Before uploading, rebuild the static Google Doc reference file:

```powershell
& 'C:\Users\Jennifer\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' build_static_references.py
```

Then upload/push the full `speaking-practice-app` folder to a GitHub repository and enable GitHub Pages from the repository settings.

On GitHub Pages:

- topic board works
- read-aloud works
- timer works
- Chrome/Edge live speech typing works
- local browser grading fallback works
- original Google Doc references load from `data/original-references.json`

Server-only features, such as OpenAI API grading through `server.js`, require a backend host instead of plain GitHub Pages.

## AI Grading

The app works without an API key by using a local practice grader.

To use OpenAI grading, set these environment variables before starting the server:

```powershell
$env:OPENAI_API_KEY='your_api_key_here'
$env:OPENAI_MODEL='your_preferred_model'
& 'C:\Users\Jennifer\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.js
```

Do not put an API key directly into the browser files.
