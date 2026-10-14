/* Agility Club — site behaviour. Content lives in config.js. */
(function () {
  "use strict";

  var CFG = window.AGILITY_CLUB || { links: {}, team: [] };
  var L = CFG.links;
  document.documentElement.classList.add("js");

  var isPlaceholder = function (v) { return !v || v.indexOf("REPLACE_ME") !== -1; };

  /* ---------- links: <a data-link="key"> ---------- */
  function mailto(addr, subject, body) {
    var q = [];
    if (subject) q.push("subject=" + encodeURIComponent(subject));
    if (body) q.push("body=" + encodeURIComponent(body));
    return "mailto:" + addr + (q.length ? "?" + q.join("&") : "");
  }

  document.querySelectorAll("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    var url = L[key];
    if (key === "clubEmail") {
      a.href = mailto(L.clubEmail, a.getAttribute("data-subject"));
      if (!a.textContent.trim()) a.textContent = L.clubEmail;
      return;
    }
    if (key === "join" && isPlaceholder(url)) {
      a.href = mailto(L.clubEmail, "I'd like to join the Agility Club",
        "Hi Agility Club,\n\nPlease add me to the member list.\n\nName:\nProgram / role:\nuLethbridge email:\n");
      return;
    }
    if (isPlaceholder(url)) {
      a.setAttribute("aria-disabled", "true");
      a.title = "Link coming soon";
      a.addEventListener("click", function (e) { e.preventDefault(); });
      return;
    }
    if (url) a.href = url;
    if (/^https?:/.test(a.href) && a.hostname !== location.hostname) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  document.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = L.clubEmail; });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) toggle.click();
    });
  }

  /* ---------- Innovation Zone live status (Mon–Fri 10:30–4:30, Mountain time) ---------- */
  function zoneStatus() {
    var parts = {};
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Edmonton", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var day = parts.weekday.slice(0, 3);
    var mins = (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10);
    var weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) !== -1;
    var open = weekday && mins >= 630 && mins < 990;
    var label;
    if (open) label = "Open · until 4:30 pm";
    else if (weekday && mins < 630) label = "Closed · opens 10:30 am";
    else if (day === "Fri" || day === "Sat" || day === "Sun" || !weekday) label = "Closed · opens Mon 10:30 am";
    else label = "Closed · opens tomorrow 10:30 am";
    var time = (parseInt(parts.hour, 10) % 24) + ":" + parts.minute;
    return { open: open, label: label, time: time };
  }
  function paintStatus() {
    var s = zoneStatus();
    document.querySelectorAll("[data-zone-status]").forEach(function (el) {
      el.innerHTML = '<span class="status-dot' + (s.open ? " open" : "") + '"></span>' + s.label;
    });
    document.querySelectorAll("[data-zone-time]").forEach(function (el) { el.textContent = s.time + " MT"; });
  }
  if (document.querySelector("[data-zone-status],[data-zone-time]")) {
    paintStatus();
    setInterval(paintStatus, 30000);
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- topographic field (the coulees, drawn live) ---------- */
  var perm = new Uint8Array(512);
  (function () {
    var p = [], s = 4401, i, j, t;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      j = s % (i + 1);
      t = p[i]; p[i] = p[j]; p[j] = t;
    }
    for (i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();
  function h(i, j, k) { return perm[perm[perm[i & 255] + (j & 255)] + (k & 255)] / 255; }
  function fade(t) { return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function noise(x, y, z) {
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    var u = fade(x - xi), v = fade(y - yi), w = fade(z - zi);
    return lerp(
      lerp(lerp(h(xi, yi, zi), h(xi + 1, yi, zi), u), lerp(h(xi, yi + 1, zi), h(xi + 1, yi + 1, zi), u), v),
      lerp(lerp(h(xi, yi, zi + 1), h(xi + 1, yi, zi + 1), u), lerp(h(xi, yi + 1, zi + 1), h(xi + 1, yi + 1, zi + 1), u), v),
      w
    );
  }
  // marching-squares edge pairs; edges: 0 top, 1 right, 2 bottom, 3 left
  var CASES = [[], [3, 2], [2, 1], [3, 1], [0, 1], [0, 3, 2, 1], [0, 2], [3, 0], [3, 0], [0, 2], [0, 1, 3, 2], [0, 1], [3, 1], [2, 1], [3, 2], []];

  function Topo(canvas) {
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scale = parseFloat(canvas.getAttribute("data-topo")) || 1;
    var seed = parseFloat(canvas.getAttribute("data-seed")) || 0;
    var cell = 11, w = 0, h2 = 0, cols = 0, rows = 0, field = null;
    var mouse = { x: -1e4, y: -1e4, s: 0, target: 0 };
    var visible = true, last = 0, t0 = performance.now();

    function resize() {
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h2 = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h2 * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 700 ? 9 : 11;
      cols = Math.ceil(w / cell) + 1;
      rows = Math.ceil(h2 / cell) + 1;
      field = new Float32Array(cols * rows);
    }

    function compute(t) {
      var f1 = 0.0032 / scale, f2 = 0.0085 / scale, R = 2 * 110 * 110;
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var x = i * cell, y = j * cell;
          var v = noise(x * f1 + seed, y * f1, t) * 0.72 + noise(x * f2, y * f2 + seed, t * 1.7 + 9) * 0.28;
          if (mouse.s > 0.001) {
            var dx = x - mouse.x, dy = y - mouse.y;
            v += mouse.s * 0.16 * Math.exp(-(dx * dx + dy * dy) / R);
          }
          field[j * cols + i] = v;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h2);
      var k = 0;
      for (var lvl = 0.22; lvl < 0.82; lvl += 0.04, k++) {
        ctx.beginPath();
        for (var j = 0; j < rows - 1; j++) {
          for (var i = 0; i < cols - 1; i++) {
            var a = field[j * cols + i], b = field[j * cols + i + 1];
            var c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            var idx = (a > lvl ? 8 : 0) | (b > lvl ? 4 : 0) | (c > lvl ? 2 : 0) | (d > lvl ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            var x0 = i * cell, y0 = j * cell, seg = CASES[idx];
            for (var s = 0; s < seg.length; s += 2) {
              for (var e = 0; e < 2; e++) {
                var edge = seg[s + e], px, py;
                if (edge === 0) { px = x0 + cell * (lvl - a) / (b - a); py = y0; }
                else if (edge === 1) { px = x0 + cell; py = y0 + cell * (lvl - b) / (c - b); }
                else if (edge === 2) { px = x0 + cell * (lvl - d) / (c - d); py = y0 + cell; }
                else { px = x0; py = y0 + cell * (lvl - a) / (d - a); }
                if (e === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
              }
            }
          }
        }
        // index contours every 5th line, like a survey map
        if (k === 11) { ctx.strokeStyle = "rgba(226,171,111,0.55)"; ctx.lineWidth = 1.2; }
        else if (k % 5 === 0) { ctx.strokeStyle = "rgba(143,211,178,0.42)"; ctx.lineWidth = 1.1; }
        else { ctx.strokeStyle = "rgba(236,230,218," + (0.07 + k * 0.006) + ")"; ctx.lineWidth = 0.8; }
        ctx.stroke();
      }
    }

    function frame(now) {
      if (!visible) return;
      requestAnimationFrame(frame);
      if (now - last < 40) return; // ~25fps is plenty for slow terrain
      last = now;
      mouse.s += (mouse.target - mouse.s) * 0.08;
      compute((now - t0) * 0.000045);
      draw();
    }

    resize();
    compute(0.3);
    draw();
    if (reduce) {
      window.addEventListener("resize", function () { resize(); compute(0.3); draw(); });
      return;
    }

    var host = canvas.parentElement;
    host.addEventListener("pointermove", function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.target = 1;
    });
    host.addEventListener("pointerleave", function () { mouse.target = 0; });
    window.addEventListener("resize", resize);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        var was = visible;
        visible = en[0].isIntersecting && !document.hidden;
        if (visible && !was) requestAnimationFrame(frame);
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () {
      var was = visible;
      visible = !document.hidden;
      if (visible && !was) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
  }
  document.querySelectorAll("canvas[data-topo]").forEach(function (c) { new Topo(c); });

  /* ---------- team ---------- */
  var team = CFG.team || [];
  function byId(id) { for (var i = 0; i < team.length; i++) if (team[i].id === id) return team[i]; return null; }
  function initials(name) {
    var p = name.replace(/[^A-Za-z\s]/g, "").split(/\s+/).filter(Boolean);
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function contactHref(m, subject) {
    var addr = m.email || L.clubEmail;
    var subj = subject || "Hello " + m.name.split(" ")[0];
    if (!m.email) subj = "Attn: " + m.name + " (" + m.role + ") — " + subj;
    return mailto(addr, subj);
  }

  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  var grid = document.getElementById("team-grid");
  if (grid) {
    grid.innerHTML = team.map(function (m, i) {
      // contour field always sits behind; cut-out PNGs let it show around the person
      var photo = '<canvas data-topo="0.55" data-seed="' + (i * 7.3 + 2) + '" aria-hidden="true"></canvas>' +
        (m.photo
          ? '<img src="' + esc(m.photo) + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy">'
          : '<span class="plate-initials" aria-hidden="true">' + esc(initials(m.name)) + "</span>");
      return (
        '<article class="plate reveal">' +
          '<figure class="plate-photo' + (m.photo ? "" : " empty") + '">' + photo + "</figure>" +
          '<div class="plate-caption"><span class="mono">Plate ' + ROMAN[i] + '</span><span class="mono" style="color:var(--ochre)">' + esc(m.role) + "</span></div>" +
          "<h3>" + esc(m.name) + "</h3>" +
          ((m.year || m.major)
            ? '<p class="study">' + [m.year ? "Year " + esc(m.year) : "", esc(m.major || "")].filter(Boolean).join('<span aria-hidden="true"> · </span>') + "</p>"
            : "") +
          ((m.badges && m.badges.length)
            ? '<div class="badges">' + m.badges.map(function (b) { return '<span class="badge">' + esc(b) + "</span>"; }).join("") + "</div>"
            : "") +
          '<ul class="for" aria-label="Contact ' + esc(m.name.split(" ")[0]) + ' about">' +
            (m.contactFor || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") +
          "</ul>" +
          '<a class="email-link text-link" href="' + contactHref(m) + '">' + esc(m.email || L.clubEmail) +
            (m.email ? "" : '<span class="email-hint">Personal email coming soon — goes to the club inbox, marked for ' + esc(m.name.split(" ")[0]) + "</span>") +
          "</a>" +
        "</article>"
      );
    }).join("");
    grid.querySelectorAll("canvas[data-topo]").forEach(function (c) { new Topo(c); });
    grid.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + "ms";
      if (ro) ro.observe(el); else el.classList.add("in");
    });
  }

  /* ---------- Agility Staff Liaison ---------- */
  var liaisonEl = document.getElementById("liaison");
  var li = CFG.liaison;
  if (liaisonEl && li && li.name) {
    liaisonEl.innerHTML =
      '<figure class="plate-photo' + (li.photo ? "" : " empty") + '">' +
        '<canvas data-topo="0.45" data-seed="71" aria-hidden="true"></canvas>' +
        (li.photo
          ? '<img src="' + esc(li.photo) + '" alt="Portrait of ' + esc(li.name) + '" loading="lazy">'
          : '<span class="plate-initials" aria-hidden="true">' + esc(initials(li.name)) + "</span>") +
      "</figure>" +
      "<div>" +
        '<span class="mono" style="color:var(--jade)">' + esc(li.role || "Agility Staff Liaison") + "</span>" +
        '<h3 class="h3">' + esc(li.name) + "</h3>" +
        (li.major ? '<p class="study">' + esc(li.major) + "</p>" : "") +
        '<div class="badges"><span class="badge">Advisor</span></div>' +
        "<p>Our link to the Agility Innovation Zone and a key part of our team. " + esc(li.name.split(" ")[0]) +
        " helps line our events up with Agility's goals and advises on anything that uses the Zone's equipment.</p>" +
        (li.email ? '<a class="email-link text-link" href="' + mailto(li.email) + '">' + esc(li.email) + "</a>" : "") +
      "</div>";
    liaisonEl.querySelectorAll("canvas[data-topo]").forEach(function (c) { new Topo(c); });
  }

  /* ---------- contact routing: <span data-contact="vp-finance"> ---------- */
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    var ids = el.getAttribute("data-contact").split(",");
    var people = ids.map(byId).filter(Boolean);
    if (!people.length) return;
    var who = el.querySelector(".who");
    if (who) {
      who.innerHTML = people.map(function (m) {
        return "<strong>" + esc(m.name) + "</strong>" + esc(m.role);
      }).join("<br>");
    }
    var btn = el.querySelector("a.btn");
    if (btn && !btn.hasAttribute("data-link")) btn.href = contactHref(people[0], btn.getAttribute("data-subject"));
  });

  /* ---------- organization email template ---------- */
  var convo = document.getElementById("start-convo");
  if (convo) {
    var lead = byId("vp-community");
    convo.href = mailto(
      (lead && lead.email) || L.clubEmail,
      "Collaboration with the Agility Club",
      "Hi Agility Club team,\n\n" +
      "Organization:\nYour name & role:\nWebsite:\n\n" +
      "What we have in mind (sponsor / workshop / challenge / mentoring / other):\n\n" +
      "Rough timing:\n\nThanks!\n"
    );
  }

  /* ---------- training checklist ---------- */
  var KEY = "agility-club-training-v1";
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { saved = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* storage off: fine */ } }

  function updateProgress(panel) {
    var boxes = panel.querySelectorAll(".step input[type=checkbox]");
    var done = 0;
    boxes.forEach(function (b) {
      b.closest(".step").classList.toggle("done", b.checked);
      if (b.checked) done++;
    });
    var bar = panel.querySelector(".progress-bar i");
    var txt = panel.querySelector("[data-progress-text]");
    if (bar) bar.style.width = (boxes.length ? (done / boxes.length) * 100 : 0) + "%";
    if (txt) txt.textContent = done + " / " + boxes.length;
    var fin = panel.querySelector(".finish");
    if (fin) fin.hidden = done !== boxes.length;
  }

  document.querySelectorAll(".track-panel").forEach(function (panel) {
    panel.querySelectorAll(".step input[type=checkbox]").forEach(function (b) {
      b.checked = !!saved[b.id];
      b.addEventListener("change", function () { saved[b.id] = b.checked; save(); updateProgress(panel); });
    });
    var reset = panel.querySelector("[data-reset]");
    if (reset) reset.addEventListener("click", function () {
      panel.querySelectorAll(".step input[type=checkbox]").forEach(function (b) { b.checked = false; saved[b.id] = false; });
      save(); updateProgress(panel);
    });
    updateProgress(panel);
  });

  /* ---------- track tabs ---------- */
  var tabs = document.querySelectorAll('.tracks [role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
    try { history.replaceState(null, "", "#" + tab.getAttribute("data-hash")); } catch (e) { /* ignore */ }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(n, true);
        e.preventDefault();
      }
    });
  });
  if (tabs.length) {
    var want = location.hash.slice(1);
    var initial = tabs[0];
    tabs.forEach(function (t) { if (t.getAttribute("data-hash") === want) initial = t; });
    tabs.forEach(function (t) {
      var on = t === initial;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
})();
