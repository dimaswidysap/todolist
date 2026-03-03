import { horizontalBack } from "../module/module.mjs";
import { conNav } from "../javascript/nav.js";

const btnOpenNav = document.querySelector(".open-nav");
console.log(btnOpenNav);

btnOpenNav.addEventListener("click", () => {
  horizontalBack(conNav);
});
