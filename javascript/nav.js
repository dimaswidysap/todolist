import { contentGoLeft } from "./../module/module.mjs";

export const conNav = document.querySelector(".nav");
const buttonList = document.querySelectorAll(".btn-list");
export const containerContent = document.querySelectorAll(".bhgjik");
const indikator = document.querySelectorAll(".indikator");
const btnClose = document.querySelector(".close-nav");

btnClose.addEventListener("click", () => {
  contentGoLeft(conNav);
});

buttonList.forEach((items, index) => {
  items.addEventListener("click", () => {
    containerContent.forEach((content) => {
      content.classList.add("contentNoactive");
    });

    indikator.forEach((items) => {
      items.classList.add("contentNoactive");
    });

    if (containerContent[index]) {
      containerContent[index].classList.remove("contentNoactive");
      indikator[index].classList.remove("contentNoactive");
    }
  });
});
