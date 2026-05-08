const PROJECTS = {
  interactive: [
    {
      title: "Experimental Camera",
      page: "interactive/ExperimentalCamera.html",
      preview: "interactive/ExperimentalCamera.html",
      type: "iframe"
    },
    {
      title: "Digital Divination",
      page: "interactive/Digital Divination.html",
      preview: "interactive/Digital Divination.html",
      type: "iframe"
    },
    {
      title: "Joyride",
      page: "interactive/Joyride.html",
      preview: "interactive/Joyride.html",
      type: "iframe"
    },
    {
      title: "Data Portrait",
      page: "interactive/DataPortrait.html",
      preview: "interactive/DataPortrait.html",
      type: "iframe"
    },
    {
      title: "Face Generator",
      page: "interactive/FaceGenerator.html",
      preview: "interactive/FaceGenerator.html",
      type: "iframe"
    },
    {
      title: "Ice Clock",
      page: "interactive/IceClock.html",
      preview: "interactive/IceClock.html",
      type: "iframe"
    },
    {
      title: "Optical Illusion",
      page: "interactive/OpticalIllusion.html",
      preview: "interactive/OpticalIllusion.html",
      type: "iframe"
    }
  ],

  collage: [
    {
      title: "Androgyne",
      page: "Collage and images/Androgyne.pdf",
      preview: "Collage and images/Androgyne.pdf",
      type: "iframe"
    },
    {
      title: "Desk",
      page: "Collage and images/desk.jpg",
      preview: "Collage and images/desk.jpg",
      type: "image"
    },
    {
      title: "Leaves",
      page: "Collage and images/leaves.jpg",
      preview: "Collage and images/leaves.jpg",
      type: "image"
    },
    {
      title: "Mix 3",
      page: "Collage and images/mix3.jpg",
      preview: "Collage and images/mix3.jpg",
      type: "image"
    },
    {
      title: "Mother and Me",
      page: "Collage and images/motherandme.jpg",
      preview: "Collage and images/motherandme.jpg",
      type: "image"
    },
    {
      title: "Mother and Me 2",
      page: "Collage and images/motherandme2.jpg",
      preview: "Collage and images/motherandme2.jpg",
      type: "image"
    },
    {
      title: "Tree",
      page: "Collage and images/tree.jpg",
      preview: "Collage and images/tree.jpg",
      type: "image"
    }
  ],

  photography: [
    {
      title: "Afterglow",
      page: "Photography/afterglow.jpeg",
      preview: "Photography/afterglow.jpeg",
      type: "image"
    },
    {
      title: "Snownight",
      page: "Photography/snownight.jpeg",
      preview: "Photography/snownight.jpeg",
      type: "image"
    },
    {
      title: "Trees",
      page: "Photography/trees.jpeg",
      preview: "Photography/trees.jpeg",
      type: "image"
    },
    {
      title: "Wheel",
      page: "Photography/wheel.jpeg",
      preview: "Photography/wheel.jpeg",
      type: "image"
    },
    {
      title: "Wheels",
      page: "Photography/wheels.jpeg",
      preview: "Photography/wheels.jpeg",
      type: "image"
    },
    {
      title: "冥河",
      page: "Photography/冥河.jpg",
      preview: "Photography/冥河.jpg",
      type: "image"
    },
    {
      title: "并蒂莲",
      page: "Photography/并蒂莲.jpg",
      preview: "Photography/并蒂莲.jpg",
      type: "image"
    },
    {
      title: "石溪",
      page: "Photography/石溪.jpeg",
      preview: "Photography/石溪.jpeg",
      type: "image"
    },
    {
      title: "缸",
      page: "Photography/缸.jpg",
      preview: "Photography/缸.jpg",
      type: "image"
    }
  ],

  videos: [],

  p5js: [
    {
      title: "Experimental Camera",
      page: "interactive/ExperimentalCamera.html",
      preview: "interactive/ExperimentalCamera.html",
      type: "iframe"
    },
    {
      title: "Digital Divination",
      page: "interactive/Digital Divination.html",
      preview: "interactive/Digital Divination.html",
      type: "iframe"
    },
    {
      title: "Joyride",
      page: "interactive/Joyride.html",
      preview: "interactive/Joyride.html",
      type: "iframe"
    },
    {
      title: "Data Portrait",
      page: "interactive/DataPortrait.html",
      preview: "interactive/DataPortrait.html",
      type: "iframe"
    },
    {
      title: "Face Generator",
      page: "interactive/FaceGenerator.html",
      preview: "interactive/FaceGenerator.html",
      type: "iframe"
    },
    {
      title: "Ice Clock",
      page: "interactive/IceClock.html",
      preview: "interactive/IceClock.html",
      type: "iframe"
    },
    {
      title: "Optical Illusion",
      page: "interactive/OpticalIllusion.html",
      preview: "interactive/OpticalIllusion.html",
      type: "iframe"
    }
  ]
};

const tabs = document.querySelectorAll(".category-tab");
const preview = document.getElementById("preview");

function renderCategory(category) {
  preview.innerHTML = "";

  const items = PROJECTS[category] || [];

  if (items.length === 0) {
    preview.innerHTML = `<p class="empty-message">Works coming soon.</p>`;
    return;
  }

  items.forEach(project => {
    const card = document.createElement("a");
    card.className = project.type === "image"
      ? "preview-card is-img"
      : "preview-card is-interactive";

    card.href = project.page;
    card.dataset.viewer = "1";
    card.dataset.viewerSrc = project.preview;

    const title = document.createElement("div");
    title.className = "preview-title";
    title.textContent = project.title;

    card.appendChild(title);

    if (project.type === "image") {
      const img = document.createElement("img");
      img.className = "preview-media";
      img.src = project.preview;
      img.alt = project.title;
      card.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = project.preview;
      iframe.loading = "lazy";
      card.appendChild(iframe);
    }

    preview.appendChild(card);
  });
}

function activate(category) {
  tabs.forEach(tab => {
    tab.classList.toggle("is-active", tab.dataset.category === category);
  });

  renderCategory(category);
}

tabs.forEach(tab => {
  tab.addEventListener("mouseenter", () => activate(tab.dataset.category));
  tab.addEventListener("click", () => activate(tab.dataset.category));
});

renderCategory("interactive");

const viewer = document.getElementById("viewer");
const viewerBackdrop = document.getElementById("viewer-backdrop");
const viewerFrame = document.getElementById("viewer-frame");

function openViewer(src) {
  viewerFrame.src = src;
  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  viewerFrame.src = "";
  document.body.classList.remove("no-scroll");
}

document.addEventListener("click", e => {
  const card = e.target.closest("[data-viewer='1']");
  if (!card) return;

  e.preventDefault();
  openViewer(card.dataset.viewerSrc);
});

viewerBackdrop.addEventListener("click", closeViewer);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeViewer();
});
