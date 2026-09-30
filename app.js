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

const state = {
  q: "",
  challenge: "",
  video: false,
  selected: location.hash.replace("#", "") || APPS[0].id,
};

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
    const copy = el("span", {}, [
      el("span", { class: "row-name", text: app.name }),
      el("span", {
        class: "row-pitch",
        text: app.people || "",
      }),
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
    mediaNode(app),
    el("div", { class: "stage-head" }, [
      el("div", {}, [
        el("h2", { text: app.name }),
        el("p", { class: "byline", text: bylineBits.join(" · ") }),
      ]),
      actions,
    ]),
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
  const nextHash = state.selected ? `#${state.selected}` : "";
  if (location.hash !== nextHash) history.replaceState(null, "", nextHash || location.pathname);
}

searchEl.addEventListener("input", () => {
  state.q = searchEl.value;
  render();
});

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
