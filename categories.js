const PROJECTS = {
  interactive: [
    {
      title: "Experimental Camera",
      page: "interactive/ExperimentalCamera.html",
      preview: "interactive/ExperimentalCamera.html",
      type: "iframe",
      size: "large"
    },
    {
      title: "Heartbeat Walkie Talkie",
      page: "interactive/Heartbeat_WalkieTalkie.png",
      preview: "interactive/Heartbeat_WalkieTalkie.png",
      type: "image"
    },
    {
      title: "Digital Divination",
      page: "interactive/Digital Divination.html",
      preview: "interactive/Digital Divination.html",
      type: "iframe",
      size: "large"
    },
    {
      title: "Joyride",
      page: "interactive/Joyride.html",
      preview: "interactive/Joyride.html",
      type: "iframe",
      size: "medium"
    },
    {
      title: "Data Portrait",
      page: "interactive/DataPortrait.html",
      preview: "interactive/DataPortrait.html",
      type: "iframe",
      size: "medium"
    },
    {
      title: "Face Generator",
      page: "interactive/FaceGenerator.html",
      preview: "interactive/FaceGenerator.html",
      type: "iframe",
      size: "medium"
    },
    {
      title: "Ice Clock",
      page: "interactive/IceClock.html",
      preview: "interactive/IceClock.html",
      type: "iframe",
      size: "small"
    },
    {
      title: "Optical Illusion",
      page: "interactive/OpticalIllusion.html",
      preview: "interactive/OpticalIllusion.html",
      type: "iframe",
      size: "medium"
    }
  ],

  collage: [/* 不变 */],
  photography: [/* 不变 */],

  // ✅ 新增 videos
  videos: [
    {
      title: "Life Pulse",
      type: "youtube",
      youtubeId: "imdKKD7sWEY"
    },
    {
      title: "Butterfly Effect",
      type: "youtube",
      youtubeId: "95UoEp-cC14"
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
    const card = document.createElement("div");
    card.className = `work-card ${project.type} ${project.size || ""}`;

    const media = document.createElement("div");
    media.className = "work-media";

    // ✅ 新：YouTube
    if (project.type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}`;
      iframe.allow = "autoplay; fullscreen";
      iframe.setAttribute("allowfullscreen", "");
      media.appendChild(iframe);
    }

    // 原 image
    else if (project.type === "image") {
      const img = document.createElement("img");
      img.src = project.preview;
      img.alt = project.title;
      media.appendChild(img);
    }

    // 原 iframe
    else {
      const iframe = document.createElement("iframe");
      iframe.src = project.preview;
      iframe.loading = "lazy";
      media.appendChild(iframe);
    }

    const title = document.createElement("div");
    title.className = "work-title";
    title.textContent = project.title;

    card.appendChild(media);
    card.appendChild(title);
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
