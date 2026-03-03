import { contentGoLeft } from "./../module/module.mjs";

export const conNav = document.querySelector(".nav");
const buttonList = document.querySelectorAll(".btn-list");
const containerContent = document.querySelectorAll(".container-lists");
const indikator = document.querySelectorAll(".indikator");
const btnClose = document.querySelector(".close-nav");

btnClose.addEventListener("click", () => {
  contentGoLeft(conNav);
});

buttonList.forEach((items, index) => {
  items.addEventListener("click", () => {
    containerContent.forEach((content) => {
      content.classList.add("contentNoactive");
      content.style.cssText = "none";
    });

    indikator.forEach((items) => {
      items.classList.add("contentNoactive");
    });

    if (containerContent[index]) {
      containerContent[index].classList.remove("contentNoactive");
      indikator[index].classList.remove("contentNoactive");
      containerContent[index].style.cssText =
        "transition: all 0.4s ease-in-out;";
    }
  });
});
