const contentGoLeft = (content) => {
  content.style.transform = "translateX(-110%)";
  content.style.transition = "all 0.3s ease-in-out";
};
const horizontalBack = (content) => {
  content.style.transform = "translateX(0)";
  content.style.transition = "all 0.3s ease-in-out";
};

export { contentGoLeft, horizontalBack };
