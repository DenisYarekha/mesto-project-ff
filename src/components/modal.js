export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  modal.addEventListener("click", closePopupByOverlay);
}
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}
function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
