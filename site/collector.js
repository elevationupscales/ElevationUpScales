const releases = [...document.querySelectorAll(".release[data-release]")];
const progressSlots = [...document.querySelectorAll("[data-progress-slot]")];

const setActiveRelease = (releaseNumber) => {
  progressSlots.forEach((slot) => {
    const slotNumber = Number(slot.dataset.progressSlot);
    slot.classList.toggle("is-active", slotNumber === releaseNumber);
    slot.classList.toggle("is-complete", slotNumber < releaseNumber);
  });
};

if ("IntersectionObserver" in window) {
  const sceneObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const release = entry.target;
      const scene = release.dataset.scene;
      if (scene) {
        release.style.setProperty("--scene-image", `url("${scene}")`);
        release.classList.add("is-scene-loaded");
      }
      observer.unobserve(release);
    });
  }, { rootMargin: "500px 0px" });

  const releaseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const releaseNumber = Number(entry.target.dataset.release);
      entry.target.classList.add("is-visible");
      setActiveRelease(releaseNumber);
    });
  }, { threshold: .5 });

  releases.forEach((release) => {
    sceneObserver.observe(release);
    releaseObserver.observe(release);
  });
} else {
  releases.forEach((release) => {
    const scene = release.dataset.scene;
    if (scene) release.style.setProperty("--scene-image", `url("${scene}")`);
    release.classList.add("is-scene-loaded", "is-visible");
  });
}

document.querySelectorAll(".hero-card-strip a, .next-release, .progress-slot").forEach((link) => {
  link.addEventListener("click", () => {
    const destination = document.querySelector(link.getAttribute("href"));
    if (destination) destination.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
