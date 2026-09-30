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
const STORE = "lb-vote-v2";
const PLACES = [
  [1, "1st"],
  [2, "2nd"],
  [3, "3rd"],
];

const ballotForm = document.getElementById("ballot");
const judgeEl = document.getElementById("judge");
const sendEl = document.getElementById("send");
const statusEl = document.getElementById("ballot-status");

const state = {
  q: "",
  challenge: "",
  selected: location.hash.replace("#", "") || APPS[0].id,
  judge: "",
  picks: emptyBallot(),
  notes: {},
  status: "",
  fallback: "",
  sending: false,
  sent: false,
};

function emptyBallot() {
  const picks = {};
  for (const [id] of CHALLENGES) picks[id] = [];
  return picks;
}

function voteName(app) {
  return VOTE_NAMES[app.id] || app.name;
}

function appById(id) {
  return APPS.find((app) => app.id === id);
}

function categoryOf(app) {
  return CHALLENGES.find(([id]) => app.challenges.includes(id))?.[0] || "";
}

function categoryLabel(id) {
  return CHALLENGES.find(([key, label]) => key === id)?.[1] || id;
}

function rankOf(id) {
  const app = appById(id);
  if (!app) return 0;
  const row = state.picks[categoryOf(app)] || [];
  return row.indexOf(id) + 1;
}

function categoryMembers(categoryId) {
  return APPS.filter((app) => categoryOf(app) === categoryId);
}

function categoryComplete(id) {
  const row = state.picks[id] || [];
  const members = categoryMembers(id).map((app) => app.id);
  return row.length === members.length && members.every((member) => row.includes(member));
}

function loadVote() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "null");
    if (!saved) return;
    state.judge = saved.judge || "";
    state.notes = saved.notes && typeof saved.notes === "object" ? saved.notes : {};
    state.picks = emptyBallot();
    for (const [id] of CHALLENGES) {
      const row = (saved.picks && saved.picks[id]) || [];
      const members = categoryMembers(id).map((app) => app.id);
      if (Array.isArray(row) && row.length === members.length && members.every((m) => row.includes(m))) {
        state.picks[id] = row.slice();
      }
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

function notesPayload(categoryId) {
  const lines = [`Category: ${categoryLabel(categoryId)}`];
  for (const app of APPS) {
    if (categoryOf(app) !== categoryId) continue;
    const note = (state.notes[app.id] || "").trim().replace(/\s+/g, " ");
    if (note) lines.push(`${voteName(app)}: ${note}`);
  }
  return lines.join("\n");
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

function syncSend() {
  const named = Boolean(state.judge.trim());
  const done = CHALLENGES.filter(([id]) => categoryComplete(id)).length;
  const ready = named && done === CHALLENGES.length;
  sendEl.disabled = state.sending || !ready;
  if (state.sending || state.sent) return;
  if (!ready) {
    const missing = [];
    if (done < CHALLENGES.length) missing.push(`${done} of ${CHALLENGES.length} categories ranked`);
    if (!named) missing.push("name missing");
    setStatus(missing.join(" · "));
    return;
  }
  setStatus("Ready to send.");
}

function sectionApps(categoryId, apps) {
  const group = apps.filter((app) => app.challenges.includes(categoryId));
  if (!categoryComplete(categoryId)) return ordered(categoryId, group);
  const ranked = state.picks[categoryId].map(appById).filter((app) => group.includes(app));
  const rest = ordered(
    categoryId,
    group.filter((app) => !ranked.includes(app))
  );
  return [...ranked, ...rest];
}

function setOrder(categoryId, ids) {
  const members = categoryMembers(categoryId).map((app) => app.id);
  if (ids.length !== members.length || members.some((member) => !ids.includes(member))) return;
  state.picks[categoryId] = ids.slice();
  state.sent = false;
  saveVote();
  paintVote();
}

function assign(id, place) {
  const categoryId = categoryOf(appById(id));
  const current = categoryComplete(categoryId)
    ? state.picks[categoryId].slice()
    : sectionApps(categoryId, APPS).map((app) => app.id);
  current.splice(current.indexOf(id), 1);
  current.splice(place - 1, 0, id);
  setOrder(categoryId, current);
}

function paintVote() {
  renderList(visibleApps());
  const place = rankOf(state.selected);
  for (const button of stageEl.querySelectorAll("[data-place]")) {
    button.setAttribute("aria-pressed", Number(button.dataset.place) === place ? "true" : "false");
  }
  syncSend();
}

function voteBox(app) {
  const place = rankOf(app.id);
  const label = categoryLabel(categoryOf(app));
  const points = el(
    "div",
    { class: "points" },
    PLACES.map(([value, placeLabel]) =>
      el("button", {
        class: "point",
        type: "button",
        "data-place": String(value),
        pressed: place === value,
        text: placeLabel,
        title: `Rank ${placeLabel} in ${label}`,
        "aria-label": `Rank ${placeLabel} in ${label}`,
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
    el("h3", { text: `Place in ${label}` }),
    points,
    el("p", { class: "vote-hint", text: "You can also drag the cards in the list. The top card is 1st." }),
    note,
  ]);
}

async function sendVote() {
  const judge = state.judge.trim();
  if (!judge) {
    setStatus("Add your name first.");
    judgeEl.focus();
    return;
  }
  const open = CHALLENGES.filter(([id]) => !categoryComplete(id)).map(([, label]) => label);
  if (open.length) {
    setStatus(`Still open: ${open.join(", ")}.`);
    return;
  }
  state.sending = true;
  state.sent = false;
  syncSend();
  setStatus("Sending…");
  let sent = 0;
  try {
    for (const [id, label] of CHALLENGES) {
      const slots = state.picks[id];
      const body = new URLSearchParams();
      body.append(FIELDS.judge, `${judge} · ${label}`);
      body.append(FIELDS.p3, voteName(appById(slots[0])));
      body.append(FIELDS.p2, voteName(appById(slots[1])));
      body.append(FIELDS.p1, voteName(appById(slots[2])));
      body.append(FIELDS.notes, notesPayload(id));
      try {
        await fetch(`${FORM}/formResponse`, { method: "POST", mode: "no-cors", body });
        sent += 1;
      } catch {
        body.append("usp", "pp_url");
        state.sent = true;
        setStatus(
          sent ? `Sent ${sent} of 6 categories. ${label} did not leave this browser.` : "The vote did not leave this browser.",
          `${FORM}/viewform?${body.toString()}`
        );
        return;
      }
    }
    state.sent = true;
    setStatus("Sent all 6 categories. Sending again replaces your vote.");
  } finally {
    state.sending = false;
    syncSend();
  }
}

let drag = null;

function cardsIn(categoryId) {
  return [...listEl.querySelectorAll(".app-card")].filter((card) => card.dataset.cat === categoryId);
}

function wholeCategoryVisible(categoryId) {
  return cardsIn(categoryId).length === categoryMembers(categoryId).length;
}

function commitOrder(categoryId) {
  setOrder(categoryId, cardsIn(categoryId).map((card) => card.dataset.id));
}

function bindCard(card, grip, app) {
  const categoryId = categoryOf(app);

  card.addEventListener("pointerdown", (event) => {
    if (event.button) return;
    const fromGrip = grip.contains(event.target);
    if (event.pointerType === "touch" && !fromGrip) return;
    drag = { id: app.id, pointer: event.pointerId, startY: event.clientY, active: false };
    if (fromGrip) event.preventDefault();
  });

  card.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== app.id || drag.pointer !== event.pointerId) return;
    if (!drag.active) {
      if (Math.abs(event.clientY - drag.startY) < 5) return;
      if (!wholeCategoryVisible(categoryId)) {
        drag = null;
        return;
      }
      drag.active = true;
      card.classList.add("dragging");
      card.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const others = cardsIn(categoryId).filter((item) => item !== card);
    let before = null;
    for (const other of others) {
      const box = other.getBoundingClientRect();
      if (event.clientY < box.top + box.height / 2) {
        before = other;
        break;
      }
    }
    listEl.insertBefore(card, before || others[others.length - 1].nextSibling);
  });

  const finish = (event) => {
    if (!drag || drag.id !== app.id || drag.pointer !== event.pointerId) return;
    const dragged = drag.active;
    drag = null;
    card.classList.remove("dragging");
    if (dragged) commitOrder(categoryId);
    else select(app.id);
  };
  card.addEventListener("pointerup", finish);
  card.addEventListener("pointercancel", () => {
    if (!drag || drag.id !== app.id) return;
    const dragged = drag.active;
    drag = null;
    card.classList.remove("dragging");
    if (dragged) paintVote();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(app.id);
      return;
    }
    const step = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
    if (!step || !event.altKey) return;
    event.preventDefault();
    const ids = cardsIn(categoryId).map((item) => item.dataset.id);
    const from = ids.indexOf(app.id);
    const to = from + step;
    if (to < 0 || to >= ids.length) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    setOrder(categoryId, ids);
    const next = listEl.querySelector(`.app-card[data-id="${app.id}"]`);
    if (next) next.focus();
  });
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
}

function renderList(apps) {
  countEl.textContent = `${apps.length} of ${APPS.length}`;
  listEl.replaceChildren();
  if (!apps.length) {
    listEl.append(el("p", { class: "empty", text: "Nothing matches that search." }));
    return;
  }
  const sections = CHALLENGES.map(([id, label]) => [id, label, sectionApps(id, apps)]).filter(([, , group]) => group.length);
  for (const [id, label, group] of sections) {
    const full = group.length === categoryMembers(id).length;
    const done = categoryComplete(id);
    const side = done
      ? el("span", { class: "group-state done", text: "Ranked" })
      : full
        ? el("button", {
            class: "group-set",
            type: "button",
            text: "Keep this order",
            title: `Take the order shown as your ranking for ${label}`,
            onclick: () => setOrder(id, group.map((app) => app.id)),
          })
        : el("span", { class: "group-state", text: "Clear the search to rank" });
    listEl.append(
      el("div", { class: "group-head" }, [el("p", { class: "group-label", text: label }), side])
    );
    for (const app of group) appendCard(app, done);
  }
}

function appendCard(app, ranked) {
    const color = hue(app.id);
    const mark = el("span", { class: "mark", text: initials(app.name) });
    mark.style.background = PAPER[color];
    mark.style.color = INK[color];
    const grip = el("span", { class: "grip", text: "⠿", "aria-hidden": "true" });
    const place = rankOf(app.id);
    const copy = el("span", { class: "row-copy" }, [
      el("span", { class: "row-name", text: app.name }),
      el("span", { class: "row-pitch", text: app.people || "" }),
    ]);
    const hasVideo = app.video && app.video.kind !== "note";
    const card = el(
      "div",
      {
        class: ranked ? "app-card ranked" : "app-card",
        role: "option",
        tabindex: "0",
        "aria-selected": app.id === state.selected ? "true" : "false",
        "aria-label": place ? `${place}. ${app.name}` : app.name,
        "data-id": app.id,
        "data-cat": categoryOf(app),
      },
      [
        grip,
        el("span", { class: "place", text: place ? String(place) : "" }),
        mark,
        copy,
        el("span", { class: hasVideo ? "dot" : "dot off", title: hasVideo ? "Has a demo video" : "" }),
      ]
    );
    bindCard(card, grip, app);
    listEl.append(card);
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
  syncSend();
  const nextHash = state.selected ? `#${state.selected}` : "";
  if (location.hash !== nextHash) history.replaceState(null, "", nextHash || location.pathname);
}

searchEl.addEventListener("input", () => {
  state.q = searchEl.value;
  render();
});

judgeEl.addEventListener("input", () => {
  state.judge = judgeEl.value;
  state.sent = false;
  saveVote();
  syncSend();
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
