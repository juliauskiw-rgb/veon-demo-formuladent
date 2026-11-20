// Page behaviour: header hairline on scroll, mobile menu closing, call bar after the hero.
// Everything works without this script; it only adds states.
const header = document.querySelector<HTMLElement>(".site-header");
const hero = document.getElementById("hero");
const bar = document.querySelector<HTMLElement>(".call-bar");
const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");

if (header) {
  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 4);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

if (menu) {
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector<HTMLElement>("summary")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (menu.open && e.target instanceof Node && !menu.contains(e.target)) menu.open = false;
  });
}

if (bar && hero && "IntersectionObserver" in window) {
  bar.classList.add("is-armed");
  const io = new IntersectionObserver(([entry]) => {
    bar.classList.toggle("is-shown", !entry.isIntersecting);
  }, { rootMargin: "0px 0px -35% 0px" });
  io.observe(hero);
}
