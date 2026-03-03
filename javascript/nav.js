const buttonList = document.querySelectorAll(".btn-list");
const containerContent = document.querySelectorAll(".container-lists");

buttonList.forEach((items, index) => {
  items.addEventListener("click", () => {
    containerContent.forEach((content) => {
      content.classList.add("contentNoactive");
      content.style.cssText = "none";
    });

    // 2. Hapus class 'contentNoactive' HANYA pada konten yang sesuai dengan index tombol

    if (containerContent[index]) {
      containerContent[index].classList.remove("contentNoactive");
      containerContent[index].style.cssText =
        "transition: all 0.4s ease-in-out;";
    }

    // console.log(`Menampilkan konten ke-${index + 1}, lainnya tetap non-aktif.`);
  });
});
