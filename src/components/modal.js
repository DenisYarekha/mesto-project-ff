export function openModal(a) {
  a.classList.add("popup_is-opened");
  document.addEventListener("keydown", (key) => {
    if (key.key === "Escape") {
      closeModal(a);
    }
  });
  a.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closeModal(a);
    }
  });
}

export function closeModal(a) {
  a.classList.remove("popup_is-opened");
}
