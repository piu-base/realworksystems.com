const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const systemPlane = document.querySelector(".system-plane");

if (systemPlane && !reduceMotion) {
  let ticking = false;

  const updateHeroDepth = () => {
    const offset = Math.min(window.scrollY, 460);
    systemPlane.style.transform = `translate3d(0, ${offset * 0.025}px, 0) rotate(-8deg)`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroDepth);
        ticking = true;
      }
    },
    { passive: true }
  );
}
