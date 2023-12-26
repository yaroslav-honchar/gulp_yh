window.addEventListener("load", () => {
  const $devMenu = document.querySelector(".dev-menu")
  const $devMenuBtn = document.querySelector(".dev-menu-btn")
  const $devMenuListWrap = document.querySelector(".dev-menu-list-wrap")
  const devMenuLinks = document.querySelectorAll(".dev-menu-link")

  $devMenuBtn.addEventListener("click", () => {
    $devMenu.classList.toggle("_open")
  })

  devMenuLinks.forEach(($link) => {
    if($link.classList.contains("_active")) {
      $devMenuListWrap.scrollTo({
        top: $link.closest(".dev-menu-item").offsetTop - ($devMenuListWrap.offsetHeight / 3)
      })
    }
  })

  window.addEventListener("click", (event) => {
    if ($devMenu.classList.contains("_open") && !$devMenu.contains(event.target)) {
      $devMenu.classList.remove("_open")
    }
  })
})