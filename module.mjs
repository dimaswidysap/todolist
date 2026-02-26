const containerList = document.querySelector(".container-list");

function deleteList(index) {
  let lists = JSON.parse(localStorage.getItem("lists")) || [];

  lists.splice(index, 1);

  localStorage.setItem("lists", JSON.stringify(lists));

  displayLists(lists);
}

function displayLists(dataBases) {
  containerList.innerHTML = "";

  dataBases.forEach((items, index) => {
    const li = document.createElement("li");
    const btnCheck = document.createElement("input");
    const content = document.createElement("p");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");

    btnCheck.type = "checkbox";

    li.classList.add("lists");
    btnCheck.classList.add("check");
    content.classList.add("content");
    btnEdit.classList.add("edit");
    btnDelete.classList.add("delete");

    btnDelete.textContent = "🗑️";
    btnEdit.textContent = "🖊️";
    content.textContent = items;

    li.append(btnCheck, content, btnEdit, btnDelete);
    containerList.append(li);

    btnDelete.addEventListener("click", () => {
      deleteList(index);
    });

    btnCheck.addEventListener("change", function () {
      content.classList.toggle("konten-nonactive", this.checked);
    });
  });
}

export { displayLists };
