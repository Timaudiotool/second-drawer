window.APPS = [
  {
    "id": "ar-assistant",
    "name": "A&R Assistant",
    "team": "Audiosense",
    "people": "Aina Hirata",
    "place": "New York, NYU",
    "size": "Solo (just me)",
    "pitch": "",
    "features": [
      "Features of A&R Assistant",
      "AI-Powered A&R Analysis – Connects to Audiotool projects and generates a professional record label–style A&R report for each song.",
      "Commercial Potential Scoring – Evaluates commercial potential, viral potential, and playlist potential using AI-generated scores and visual charts.",
      "Artist Similarity Analysis – Identifies commercially similar artists, provides similarity percentages, and explains the musical characteristics behind each comparison.",
      "Audience Prediction – Predicts the song's target audience, including age range, listening habits, gender distribution, and key geographic markets.",
      "Playlist Recommendation Engine – Recommends suitable Spotify-style editorial and algorithmic playlists with fit scores and explanations.",
      "AI Release Strategy Generator – Creates personalized pre-release, release week, and post-release marketing plans, including social media and content recommendations.",
      "Visual Branding Assistant – Suggests album artwork concepts, color palettes, photography direction, fashion inspiration, and overall artist branding.",
      "Revenue Projection Simulator – Estimates potential streaming, merchandise, and touring revenue based on projected listeners, streams, and marketing budget.",
      "Professional A&R Feedback Report – Provides detailed feedback on strengths, weaknesses, commercial opportunities, potential risks, and an overall release recommendation similar to a real record label A&R executive.",
      "Interactive Analytics Dashboard – Presents AI insights through a modern dashboard with charts, gauges, and visual reports inspired by professional music industry tools.",
      "Secure Authentication & Project Management – Allows users to sign in, connect their Audiotool projects, and manage multiple song analyses from one dashboard."
    ],
    "challenges": [
      "Distribution & Marketing"
    ],
    "category": "AI Promotion",
    "sdk": [
      "Read/Write Project Data",
      "Used Nexus client code to connect Audiotool project data"
    ],
    "url": "https://sonisense-artist-hub.base44.app/new",
    "password": "",
    "video": {
      "kind": "video",
      "src": "videos/audiosense-tutorial.mp4"
    },
    "github": "",
    "source": "https://sonisense-artist-hub.base44.app/new",
    "sourceNote": "",
    "notes": "Built using Base44 with a vibe-coding workflow. One known issue is that, in some cases, the imported Audiotool project may display an incorrect number of tracks due to an import/parsing bug. This does not affect the core functionality of importing projects or generating AI analysis reports. Aside from this known issue, the application is fully functional.",
    "arch": "Our architecture was designed around Audiotool as the entry point of the creative workflow. Rather than requiring artists to manually upload files, the application securely imports their Audiotool projects, enriches them with AI-powered music intelligence, and transforms project data into actionable commercial insights, helping musicians move seamlessly from creation to release planning."
  },
  {
    "id": "lark",
    "name": "Lark",
    "team": "Lark Squad",
    "people": "John Marcos, Ruben Cahayag, Luis Amaraes, and Chris Navarro",
    "place": "Hawaii",
    "size": "4+ people",
    "pitch": "Lark is for anyone who can hum a melody but can’t play piano or guitar, and doesn’t have a full studio. Record your hum, pick an instrument, and Lark turns it into editable music in Audiotool Studio — so you can hear it, play with it, and keep building.",
    "features": [
      "Log in with Audiotool (OAuth / Nexus)",
      "Record humming with the microphone, or upload/drop an audio file",
      "Preview recorded/imported audio and re-record if needed",
      "Optional “clean hum for analysis” before pitch detection",
      "Create, select, refresh, rename, and delete Audiotool cloud projects",
      "Save Lark project settings back to the connected Audiotool project",
      "Choose a lead instrument (Piano, Bass, Drums, Lead, Pad, Guitar, Strings, Wind, FX, Mallets)",
      "Choose GM / Gakki sound presets for supported leads",
      "Choose a mood profile (Calm, Rock, Melancholic, Energetic)",
      "Add optional Studio accompaniment layers (Pad, Bass, Arp, Synth, 909, etc.)",
      "Transform humming into editable MIDI in Audiotool Studio (Basic Pitch → Nexus)",
      "Open the project in Audiotool Studio after transform",
      "Studio Health checks (project connection, timeline write, mixer routing, playback readiness)",
      "Production brief: auto-analyze the hum into an editable plan and apply it to Studio settings",
      "Local Raw Audio library (reuse, play, rename, download, delete takes)",
      "Onboarding tour (first-run guide + replay)",
      "Appearance: Day / Night / System theme",
      "Accessibility options (text size, high contrast, reduce motion, bold text, enhanced focus)"
    ],
    "challenges": [
      "Ideation & Discovery"
    ],
    "category": "Audio to Midi",
    "sdk": [
      "Read/Write Project Data"
    ],
    "url": "https://jmarcos3-max.github.io/lark/",
    "password": "",
    "video": null,
    "github": "",
    "source": "",
    "sourceNote": "",
    "notes": "",
    "arch": ""
  },
  {
    "id": "harmonic-quest",
    "name": "Harmonic Quest",
    "team": "Harmonic Quest",
    "people": "Aviad Cohen",
    "place": "",
    "size": "Solo (just me)",
    "pitch": "Harmonic Quest is a four-bar, three-choice composition quest that teaches harmony through audible decisions, then writes the finished idea into Audiotool as native, editable instruments, routing, MIDI, and notes through Nexus.",
    "features": [
      "Starts from an emotional direction: bright arc, soft gravity, or dark turn.",
      "Offers three theory-aware choices at each of three decisions to build a four-bar progression.",
      "Previews every decision immediately with Web Audio and explains the harmonic movement.",
      "Scores harmonic arc and voice-leading quality as the progression develops.",
      "Lets the player choose key and tempo.",
      "Uses Audiotool OAuth with only project:write.",
      "Lists existing projects or creates a clean Audiotool project.",
      "Atomically writes the selected BPM, Heisenberg synth, mixer channel, cable, MIDI track, one four-bar region, and 12 editable chord notes.",
      "Leaves the project unchanged if enabled tempo automation would override the selected BPM.",
      "Safely replaces only a prior Harmonic Quest arrangement on retry."
    ],
    "challenges": [
      "Composition & Theory"
    ],
    "category": "Chord Progression Editor",
    "sdk": [
      "Read/Write Project Data",
      "MIDI Integration",
      "Audio Integration"
    ],
    "url": "https://harmonic-quest-nexus.aviadcoh.chatgpt.site/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/4TBwmQ8TXBc",
      "href": "https://youtu.be/4TBwmQ8TXBc"
    },
    "github": "https://github.com/aviad12g/harmonic-quest",
    "source": "",
    "sourceNote": "",
    "notes": "For the cleanest evaluation: sign in to Audiotool, choose Create a clean Audiotool project, complete the three choices, and send the progression. Harmonic Quest requests only project:write. A production run on August 11–12 created a clean project and wrote C major I–vi–V–I at 96 BPM; Audiotool displayed one native Harmonic Quest · Chords track and 12 editable notes across four bars. Development began August 1 under the extended August 23 deadline. On August 11, organizer Ralf Noetzel confirmed by email that the May 28–July 6 date still shown in the required attestation is a form mistake and that projects may enter multiple categories.",
    "arch": "React/vinext app using @audiotool/nexus 0.0.17. OAuth PKCE requests only project:write. Web Audio previews each chord choice. The production write path is shared with offline validator tests and performs one atomic Nexus transaction for tempo, a Heisenberg synth, mixer channel and cable, MIDI track, four-bar region, and 12 notes. If active tempo automation would override the selected BPM, it aborts with zero project changes."
  },
  {
    "id": "score-io",
    "name": "Score IO",
    "team": "",
    "people": "Josh Williams",
    "place": "Kent, Washington, USA",
    "size": "Solo (just me)",
    "pitch": "Audiotool Score IO is a web application that allows Audiotool users to convert project note tracks to MusicXML scores and to create projects based on MusicXML files. This will be useful for creators sharing their compositions with live musicians, notation-first composers starting a project, composers who sketch out ideas in a project before writing notation, and any other users that need to translate between a project and a score. MusicXML files exported from projects are created using a custom heuristic to quantize minor timing variations in live performance to readable rhythms. Files can be previewed in the browser or downloaded as MusicXML files. Imported MusicXML files immediately become new projects in the user's Audiotool account, with a note track for each part.",
    "features": [
      "Converts Audiotool Projects to MusicXML scores",
      "Score title and part names can be edited",
      "Creates a part from each note track the user selects",
      "Can quantize score to make parts human readable",
      "Groups rhythms in a logical way to make parts easy to read",
      "Can export the score and/or parts",
      "Displays the score in the browser",
      "Makes score available for download",
      "Converts MusicXML file to Audiotool Project",
      "Creates new project in users Audiotool account",
      "Creates a note track for each part the user selects"
    ],
    "challenges": [
      "Composition & Theory"
    ],
    "category": "Midi to Score",
    "sdk": [
      "Read/Write Project Data"
    ],
    "url": "https://audiotool-score-io.pages.dev",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/0SlEjTcuNxY",
      "href": "https://youtu.be/0SlEjTcuNxY"
    },
    "github": "https://github.com/jswill88/audiotool-score-io",
    "source": "",
    "sourceNote": "",
    "notes": "",
    "arch": "Audiotool Score IO is a Typescript application with React frontend and Express API. It has three packages handling the conversions: Audiotool to Midi, Midi to MusicXML, and MusicXML to Audiotool."
  },
  {
    "id": "magic-deck",
    "name": "Magic Deck",
    "team": "Magic Deck",
    "people": "Tarcan Gul, Alexander Gentil, Gauri Prabhakar, Rukmini Menon",
    "place": "Boston, MA",
    "size": "4+ people",
    "pitch": "Magic Deck is an AI-powered DJ companion that lets users mix, cue, sync, and arrange tracks directly within Audiotool. It supports dual-deck playback, BPM matching, waveform navigation, cue points, EQ, filters, effects, crossfades, and precise timeline placement. It can also generate complementary AI stems such as drums, bass, melodies, and textures, then add and loop them seamlessly in the project. Magic Deck also supports shared project collaboration, local music library browsing, and built-in deck assistance for faster, more intuitive mixing.",
    "features": [
      "Magic Deck is an AI-powered DJ companion that connects directly to Audiotool and provides:",
      "Audiotool login, project creation, project connection, and disconnection.",
      "Real-time synchronization of tracks, routing, tempo, mixer levels, filters, effects, and timeline",
      "regions through Audiotool Nexus.",
      "Two source decks for loading MP3 or WAV tracks through drag-and-drop.",
      "A local music-library browser with folder navigation, search, sorting, refresh, and deck loading.",
      "Automatic BPM detection, effective-BPM display, and manual BPM correction.",
      "Waveform displays with zooming, navigation, and five persistent cue points per deck.",
      "Exact track and cue placement at user-selected Audiotool bars.",
      "Timeline controls for moving regions by fine increments, beats, bars, or four-bar sections.",
      "Scheduled crossfades between Deck A, Deck B, and Magic Deck over 1, 2, 4, or 8 bars.",
      "Safe scheduling, cancellation, stopping, replacement, and unloading of deck content.",
      "Per-deck volume, gain, low-pass filter, high-pass filter, and three-band EQ controls.",
      "Per-deck delay, reverb, distortion, and flanger effects.",
      "Tempo adjustment with ±10%, ±30%, and ±50% ranges.",
      "Tempo Sync for matching individual decks to the Audiotool project tempo.",
      "Live browser-tab audio capture from an Audiotool session.",
      "AI-generated, four-bar complementary stems using Magenta RT2 and a text prompt.",
      "Selectable AI stem roles: Auto, Drums, Bass, Melody, and Texture.",
      "Tempo-aware and key-aware AI generation designed to avoid clashing with the source mix.",
      "Automatic insertion and seamless looping of generated stems in the Audiotool timeline.",
      "Shared project-backed state, allowing multiple Magic Deck users to collaborate through the same",
      "Audiotool project.",
      "Configurable chunked uploads, chunk duration, parallel-upload limits, and Magenta API endpoint.",
      "Inline Deck Assistants for placement, cue launching, BPM correction, effects, stopping, and",
      "cancellation checks.",
      "Built-in status reporting, upload progress, error handling, and an interactive tutorial."
    ],
    "challenges": [
      "Music Games & Interactive Experiences"
    ],
    "category": "DJ Tool with 2 desks",
    "sdk": [
      "Read/Write Project Data",
      "Multiplayer / Real-time Sync",
      "Audio Integration"
    ],
    "url": "https://nexus-app-magic-deck.vercel.app/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/3looUdADabk",
      "href": "https://youtu.be/3looUdADabk"
    },
    "github": "https://github.com/TarcanGul/magic-deck",
    "source": "",
    "sourceNote": "",
    "notes": "The magenta AI model part of this is hosted on my machine and I am serving it using Cloudflare Tunnel (otherwise AI hosting was expensive). If it doesn't work it is likely that my laptop is not open. I might be also traveling around in October so please let me know if you have tried to generate an AI stem and it did not work (you can email me from nailtarcan@gmail.com).",
    "arch": "• Magic Deck is a web-based AI DJ companion built with a Vite/TypeScript   frontend and a Python FastAPI backend. The frontend integrates with the   Audiotool DAW through @audiotool/nexus for authentication, project   synchronization, timeline editing, deck controls, effects, cueing, and BPM-   aware playback.    The backend uses Magenta RT2 (mrt2_small), MusicCoCa, librosa, and aubio to   analyze a reference track and generate a complementary, tempo- and key-aware   four-bar audio stem from a text prompt. Generated WAV audio is returned to the   frontend, uploaded into Audiotool, and inserted into the synchronized project   timeline.    High-level architecture:    Browser UI → Audiotool Nexus API → Audiotool DAW project   Browser UI → FastAPI /generate → Magenta RT2 → generated WAV → Audiotool   project    The frontend is deployed on Vercel, while the AI generation service runs   separately because it requires Python and ML/audio-processing dependencies. For AI hosting I am hosting on my laptop and serving it using Cloudflare Tunnel. As long as my laptop is open, the AI services will work in a secure way (security handled via cloudflare)"
  },
  {
    "id": "rhythm-relay",
    "name": "Rhythm Relay",
    "team": "Rhythm Relay",
    "people": "Koa Chang",
    "place": "",
    "size": "Solo (just me)",
    "pitch": "Rhythm Relay: hear a rhythm, tap it from memory, and turn it into editable Audiotool drums.",
    "features": [
      "Listen to four rhythm patterns with an adjustable tempo and count-in.",
      "Tap back from memory and see matched, missed and extra hits, plus early/late timing feedback.",
      "Generate custom evenly distributed pulse patterns and rotate them.",
      "Create a new Audiotool project with four repeats of the chosen rhythm, editable Beatbox 8 notes, a mixer channel and audio routing.",
      "Reopen the saved project and verify note positions, pitches, durations, velocities and tempo before showing success.",
      "Practice runs in the browser without a microphone or uploaded recordings. Existing Audiotool projects are not opened for modification."
    ],
    "challenges": [
      "Music Games & Interactive Experiences"
    ],
    "category": "Rhythem learning",
    "sdk": [
      "Read/Write Project Data"
    ],
    "url": "https://koachang.github.io/rhythm-relay/",
    "password": "",
    "video": {
      "kind": "video",
      "src": "https://koachang.github.io/rhythm-relay/demo.mp4",
      "href": "https://koachang.github.io/rhythm-relay/demo.mp4"
    },
    "github": "https://github.com/KoaChang/rhythm-relay",
    "source": "",
    "sourceNote": "",
    "notes": "",
    "arch": "JavaScript and Vite; Web Audio for local practice; Audiotool Nexus 0.0.17 for OAuth, project creation, schema-validated document edits, synchronization and saved-project readback. No runtime AI service."
  },
  {
    "id": "pocket-producer-library",
    "name": "Pocket Producer",
    "team": "",
    "people": "Chuling LI",
    "place": "Nottingham, UK",
    "size": "Solo (just me)",
    "pitch": "A session-aware retrieval instrument for unfinished music. It reads your open Audiotool project through the Nexus SDK, ranks your own audio fragments by session compatibility, and lets you preview, insert at the playhead, and undo in one transaction.",
    "features": [
      "· Reads open Audiotool sessions via Nexus SDK: tempo, track roles, playhead position",
      "· Ranks your own fragment library by session compatibility, not just audio similarity",
      "· Shows structured evidence for every suggestion (\"121 BPM close to project's 120\", \"adds a missing role\")",
      "· Inserts the chosen fragment at the playhead in a single Nexus transaction",
      "· Exact undo: restores the prior entity set, validated against the Nexus WASM document validator",
      "· One-click import: pull samples from any existing Audiotool project into your fragment library",
      "· Found and patched a Nexus SDK 0.0.17 bug (insertSample crashes in minified builds; fix shipped in repo)",
      "· OAuth tokens never leave the browser; the backend sees only session fingerprints",
      "· Default ranker is hand-tuned rules; a learned five-signal fusion is user-selectable",
      "· Graceful degradation: if the model service is down, the rules ranker still answers",
      "· 322 automated tests across frontend (Vitest) and backend (pytest)"
    ],
    "challenges": [
      "Ideation & Discovery"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration"
    ],
    "url": "https://pocketproducer.vercel.app",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/ARTcGMVqx0E",
      "href": "https://youtu.be/ARTcGMVqx0E"
    },
    "github": "https://github.com/imChuling/pocket-producer",
    "source": "",
    "sourceNote": "",
    "notes": "A fresh account starts with an empty library. To try the full loop: connect your Audiotool account, open any project, click \"Import samples to library.\" Your samples become rankable fragments in under a minute. From there: suggest, preview, insert at playhead, undo. The repo also includes a reproducible offline evaluation on the Freesound Loop Dataset with versioned artifacts and a frozen held-out split.",
    "arch": "Frontend: Next.js 16, React 19, Tailwind v4, Vitest. Backend: FastAPI, MongoDB Atlas, Firebase Auth, Google Cloud Storage, Cloud Run. Audio representations: MS-CLAP 2023 (frozen, offline embedding). Ranking: hand-tuned rules baseline + learned five-signal linear fusion (PyTorch, exported to safetensors). Nexus SDK 0.0.17 for full read/write cycle against live Audiotool documents, with a pnpm patch for a production bug. Frontend hosted on Vercel, backend on Google Cloud Run."
  },
  {
    "id": "chord-suggester",
    "name": "Chord Suggester",
    "team": "BBC R&D",
    "people": "Brodie Wilson",
    "place": "London, BBC",
    "size": "Solo (just me)",
    "pitch": "A website for guitar players of any level of experince trying to learn how to play new chords and what music theory is required to build chords. Then once comftable playing the chords they can send them over to there audiotool project to use as drag and drop blocks of chords or in anyway they need!",
    "features": [
      "listens to your guitar and suggest chords based on what note you played",
      "allows you to select notes on a guitar and suggests chords based on the note selected",
      "a minigame to memorise chord shapes",
      "send chords to your auditool project"
    ],
    "challenges": [
      "Composition & Theory"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Multiplayer / Real-time Sync",
      "MIDI Integration"
    ],
    "url": "https://chord-suggester.vercel.app/",
    "password": "",
    "video": {
      "kind": "video",
      "src": "videos/chord-suggester.mp4"
    },
    "github": "https://github.com/brodie-wilson/chord-suggester",
    "source": "",
    "sourceNote": "",
    "notes": "the project was completed with heavy use of claude code and was completed alongside apprentice and regular work!",
    "arch": "Built on @audiotool/nexus, browser-side:  Auth — audiotool() runs the OAuth2 PKCE flow in the browser. Each user signs in as themselves; there is no server and no shared token anywhere in this repo. The access token never leaves the visitor's browser. Live document — the project is opened once and the session is kept syncing, so chords appear in the DAW as they're clicked rather than after a flush. doc.connected drives the status dot, and the session is stopped on pagehide to guarantee the final sync. Each chord becomes a Pulverisateur (polyphonic, so the tones actually ring together — a monophonic device like Bassline can only sound one note) plus a note track, collection and one-bar region, with every note at positionTicks: 0. Writes are verified before success is reported: the entity count is checked after the transaction, and a lost backend connection fails loudly instead of silently dropping the change."
  },
  {
    "id": "keep-the-beat",
    "name": "Keep the Beat",
    "team": "Wisla the Otter",
    "people": "Adam Borowski",
    "place": "Poland",
    "size": "Solo (just me)",
    "pitch": "Keep the Beat is a 1–5 player cooperative 3D party game that turns making music into something you play. Grab records from four musical racks, run them through physical effect machines, place them on a beat-synced four-layer deck, and PRINT five sections to build a complete song. Nine musical styles and automatic tempo and key adaptation make experimentation approachable even with no production experience. At the end, the arrangement can be sent directly to Audiotool as a real, editable project with its regions and effect chains intact.",
    "features": [
      "Real-time co-op for up to 5 players",
      "Browser-based 3D gameplay on desktop and mobile",
      "4-character room codes and QR joining",
      "Nine musical styles",
      "Four beat-synced layers for drums, bass, music and tops",
      "Records sourced from the Audiotool sample library",
      "Automatic tempo and key adaptation",
      "Physical, stackable effect machines and an effect washer",
      "Five-part song structure: Intro, Groove, Build, Drop and Outro",
      "PRINT mechanic that commits each section into the final arrangement",
      "Full-song replay at the end of each session",
      "Animated lobby tutorial and first-run guidance",
      "Direct export to a native, editable Audiotool project",
      "Designed so players can make something that sounds good without music production experience"
    ],
    "challenges": [
      "Music Games & Interactive Experiences"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration"
    ],
    "url": "https://keepthebeat.games/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/VDNNyz3SGIU",
      "href": "https://www.youtube.com/watch?v=VDNNyz3SGIU"
    },
    "github": "https://github.com/wislatheotter/keep-the-beat",
    "source": "",
    "sourceNote": "",
    "notes": "",
    "arch": "Keep the Beat is a browser-based 3D game built with React, Three.js and Web Audio, with a custom Node.js backend for real-time multiplayer. Audio is processed and synchronized in the browser for responsive collaborative play. Audiotool Nexus is used for authentication, accessing samples and exporting the finished song as a native, fully editable Audiotool project with its regions and effect chains intact."
  },
  {
    "id": "beatcorn",
    "name": "BeatCorn",
    "team": "BeatCorn",
    "people": "Wassim Zoghlami - Sarra Zoghlami",
    "place": "Berlin, Germany / Montreal, Canada",
    "size": "2 people",
    "pitch": "BeatCorn - Music-aware AI visuals for live performance",
    "features": [
      "Connects directly to Audiotool projects using the Nexus SDK.",
      "Lets artists browse and select their Audiotool projects from inside BeatCorn.",
      "Uses Audiotool project structure and synchronized project changes as additional musical context.",
      "Pairs an Audiotool project with its finished audio track for detailed pre-show music analysis.",
      "Supports Live Listen for realtime audiovisual performance while working or playing in Audiotool.",
      "Analyzes BPM, rhythm, energy, musical sections, builds, drops and other important musical events.",
      "Creates a reusable visual score that maps musical structure to visual direction.",
      "Directs continuous AI-generated visuals that evolve with the music instead of simply displaying loops or amplitude-reactive effects.",
      "Supports visual styles, entities/character references and user-defined creative direction.",
      "Lets performers override the automatic visual direction during a live performance.",
      "Supports prepared tracks, multi-track sets and realtime music input.",
      "Provides a clean stage output for projectors, LED displays, external capture and performance screens.",
      "Records generated performances so artists can replay or reuse them without regenerating the entire show.",
      "Creates 15-, 30- and 60-second clips from recorded performances in landscape, vertical and square formats.",
      "Combines Audiotool project awareness with BeatCorn's realtime audio analysis: Nexus provides project context while BeatCorn uses the actual audio for precise music synchronization."
    ],
    "challenges": [
      "Distribution & Marketing"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Multiplayer / Real-time Sync"
    ],
    "url": "https://beatcorn.sentientstudios.chatgpt.site/",
    "password": "LETSBUILD",
    "video": null,
    "github": "",
    "source": "",
    "sourceNote": "",
    "notes": "Use this corrected version:\nBeatCorn is currently a Hackathon Beta.\nDemo password: LETSBUILD\nTo test the Audiotool integration:\n1. Open BeatCorn and enter the demo password.\n2. Go to Prepare → Music → Audiotool.\n3. Connect your Audiotool account.\n4. Select the Audiotool project you want to use.\n5. Upload the finished audio track/render that corresponds to that project so BeatCorn can analyze the actual music and synchronize the visuals precisely.\n6. Continue through the normal BeatCorn preparation flow, choose the visual style/entities, and start the performance.\nAudiotool Nexus provides BeatCorn with project structure and live project context, while the uploaded track provides the exact audio used for BeatCorn’s music analysis and visual timing.\nLive AI generation is intentionally limited in this public beta to protect third-party generation credits during judging.",
    "arch": "BeatCorn integrates Audiotool through the Nexus SDK as a first-class music source. Nexus handles Audiotool authentication, project discovery, synchronized project data and real-time project updates. BeatCorn reads the connected project’s structure, including tracks, regions, devices and arrangement context, and normalizes that information into its own Music Intelligence layer. For precise musical timing, BeatCorn combines Nexus project context with the actual audio source, either an uploaded render of the Audiotool project or BeatCorn’s Live Listen input. BeatCorn analyzes the audio for rhythm, energy, sections and musical events, while Nexus provides richer structural context and live project changes. Both feed the BeatCorn Director, which creates and performs synchronized AI visuals. The integration is intentionally read-oriented: BeatCorn observes and understands the Audiotool project rather than modifying the user’s composition. AI video generation is handled by the video model configured in BeatCorn Settings, independently of Nexus."
  },
  {
    "id": "quill",
    "name": "Quill",
    "team": "",
    "people": "Chuling LI",
    "place": "Nottingham, UK",
    "size": "Solo (just me)",
    "pitch": "Quill turns any recording into a playable instrument inside Audiotool. Record a few seconds of any sound. Quill extracts what it sounds like and how it was played as two separate assets, then re-renders your MIDI regions with real slides, legato, and vibrato that a sampler can't do. Swap the tone, keep the playing style. One click to your timeline.",
    "features": [
      "Record any sound. Quill splits it into two independent assets: a tone (harmonic + noise recipe, ~50 KB) and a behavior (how it was played: slides, vibrato, dynamics).",
      "Reads your Audiotool project live through the Nexus SDK. Pulls note regions, pitch bends, and tempo directly from the session.",
      "Automatically classifies each note as legato, vibrato, slide, or pluck based on overlap, pitch bend, and timing.",
      "Renders audio sample-by-sample through a DDSP engine. 500K parameters, runs on CPU, no GPU needed.",
      "Mix and match: pick any tone with any behavior. Your voice driving a violin part. A trumpet timbre with guitar phrasing.",
      "Adjust brightness, noise floor, reverb, and vibrato depth. These control the actual render, not post-effects.",
      "One-click write-back: rendered audio lands in Audiotool on its own track, bar-aligned, with a musical duration that survives tempo changes.",
      "OAuth token never leaves the browser. The server only sees audio."
    ],
    "challenges": [
      "Sound Design & Synthesis"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration"
    ],
    "url": "https://chuling-li-cs--quill-render-serve.modal.run/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/wJ8hX1CCM8w",
      "href": "https://youtu.be/wJ8hX1CCM8w"
    },
    "github": "https://github.com/imChuling/quill",
    "source": "",
    "sourceNote": "",
    "notes": "First launch has a ~15 second cold start (serverless deployment, min_containers=0). After that, requests are fast. The capture and render pipeline runs entirely on CPU.",
    "arch": ""
  },
  {
    "id": "shumform",
    "name": "SHUMFORM",
    "team": "SHUMFORM",
    "people": "Anatoli Shumer — solo creator of SHUMFORM.",
    "place": "Shanghai/Jakarta/Bali",
    "size": "Solo (just me)",
    "pitch": "SHUMFORM is an experimental browser-based musical instrument that turns sound creation into a visual, playful experience. Generate sounds, build circular rhythms, connect effects, and shape your performance with hand gestures. Record the full mix and send it directly into an Audiotool project through Nexus, or save it locally as a WAV.",
    "features": [
      "Discover musical ideas before you can put them into words: start with a sound, explore it, and let a composition emerge through play",
      "Create sounds synthesized from scratch in real time, rather than drawn from prerecorded samples",
      "Sketch rhythms with a circular sequencer and build your own musical space on an interactive visual canvas",
      "Connect effects and reshape sounds through simple interactions and live hand gestures",
      "Move freely from experimentation to performance, recording your sounds, effects, and live changes as one stereo mix",
      "Connect an Audiotool project and send your recording directly into its timeline to continue developing the idea",
      "Use SHUMFORM independently and save recordings to your computer as WAV files"
    ],
    "challenges": [
      "Sound Design & Synthesis"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration",
      "OAuth authentication",
      "sample uploads",
      "and project metadata lookup."
    ],
    "url": "https://shumform.com/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/B8zyvay63jU",
      "href": "https://www.youtube.com/watch?v=B8zyvay63jU&t=48s"
    },
    "github": "https://github.com/HASHQIX/SHUMFORM.git",
    "source": "",
    "sourceNote": "",
    "notes": "Start by double-clicking the empty canvas to create a sound. The “?” button opens the guided onboarding.\n\nFor Audiotool integration, click CONNECT TO AUDIOTOOL, authorize access, and paste the Studio URL of a project you can edit. Press Record to start capturing your performance; press it again to stop and upload the full mix.\n\nEach recording is added as a new audio track at bar 1, and the project tempo is set to the recording’s starting BPM. Existing tracks are retained. Audio is uploaded as an unlisted sample; nothing is published automatically.\n\nWithout an Audiotool connection, recordings download as WAV files. Camera permission is needed only for hand control; camera frames are processed locally.",
    "arch": "SHUMFORM uses TypeScript, Vite, Canvas rendering, and a Rust audio engine compiled to WebAssembly and running in an AudioWorklet. MediaPipe provides local webcam hand tracking. The Audiotool Nexus SDK handles authentication, project access, sample uploads, and synchronized project edits. Live performances are captured as stereo WAV audio and inserted into the selected Audiotool project. The web app is hosted on Vercel at shumform.com."
  },
  {
    "id": "metatron",
    "name": "Metatron",
    "team": "Sumad",
    "people": "Alexander Obst",
    "place": "Görlitz",
    "size": "Solo (just me)",
    "pitch": "With Metatron, you can use the \"Learn\" function to link Audiotool parameters with parameters created within Metatron. You can then link multiple LFOs to these parameters and transfer the resulting modulation to an automation track in Audiotool. For instance, you can represent a complex instrument—consisting of synths and effects—as a parameter set in Metatron, save it as a preset, and transfer it to another Audiotool project; it is also possible to morph between two presets.",
    "features": [],
    "challenges": [
      "Connect & Integrate"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data"
    ],
    "url": "https://metatron-lake.vercel.app/",
    "password": "",
    "video": null,
    "github": "https://github.com/sumadmusic-hash/metatron",
    "source": "",
    "sourceNote": "",
    "notes": "",
    "arch": "Modular, UI-centric layered architecture with individual hexagonal/ports-and-adapters elements"
  },
  {
    "id": "sigmora",
    "name": "Sigmora",
    "team": "Sigmora",
    "people": "Peter Okoth Otieno (solo)",
    "place": "",
    "size": "Solo (just me)",
    "pitch": "Sigmora is the growth half of the studio. It tells an Audiotool artist what to make from their real audience, writes that idea into their live Audiotool session as a playable project, and turns the finished track into a launch: platform copy, an ElevenLabs-voiced trailer, dubs, sound design and a Stripe pre-save, then marks the campaign back onto their timeline through Nexus.",
    "features": [
      "Connect Audiotool once (OAuth PKCE via the Nexus SDK); the connection is kept server-side and follows you across browsers, devices and workspaces.",
      "Song Starter: describe your audience (or use your synced audience data) → on-brief song concepts with mood, tempo, hook and full arrangement.",
      "Hear it: an ElevenLabs Music audition of any concept, with alternate takes — an audition, not the record.",
      "Seed into Audiotool: writes a real, named project into your own Audiotool account (tempo, playable beat, labeled concept region).",
      "Build the release: reads the finished project through Nexus (real instruments, tempo) and generates platform-tailored copy, a release plan, a narrated trailer, ElevenLabs dubs, sound effects and an instrumental bed.",
      "Live Stripe pre-save link so the first fan can back the drop.",
      "Writes the campaign back as markers on the Audiotool timeline, then opens a fresh Nexus session to verify the write.",
      "Free welcome credits on sign-in with Audiotool — enough to run the whole loop."
    ],
    "challenges": [
      "Distribution & Marketing"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration",
      "OAuth PKCE browser auth + server-side createServerAuth (headless reads/writes)"
    ],
    "url": "https://sigmora.org",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/luU7xzFD6rE",
      "href": "https://youtu.be/luU7xzFD6rE"
    },
    "github": "https://github.com/mlsniperpro/sigmora-audiotool-connector",
    "source": "",
    "sourceNote": "",
    "notes": "Try it: sign in at sigmora.org with \"Continue with Audiotool\" (free welcome credits cover the full loop), open a project, then Song Starter → Seed into Audiotool → Build the release → Write markers → Verify in Audiotool. Sigmora's content/LLM engine and audience intelligence predate the hackathon; the whole Audiotool/Nexus integration (browser write plane, server read/write plane, Song Starter, Release Autopilot, pre-save, marker write-back and verification) was built for Let's Build!. Built with ElevenLabs: Music v2.5, Sound Effects and Dubbing (voice cloning is consent-gated and watermarked).",
    "arch": "Two Nexus planes under one user authority. The browser plane uses the Nexus SDK OAuth PKCE flow so the artist signs in once; Sigmora keeps the rotating refresh token server-side and hands browsers short-lived access tokens, so every device and workspace member stays connected without re-consent. The server plane (createServerAuth) reads the live project for Song Starter and the release kit and writes seeds, reference samples and campaign markers headlessly, then re-reads the project in a fresh session to verify each write. A Next.js web app on sigmora.org fronts a Node engine (content-autopilot) that runs the LLM steps and ElevenLabs Music, Sound Effects, Dubbing and voice, with media stored in Content Engine (Cloudflare + B2) and a Stripe pre-save."
  },
  {
    "id": "bbcverb",
    "name": "BBCVerb",
    "team": "BBCVerb",
    "people": "Jack Reynolds",
    "place": "BBC London",
    "size": "Solo (just me)",
    "pitch": "BBCVerb for Audiotool puts any recording back in a real room: BBC Maida Vale Studio 1, home of the BBC Symphony Orchestra for 92 years. Sign in with Audiotool, pick a player and one of 80 measured orchestral chairs, and the app renders your track in the cloud through impulse responses captured at that chair on the studio's DPA 4006TL Decca tree. The result comes back into your session as a new track, with its real level, stereo timing and full natural decay. Built on the Audiotool Nexus SDK, it uses the same engine as the BBCVerb plugin.",
    "features": [
      "BBCVerb recreates the sound of the historically significant Maida Vale Studio 1.",
      "BBCVerb places any recording in a real room: BBC Maida Vale Studio 1, home of the BBC Symphony Orchestra.",
      "Build the orchestra: click chairs on the studio's hall plan to hear each of 53 Beethoven players, recorded alone in an anechoic chamber, placed at their seat in the room, then switch between the dry recording and the room, or hear all 53 together.",
      "Render your own audio: built on the Audiotool Nexus SDK, the app reads samples from your Audiotool project (or a dry file), renders them from any of 80 chairs using impulse responses captured in the studio, and adds the result to your session as a new track.",
      "Explore and learn: walk through a 3D scan of the studio, see how the impulse responses were measured, and learn how orchestras are recorded: how we hear distance and direction, why the Decca tree, and what each of the studio's microphones is for.",
      "It Signs you in with Audiotool. It uses the Nexus SDK, so there's no separate account, password or key.",
      "Opens your Audiotool project and lists the samples in it.",
      "Takes your dry audio: a sample from the project, or a WAV or FLAC from your computer (mono or stereo, up to 10 minutes).",
      "Lets you choose a chair: any of 80 measured orchestral chairs in BBC Maida Vale Studio 1. You can pick from a list in orchestral order, or on a plan of the hall.",
      "Renders it in the cloud: your audio is processed with the impulse responses recorded at that chair, through the studio's DPA 4006TL Decca tree with diffuse grids. Real levels and stereo timing, nothing normalised. The full natural decay is kept.",
      "Lets you preview the result in the browser before adding it.",
      "Adds the result to your session as a new track, at the beat you choose. Your original track is left untouched.",
      "Offers the WAV as a download as well.",
      "Includes a walk-through 3D gaussian splat scan of the studio, so you can look around studio."
    ],
    "challenges": [
      "Sound Design & Synthesis"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Multiplayer / Real-time Sync",
      "Audio Integration",
      "Authentication: Audiotool sign-in with PKCE",
      "plus the popup flow when the app runs embedded in Audiotool. The user's Audiotool token also secures our cloud renderer",
      "which checks it with Audiotool before every render. Also the Projects and Samples APIs",
      "to list the user's projects and look up",
      "download and upload samples."
    ],
    "url": "https://bbcverb.com/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/OpWqw-bAz9c",
      "href": "https://youtu.be/OpWqw-bAz9c"
    },
    "github": "",
    "source": "https://mv1.bbcverb.com/source/bbcverb-nexus-source.zip",
    "sourceNote": "The source isn't in a public repository because the app includes BBC assets (the BBC Reith typeface, the BBC VERB logo, Maida Vale Studio 1 photography, and the impulse responses served by the renderer) that can't be made publicly available. The full source and a README are available to the judges as a password-protected download: https://mv1.bbcverb.com/source/bbcverb-nexus-source.zip (any username, password: bbcverbnexus). It's also linked from the app's footer.",
    "notes": "Quickest way to try it: open bbcverb.com, go to The plugin and click chairs. Each one plays its player from Beethoven's Eighth, looping in time, and the switch compares the dry recording with Maida Vale Studio 1. This part needs no sign-in.\n\nTo render your own audio: you need an Audiotool account and a project with at least one sample. Open Your Audiotool session, sign in, and approve BBCVerb's sample read/write access. Then choose a sample and a chair, render, preview, and Add wet track. The result is uploaded to your Audiotool library as an unlisted sample and appears as a new track in your project.\n\nThings to expect:\n\nRenders run on a single cloud instance, so if several judges render at once, a render may wait for the one before it. Long samples take longer.\nThe web app renders through the DPA 4006TL Decca tree only. The other microphone arrays shown on the plan are in the BBCVerb VST plugin.\nThe room is a 382 MB 3D scan and needs WebGL. On phones and tablets it loads only when you tap. Tested mainly in Chrome on desktop.\n\nSource: available to judges as a password-protected download, linked in the app footer, where you will also find standard BBC terms and conditions. See field 11.\n\nCredits: the orchestral recordings are the TU Berlin anechoic Beethoven 8 (CC BY 4.0), with the string players level-matched within each section.",
    "arch": "Front end. A TypeScript single-page app built with Vite. The Audiotool Nexus SDK handles sign-in (OAuth with PKCE), opens the user's project and keeps it in sync, lists and downloads the project's samples, uploads the rendered result as an unlisted sample, and inserts it as a new track through the SDK's own document model, at the project's tempo, with the full decay and the original untouched. Web Audio drives \"Build the orchestra\": 53 players, each looping in sample-locked time on one audio clock, with a live crossfade between the dry recordings and the room. The 3D scan of Maida Vale Studio 1 is a Gaussian splat rendered with Three.js.  Rendering. A Cloudflare Worker fronts a private Cloudflare Container running a Python render service. It uses the same convolution engine as the BBCVerb plugin, and cloud output matches the local engine to 4.55 × 10⁻¹³. The Worker checks each request's Audiotool sign-in with Audiotool's own auth service before forwarding it. The container has no Internet access and holds the impulse-response bank, which never reaches the browser. Each render returns a 48 kHz floating-point WAV plus a receipt naming the IR set's fingerprint, the chair, the microphones and the gain, and the app refuses any render whose receipt doesn't match.  The impulse responses. Measured in Maida Vale Studio 1 with a 12-driver dodecahedral loudspeaker (plus a PA sub for the low end) at orchestral positions, recorded at 96 kHz through the studio's microphone arrays. The web app renders through the DPA 4006TL Decca tree, with diffuse grids, at 80 chairs. Real levels and inter-microphone timing are kept, and nothing is normalised.  Hosting and delivery. Cloudflare Workers and R2 serve the app, the scan (with range requests) and the media. Phones load the lighter tabs first, and the 3D scan loads on request.  Testing. Automated tests cover the SDK integration (against the SDK's real document validator), render requests and receipts, orchestral ordering, sign-in token refresh, the Worker's gates and redirects, and cloud-versus-local render parity."
  },
  {
    "id": "pocket-producer",
    "name": "Pocket Producer",
    "team": "Pocket Producer",
    "people": "Wadood Ur Rehman Ranjha",
    "place": "Pakistan",
    "size": "Solo (just me)",
    "pitch": "Pocket Producer turns a users musical idea into an Audiotool project. Describe an idea or a detailed production brief, and an AI producer builds sections, melodies, rhythms, instruments, effects and automation. Explore the music visually, request precise changes while protecting your favourite parts, then copy the arrangement into Audiotool.",
    "features": [
      "Builds musical arrangements from text prompts, from a vague idea to a detailed production brief.",
      "Includes “Inspire me” and “Rewrite prompt” to help you find a starting point.",
      "Creates sections, melodies, basslines, drum patterns and recurring phrases, with variation across the piece.",
      "Sets up supported instruments, sound parameters, effects, routing and automation.",
      "Lets you bring in recordings or samples, and audition individual source samples.",
      "Shows the arrangement as it develops, with sections and parts you can select and inspect.",
      "Accepts follow-up directions such as “make the chorus bigger, but keep the bass and melody.”",
      "Keeps saved versions so you can compare changes and return to an earlier version.",
      "Saves confirmed progress if generation is interrupted, with continuation where recovery is possible.",
      "Connects to your Audiotool account and copies finished arrangements into Studio as editable projects.",
      "Works on desktop and mobile, with individual user accounts and projects."
    ],
    "challenges": [
      "Ideation & Discovery"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "OAuth authentication; sample and preset resource access; native instrument",
      "note",
      "clip",
      "routing and automation construction; project synchronization and structural readback."
    ],
    "url": "https://pocketapi-production.up.railway.app/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.loom.com/embed/bb0a5decbf294ec18245d570e878abb7",
      "href": "https://www.loom.com/share/bb0a5decbf294ec18245d570e878abb7"
    },
    "github": "https://github.com/theBlackfish01/PocketProducer",
    "source": "",
    "sourceNote": "",
    "notes": "You’ll need an Audiotool account to sign in. The hosted site has set budget for both the Sol and Luna models. If Sol usage is depleted, please try Luna or contact me. If you want to use it locally, please clone my repo and follow the setup instructions from the README. \nA focused 16–32-bar prompt is a good starting point. Generation can take a few minutes, it may occasionally get interrupted, you can ask the agent to continue, and it will pick up from that point.\nThe output is not playable as an audio file on the website. To hear it, use Copy to Audiotool and open the project in Studio.",
    "arch": "Pocket Producer uses a React/TypeScript frontend with Vite, Tailwind, Base UI, Motion and SVG for its interactive Listening Room. A Fastify API and durable background worker run on Railway with PostgreSQL. A Deep Agents/LangGraph workflow lets the selected language model propose validated musical operations. A canonical arrangement document stores the music, while immutable revisions, protected-part checks and durable checkpoints preserve user work. The Audiotool Nexus SDK handles authenticated project construction, supported sound resources and structural readback. Copying to Audiotool is an explicit user action. Model requests and external operations are tracked for spending control and safe recovery."
  },
  {
    "id": "brickhouse",
    "name": "BrickHouse",
    "team": "BrickHouse Studios",
    "people": "Anthony Agado",
    "place": "",
    "size": "Solo (just me)",
    "pitch": "BrickHouse is an AI co-producer that works inside Audiotool: find sounds, place them in a live session, listen to the real mix, make native EQ and effect moves through Nexus, and verify the result — while a human approves every write.",
    "features": [
      "Search Audiotool's sample catalog through Nexus and audition real previews without changing the project.",
      "Use This → Review & Send → Confirm Send keeps the final write human-approved.",
      "Verify the exact live Audiotool project before delivery; stale targets fail closed.",
      "Place approved sounds into the real Audiotool session.",
      "Read Audiotool's native Curve EQ live pre/post spectrum.",
      "Apply native EQ/effect moves through Nexus from producer-language intent.",
      "Fresh Nexus readback verifies each mutation.",
      "Stable operation IDs, durable receipts, and exact undo keep writes recoverable.",
      "Human UI and authorized agents operate the same BrickHouse session and actions."
    ],
    "challenges": [
      "Connect & Integrate"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "Audio Integration",
      "Samples API; native device control; live Curve spectrum/runtime readback"
    ],
    "url": "https://brickhouse-audio-workbench.vercel.app/",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/hT1-iHOXWKI",
      "href": "https://youtu.be/hT1-iHOXWKI"
    },
    "github": "https://github.com/brickhousestudios/brickhouse-audio-workbench",
    "source": "",
    "sourceNote": "",
    "notes": "The hosted app demonstrates BrickHouse's producer-facing Workbench. Consequential Audiotool writes are guarded by an explicit human Confirm Send step. The public source repo intentionally excludes private deployment credentials, protected control endpoints, and studio-specific infrastructure.",
    "arch": "Next.js Audio Workbench + shared BrickHouse authority + MCP agent controls + Audiotool Nexus SDK. The UI and agents operate the same session/actions. Nexus provides sample discovery, project/document reads and writes, native device control, live Curve spectrum access, fresh readback, receipts, and undo."
  },
  {
    "id": "seedbed",
    "name": "Seedbed",
    "team": "Seedbed",
    "people": "Diego Pinzon, Dan Thompson",
    "place": "New Orleans and Boston",
    "size": "2 people",
    "pitch": "Ableton, meet Audiotool. Seedbed connects Ableton Live and Audiotool so producers on different tools can work on the same song.",
    "features": [
      "Audiotool to Ableton: bring any Audiotool project back into Ableton Live with the arrangement rebuilt.",
      "Ableton to Audiotool: open any Ableton project as a new Audiotool project directly from the Ableton extension.",
      "Remix tree: every seed, remix, and version across Ableton, Audiotool, and the Seedbed browser editor in one shared tree.",
      "Social layer: feed, profiles, timed comments, charts, notifications."
    ],
    "challenges": [
      "Connect & Integrate"
    ],
    "category": "",
    "sdk": [
      "Read/Write Project Data",
      "MIDI Integration",
      "Audio Integration",
      "OAuth (browser and server-side)",
      "Projects API",
      "Presets API (GM instruments and drums)",
      "Render API"
    ],
    "url": "https://app.seed-bed.com",
    "password": "",
    "video": {
      "kind": "iframe",
      "src": "https://www.youtube-nocookie.com/embed/4A2l2vLnRtU",
      "href": "https://www.youtube.com/watch?v=4A2l2vLnRtU"
    },
    "github": "",
    "source": "",
    "sourceNote": "",
    "notes": "Everything works at app.seed-bed.com with an Audiotool account, including live sync to Audiotool, so judges don't need Ableton. The Ableton side (sync and pull from Live) requires Ableton Live 12 Beta and the Seedbed extension (install instructions in the browser).\n\nKnown limits: Ableton instruments become General MIDI stand-ins in Audiotool (the notes survive, the instrument doesn't). Audio from Ableton crosses pre-FX. Automation, sends, and effects don't carry over. Sync runs on pauses in editing, not on every keystroke.\n\nAudiotool edits return through Pull or Import, not live.",
    "arch": ""
  }
];
