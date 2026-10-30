// Tabs: each section is its own page, picked by the URL hash
const tabs = [...document.querySelectorAll("[data-tab]")];
const navLinks = [...document.querySelectorAll(".nav__links a")];

function showTab() {
  const id = location.hash.slice(1);
  const target = tabs.find((t) => t.id === id) || tabs[0];

  tabs.forEach((t) => { t.hidden = t !== target; });
  navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + target.id));
  window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", showTab);
showTab();

// Home page favorites are copies of the project cards marked data-fav
const favGrid = document.getElementById("fav-cards");
document.querySelectorAll("#projects .card[data-fav]").forEach((card) => {
  favGrid.appendChild(card.cloneNode(true));
});

// Projects: clicking a card opens its details in a dialog
const modal = document.getElementById("project-modal");
const modalTitle = modal.querySelector(".modal__title");
const modalTags = modal.querySelector(".modal__tags");
const modalBody = modal.querySelector(".modal__body");

document.querySelectorAll(".card").forEach((card) => {
  card.querySelector(".card__btn").addEventListener("click", () => {
    modalTitle.textContent = card.querySelector(".card__name").textContent;
    modalTags.innerHTML = card.querySelector(".tags").innerHTML;
    modalBody.innerHTML = card.querySelector(".card__detail").innerHTML;
    modal.showModal();
  });
});

modal.querySelector(".modal__close").addEventListener("click", () => modal.close());

// Close when clicking the dimmed backdrop
modal.addEventListener("click", (e) => {
  const r = modal.getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (!inside) modal.close();
});

document.getElementById("year").textContent = new Date().getFullYear();
