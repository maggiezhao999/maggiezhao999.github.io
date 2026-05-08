// categories.js — Category hover to preview projects

const PROJECTS_BY_CATEGORY = {
  "p5.js": [
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

  "Collage": [
    {
      title: "Androgyne",
      page: "Androgyne.pdf",
      embed: "" // pdf可以先不嵌入
    }
  ],

  "Photography": [],

  "Video": []
};

function renderCategory(category) {
  const title = document.getElementById("yearTitle"); // 可以不改 id
  const hint = document.getElementById("yearHint");
  const preview = document.getElementById("preview");

  title.textContent = category;

  preview.innerHTML = "";

  const items = PROJECTS_BY_CATEGORY[category] || [];
  if (items.length === 0) {
    hint.textContent = "Works coming soon.";
    return;
  }

  hint.textContent = "Click a title to open the project page.";

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

    if (p.embed) {
      const iframe = document.createElement("iframe");
      iframe.src = p.embed;
      iframe.loading = "lazy";
      card.appendChild(header);
      card.appendChild(iframe);
    } else {
      card.appendChild(header);
    }

    preview.appendChild(card);
  }
}

function setupCategoryHover() {
  const buttons = document.querySelectorAll(".category-btn");

  // 默认显示 p5.js
  renderCategory("p5.js");
  setActiveCategory("p5.js");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      const category = btn.dataset.category;
      renderCategory(category);
      setActiveCategory(category);
    });
  });
}

function setActiveCategory(category) {
  document.querySelectorAll(".category-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.category === category);
  });
}

document.addEventListener("DOMContentLoaded", setupCategoryHover);
