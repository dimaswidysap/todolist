const containerList = document.querySelector(".container-list");

const databases = ["mencuci", "mandi"];

databases.map((items) => {
  const li = document.createElement("li");
  const btnCheck = document.createElement("span");
  const content = document.createElement("p");
  const btnDelete = document.createElement("button");

  li.classList.add("lists");
  btnCheck.classList.add("check");
  content.classList.add("content");
  btnDelete.classList.add("delete");
  btnDelete.classList.add("material-symbols-outlined");

  btnDelete.textContent = "delete";

  containerList.appendChild(li);
  li.appendChild(btnCheck);
  li.appendChild(content);
  li.appendChild(btnDelete);

  content.textContent = items;
});
