const CHALLENGES = [
  ["Ideation & Discovery", "Ideation"],
  ["Composition & Theory", "Composition"],
  ["Music Games & Interactive Experiences", "Music games"],
  ["Sound Design & Synthesis", "Sound design"],
  ["Connect & Integrate", "Connect"],
  ["Distribution & Marketing", "Distribution"],
];

const ORDER = {
  "Ideation & Discovery": ["pocket-producer", "lark", "pocket-producer-library"],
  "Composition & Theory": ["score-io", "chord-suggester", "harmonic-quest"],
  "Music Games & Interactive Experiences": ["keep-the-beat"],
  "Sound Design & Synthesis": ["bbcverb", "shumform", "quill"],
  "Connect & Integrate": ["seedbed", "brickhouse", "metatron"],
};

function ordered(challenge, apps) {
  const rank = ORDER[challenge];
  if (!rank) return apps;
  return apps.slice().sort((a, b) => {
    const ia = rank.indexOf(a.id);
    const ib = rank.indexOf(b.id);
    return (ia === -1 ? rank.length : ia) - (ib === -1 ? rank.length : ib);
  });
}

const INK = ["#1c1914", "#14201b", "#241714", "#171c28", "#241e10", "#1c1420"];
const PAPER = ["#efe2c2", "#c9ead8", "#f3c2b2", "#d5def6", "#f3e0a4", "#f0c6df"];

const listEl = document.getElementById("list");
const stageEl = document.getElementById("stage");
const countEl = document.getElementById("count");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("q");

const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfKEDhxXdy7oF8kUA0Hj8Hv_oY5SsIo80edhF_I3AWTFRo4EQ";
const FIELDS = {
  judge: "entry.844778617",
  p3: "entry.413862904",
  p2: "entry.8585587",
  p1: "entry.532336417",
  notes: "entry.253915332",
};
const VOTE_NAMES = {
  "pocket-producer": "Pocket Producer (Wadood)",
  "pocket-producer-library": "Pocket Producer (Chuling Li)",
};
const STORE = "lb-vote-v1";

const ballotForm = document.getElementById("ballot");
const judgeEl = document.getElementById("judge");
const picksEl = document.getElementById("ballot-picks");
const sendEl = document.getElementById("send");
const statusEl = document.getElementById("ballot-status");

const state = {
  q: "",
  challenge: "",
  video: false,
  selected: location.hash.replace("#", "") || APPS[0].id,
  judge: "",
  picks: { p3: "", p2: "", p1: "" },
  notes: {},
  status: "",
  fallback: "",
  sending: false,
};

function voteName(app) {
  return VOTE_NAMES[app.id] || app.name;
}

function appById(id) {
  return APPS.find((app) => app.id === id);
}

function rankOf(id) {
  if (state.picks.p3 === id) return 3;
  if (state.picks.p2 === id) return 2;
  if (state.picks.p1 === id) return 1;
  return 0;
}

function loadVote() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "null");
    if (!saved) return;
    state.judge = saved.judge || "";
    state.notes = saved.notes && typeof saved.notes === "object" ? saved.notes : {};
    for (const key of ["p3", "p2", "p1"]) {
      const id = saved.picks && saved.picks[key];
      state.picks[key] = appById(id) ? id : "";
    }
  } catch {
    /* keep the empty ballot */
  }
  judgeEl.value = state.judge;
}

function saveVote() {
  localStorage.setItem(
    STORE,
    JSON.stringify({ judge: state.judge, picks: state.picks, notes: state.notes })
  );
}

function notesPayload() {
  return APPS.map((app) => {
    const note = (state.notes[app.id] || "").trim().replace(/\s+/g, " ");
    return note ? `${voteName(app)}: ${note}` : "";
  })
    .filter(Boolean)
    .join("\n");
}

function setStatus(text, href) {
  state.status = text;
  state.fallback = href || "";
  statusEl.replaceChildren(document.createTextNode(text));
  if (href) {
    statusEl.append(document.createTextNode(" "));
    statusEl.append(
      el("a", { href, target: "_blank", rel: "noopener noreferrer", text: "Open the form" })
    );
  }
}

function syncBallot() {
  picksEl.replaceChildren();
  for (const [key, points] of [["p3", 3], ["p2", 2], ["p1", 1]]) {
    const app = appById(state.picks[key]);
    const pick = el(
      "button",
      {
        class: app ? "pick filled" : "pick",
        type: "button",
        onclick: () => {
          if (app) select(app.id);
        },
      },
      [el("b", { text: String(points) }), el("span", { text: app ? voteName(app) : "Not chosen" })]
    );
    picksEl.append(pick);
  }
  sendEl.disabled = state.sending;
}

function assign(id, points) {
  const key = `p${points}`;
  if (state.picks[key] === id) {
    state.picks[key] = "";
  } else {
    for (const slot of ["p3", "p2", "p1"]) {
      if (state.picks[slot] === id) state.picks[slot] = "";
    }
    state.picks[key] = id;
  }
  saveVote();
  paintVote();
}

function paintVote() {
  renderList(visibleApps());
  for (const button of stageEl.querySelectorAll("[data-points]")) {
    button.setAttribute("aria-pressed", Number(button.dataset.points) === rankOf(state.selected) ? "true" : "false");
  }
  syncBallot();
}

function voteBox(app) {
  const rank = rankOf(app.id);
  const points = el(
    "div",
    { class: "points" },
    [3, 2, 1].map((value) =>
      el("button", {
        class: "point",
        type: "button",
        "data-points": String(value),
        pressed: rank === value,
        text: String(value),
        title: rank === value ? "Click again to undo" : `Give ${value} ${value === 1 ? "point" : "points"}`,
        "aria-label": `Give ${value} ${value === 1 ? "point" : "points"}`,
        onclick: () => assign(app.id, value),
      })
    )
  );
  const note = el("textarea", {
    class: "vote-note",
    rows: "2",
    placeholder: "Optional note. It is sent with your vote.",
  });
  note.value = state.notes[app.id] || "";
  note.addEventListener("input", () => {
    state.notes[app.id] = note.value;
    saveVote();
  });
  return el("section", { class: "vote-box" }, [
    el("h3", { text: "Your points" }),
    points,
    el("p", { class: "vote-hint", text: "One app for each number. Click a number again to undo." }),
    note,
  ]);
}

async function sendVote() {
  const judge = state.judge.trim();
  const pick3 = appById(state.picks.p3);
  const pick2 = appById(state.picks.p2);
  const pick1 = appById(state.picks.p1);
  if (!judge) {
    setStatus("Add your name first.");
    judgeEl.focus();
    return;
  }
  if (!pick3 || !pick2 || !pick1) {
    setStatus("Choose a 1st, 2nd and 3rd before sending.");
    return;
  }
  const body = new URLSearchParams();
  body.append(FIELDS.judge, judge);
  body.append(FIELDS.p3, voteName(pick3));
  body.append(FIELDS.p2, voteName(pick2));
  body.append(FIELDS.p1, voteName(pick1));
  body.append(FIELDS.notes, notesPayload());
  state.sending = true;
  syncBallot();
  setStatus("Sending…");
  try {
    await fetch(`${FORM}/formResponse`, { method: "POST", mode: "no-cors", body });
    setStatus("Sent from this browser. A new row in the sheet is the confirmation. Sending again replaces your last vote.");
  } catch {
    body.append("usp", "pp_url");
    setStatus("The vote did not leave this browser.", `${FORM}/viewform?${body.toString()}`);
  } finally {
    state.sending = false;
    syncBallot();
  }
}

function hue(id) {
  let n = 0;
  for (const ch of id) n = (n + ch.charCodeAt(0) * 17) % INK.length;
  return n;
}

function initials(name) {
  const parts = name.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function matches(app) {
  if (state.challenge && !app.challenges.includes(state.challenge)) return false;
  if (state.video && !(app.video && app.video.kind !== "note")) return false;
  const q = state.q.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    app.name,
    app.team,
    app.people,
    app.place,
    app.pitch,
    app.category,
    app.notes,
    ...(app.features || []),
    ...(app.challenges || []),
  ]
    .join("\n")
    .toLowerCase();
  return hay.includes(q);
}

function visibleApps() {
  return APPS.filter(matches);
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "pressed") {
      node.setAttribute("aria-pressed", value ? "true" : "false");
      continue;
    }
    if (value == null || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  for (const child of children) node.append(child);
  return node;
}

function renderFilters() {
  filtersEl.replaceChildren();
  const chips = [
    { id: "", label: "All" },
    ...CHALLENGES.map(([id, label]) => ({ id, label })),
  ];
  for (const chip of chips) {
    filtersEl.append(
      el("button", {
        class: "chip",
        type: "button",
        pressed: state.challenge === chip.id,
        text: chip.label,
        onclick: () => {
          state.challenge = chip.id;
          render();
        },
      })
    );
  }
  filtersEl.append(
    el("button", {
      class: "chip",
      type: "button",
      pressed: state.video,
      text: "With a video",
      onclick: () => {
        state.video = !state.video;
        render();
      },
    })
  );
}

function renderList(apps) {
  countEl.textContent = `${apps.length} of ${APPS.length}`;
  listEl.replaceChildren();
  if (!apps.length) {
    listEl.append(el("p", { class: "empty", text: "Nothing matches that search." }));
    return;
  }
  const sections = state.challenge
    ? [[state.challenge, ordered(state.challenge, apps)]]
    : CHALLENGES.map(([id, label]) => [label, ordered(id, apps.filter((app) => app.challenges.includes(id)))]).filter(([, group]) => group.length);
  for (const [label, group] of sections) {
    if (!state.challenge) listEl.append(el("p", { class: "group-label", text: label }));
    for (const app of group) appendRow(app);
  }
}

function appendRow(app) {
    const color = hue(app.id);
    const mark = el("span", { class: "mark", text: initials(app.name) });
    mark.style.background = PAPER[color];
    mark.style.color = INK[color];
    const rank = rankOf(app.id);
    const copy = el("span", {}, [
      el("span", { class: "row-name", text: app.name }),
      el("span", {
        class: "row-pitch",
        text: app.people || "",
      }),
      ...(rank ? [el("span", { class: "rank-badge", text: `${rank} pt` })] : []),
    ]);
    const hasVideo = app.video && app.video.kind !== "note";
    const row = el(
      "button",
      {
        class: "app-row",
        type: "button",
        role: "option",
        "aria-selected": app.id === state.selected ? "true" : "false",
        onclick: () => select(app.id),
      },
      [mark, copy, el("span", { class: hasVideo ? "dot" : "dot off", title: hasVideo ? "Has a demo video" : "" })]
    );
    listEl.append(row);
}

function mediaNode(app) {
  const video = app.video;
  const embedded = video && (video.kind === "iframe" || video.kind === "video");
  const frame = el("div", { class: embedded ? "media" : "media plain" });
  if (video && video.kind === "iframe") {
    frame.append(
      el("iframe", {
        src: video.src,
        title: `${app.name} demo`,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
        allowfullscreen: "true",
        loading: "lazy",
      })
    );
    return frame;
  }
  if (video && video.kind === "video") {
    const player = el("video", { controls: "true", playsinline: "true", src: video.src });
    player.append(el("track", { kind: "captions" }));
    frame.append(player);
    return frame;
  }
  const fallback = el("div", { class: "media-fallback" }, [
    el("strong", { text: app.name }),
    el("span", {
      text:
        video && video.kind === "note"
          ? video.label
          : video && video.kind === "link"
            ? "The demo opens in a new tab."
            : "No demo video was submitted.",
    }),
  ]);
  frame.append(fallback);
  return frame;
}

function linkBtn(href, label, primary) {
  if (!href) return null;
  return el("a", {
    class: primary ? "btn primary" : "btn ghost",
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    text: label,
  });
}

function renderStage(app) {
  if (!app) {
    stageEl.replaceChildren(
      el("div", { class: "stage-inner" }, [
        el("p", { class: "empty", text: "Pick an app from the list." }),
      ])
    );
    return;
  }

  const actions = el("div", { class: "actions" });
  const launch = linkBtn(app.url, "Open app", true);
  if (launch) actions.append(launch);
  if (app.video && (app.video.kind === "link" || app.video.href) && app.video.kind !== "iframe" && app.video.kind !== "video") {
    const watch = linkBtn(app.video.href, app.video.label || "Watch demo", false);
    if (watch) actions.append(watch);
  }
  const github = linkBtn(app.github, "Source", false);
  if (github) actions.append(github);
  const sourceHref = app.source && app.source !== app.url ? app.source : "";
  const source = linkBtn(sourceHref, "Download source", false);
  if (source) actions.append(source);

  const bylineBits = [app.people, app.place, app.size].filter(Boolean);
  const tags = el("div", { class: "tags" });
  for (const tag of [...(app.category ? [app.category] : []), ...app.challenges, ...app.sdk]) {
    tags.append(el("span", { class: "tag", text: tag }));
  }

  const children = [
    el("button", {
      class: "back",
      type: "button",
      text: "← All apps",
      onclick: () => {
        document.body.classList.remove("show-detail");
        history.replaceState(null, "", location.pathname);
      },
    }),
    el("div", { class: "stage-head" }, [
      el("div", {}, [
        el("h2", { text: app.name }),
        el("p", { class: "byline", text: bylineBits.join(" · ") }),
      ]),
      actions,
    ]),
    voteBox(app),
    mediaNode(app),
  ];

  if (app.password) {
    children.push(
      el("div", { class: "password" }, [
        document.createTextNode("Demo password "),
        el("b", { text: app.password }),
      ])
    );
  }
  if (app.team && app.team.toLowerCase() !== app.name.toLowerCase()) {
    children.push(el("p", { class: "byline", text: `Team ${app.team}` }));
  }
  if (app.pitch) children.push(el("p", { class: "pitch", text: app.pitch }));
  children.push(tags);

  if (app.features.length) {
    children.push(
      el("section", { class: "section" }, [
        el("h3", { text: "What it does" }),
        el(
          "ul",
          { class: "features" },
          app.features
            .filter((item) => !/^features of /i.test(item))
            .map((item) => el("li", { text: item }))
        ),
      ])
    );
  }
  if (app.notes) {
    children.push(
      el("section", { class: "section" }, [
        el("h3", { text: "Before you open it" }),
        el("p", { class: "notes", text: app.notes }),
      ])
    );
  }
  if (app.arch) {
    children.push(
      el("details", { class: "fold" }, [
        el("summary", { text: "How it's built" }),
        el("p", { class: "arch", text: app.arch }),
      ])
    );
  }
  if (app.sourceNote) {
    children.push(
      el("section", { class: "section" }, [
        el("h3", { text: "Source" }),
        el("p", { class: "notes", text: app.sourceNote }),
      ])
    );
  }

  stageEl.replaceChildren(el("div", { class: "stage-inner" }, children));
  stageEl.scrollTop = 0;
}

function select(id) {
  state.selected = id;
  history.replaceState(null, "", `#${id}`);
  if (window.matchMedia("(max-width: 900px)").matches) {
    document.body.classList.add("show-detail");
  }
  render();
}

function render() {
  const apps = visibleApps();
  if (!apps.some((app) => app.id === state.selected)) {
    state.selected = apps[0] ? apps[0].id : "";
  }
  renderFilters();
  renderList(apps);
  renderStage(APPS.find((app) => app.id === state.selected));
  syncBallot();
  const nextHash = state.selected ? `#${state.selected}` : "";
  if (location.hash !== nextHash) history.replaceState(null, "", nextHash || location.pathname);
}

searchEl.addEventListener("input", () => {
  state.q = searchEl.value;
  render();
});

judgeEl.addEventListener("input", () => {
  state.judge = judgeEl.value;
  saveVote();
});

ballotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendVote();
});

loadVote();

window.addEventListener("hashchange", () => {
  const id = location.hash.replace("#", "");
  if (APPS.some((app) => app.id === id)) {
    state.selected = id;
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.body.classList.add("show-detail");
    }
    render();
  }
});

if (location.hash && window.matchMedia("(max-width: 900px)").matches) {
  document.body.classList.add("show-detail");
}
render();
