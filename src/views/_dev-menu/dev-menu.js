window.addEventListener("load", () => {
  const devMenu = document.querySelector(".dev-menu")
  const devMenuBtn = document.querySelector(".dev-menu")

  devMenuBtn.addEventListener("click", () => {
    devMenu.classList.toggle("_open")
  })
})