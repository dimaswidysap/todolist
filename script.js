function displayLists() {
  databases.forEach((items, index) => {
    const li = document.createElement("li");
    const btnCheck = document.createElement("input");
    const content = document.createElement("p");
    const btnDelete = document.createElement("button");

    btnCheck.setAttribute("type", "checkbox");

    li.classList.add("lists");
    btnCheck.classList.add("check");
    content.classList.add("content");
    btnDelete.classList.add("delete");
    btnDelete.classList.add("material-symbols-outlined");

    btnDelete.textContent = "delete";

    containerList.prepend(li);
    li.appendChild(btnCheck);
    li.appendChild(content);
    li.appendChild(btnDelete);

    content.textContent = items;

    btnDelete.addEventListener("click", () => {
      databases.splice(index, 1);
      li.remove();
    });

    btnCheck.addEventListener("change", function () {
      if (this.checked) {
        content.classList.add("konten-nonactive");
      } else {
        content.classList.remove("konten-nonactive");
      }
    });
  });
}
const containerList = document.querySelector(".container-list");
const databases = [
  "mencuci baju",
  "mandiin kucing",
  "makan makan makan makan makan makan makan",
];

const inputList = document.getElementById("input-list");
const btnAdd = document.getElementById("btn-add");

btnAdd.addEventListener("click", () => {
  const inputValue = inputList.value;
  if (!inputValue) {
    alert("catatan tidak boleh kosong");
    return;
  }
  databases.push(inputValue);

  containerList.innerHTML = "";
  displayLists();
});

displayLists();
