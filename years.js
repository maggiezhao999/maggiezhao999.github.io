// years.js — Year hover to preview projects (2025 first)

const PROJECTS_BY_YEAR = {
  "2025": [
    {
      title: "Map",
      page: "Map.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/-DKRWwtdi"
    },
    {
      title: "Face Generator",
      page: "FaceGenerator.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/diju60ZUN"
    },
    {
      title: "Ice Clock",
      page: "IceClock.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/hJu5v55Oo"
    },
    {
      title: "Exquisite Corpse",
      page: "ExquisiteCorpse.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/Lhl-onaEC"
    },
    {
      title: "Optical Illusion",
      page: "OpticalIllusion.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/TWVB9kagM"
    },
    {
      title: "Data Portrait",
      page: "DataPortrait.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/fm0OX3GlP"
    },
    {
      title: "Home Ride",
      page: "HomeRide.html",
      embed: "https://editor.p5js.org/maggiejasmer/full/jxFdLWFpc"
    }
  ],
  "2024": [],
  "2023": []
};

function renderYear(year) {
  const yearTitle = document.getElementById("yearTitle");
  const yearHint = document.getElementById("yearHint");
  const preview = document.getElementById("preview");

  yearTitle.textContent = year;

  // clear old previews
  preview.innerHTML = "";

  const items = PROJECTS_BY_YEAR[year] || [];
  if (items.length === 0) {
    yearHint.textContent = "Works coming soon.";
    return;
  }

  yearHint.textContent = "Click a title to open the project page.";

  for (const p of items) {
    const card = document.createElement("section");
    card.className = "project-preview";

    const header = document.createElement("div");
    header.className = "project-header";

    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    a.href = p.page;
    a.textContent = p.title;
    h2.appendChild(a);

    header.appendChild(h2);

    const iframe = document.createElement("iframe");
    iframe.src = p.embed;
    iframe.loading = "lazy";

    card.appendChild(header);
    card.appendChild(iframe);

    preview.appendChild(card);
  }
}

function setupYearHover() {
  const yearButtons = document.querySelectorAll(".year-btn");

  // default selection: 2025
  renderYear("2025");
  setActiveYear("2025");

  yearButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      const year = btn.dataset.year;
      renderYear(year);
      setActiveYear(year);
    });
  });
}

function setActiveYear(year) {
  document.querySelectorAll(".year-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.year === year);
  });
}

document.addEventListener("DOMContentLoaded", setupYearHover);
