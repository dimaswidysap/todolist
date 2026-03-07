import { containerContent } from "./nav.js";
import { FormHandler } from "./form-input.js";

const conList = document.querySelectorAll(".container-lists");
const conFormEdit = document.querySelector(".con-form-edit");
const formEdit = document.getElementById("todoFormEdit");
const btnCloseEdit = document.getElementById("form-edit-close");
const taskEdit = document.getElementById("taskEdit");
const dateEdit = document.getElementById("date-list-edit");

let allList = [];
let workList = [];
let studyList = [];
let gamingList = [];
let foodList = [];
let currentEditId = null;

const loadFromLocalStorage = () => {
  allList = JSON.parse(localStorage.getItem("allList")) || [];
  workList = JSON.parse(localStorage.getItem("workList")) || [];
  studyList = JSON.parse(localStorage.getItem("studyList")) || [];
  gamingList = JSON.parse(localStorage.getItem("gamingList")) || [];
  foodList = JSON.parse(localStorage.getItem("foodList")) || [];
};

const saveToLocalStorage = () => {
  localStorage.setItem("allList", JSON.stringify(allList));
  localStorage.setItem("workList", JSON.stringify(workList));
  localStorage.setItem("studyList", JSON.stringify(studyList));
  localStorage.setItem("gamingList", JSON.stringify(gamingList));
  localStorage.setItem("foodList", JSON.stringify(foodList));
};

const renderLists = () => {
  conList.forEach((container) => {
    if (container) container.innerHTML = "";
  });

  const listMappings = [
    { array: allList, containerIndex: 0, categoryName: "all" },
    { array: workList, containerIndex: 1, categoryName: "work" },
    { array: studyList, containerIndex: 2, categoryName: "study" },
    { array: gamingList, containerIndex: 3, categoryName: "gaming" },
    { array: foodList, containerIndex: 4, categoryName: "food" },
  ];

  listMappings.forEach(({ array, containerIndex, categoryName }) => {
    const container = conList[containerIndex];
    if (!container) return;

    array.forEach((item) => {
      const itemElement = createTodoElement(item, categoryName);
      container.appendChild(itemElement);
    });
  });
};

const createTodoElement = (item, categoryName = "default") => {
  const div = document.createElement("li");
  div.classList.add("todo-item");

  const textSpan = document.createElement("span");
  textSpan.textContent = item.content || "Tugas Tanpa Judul";

  if (item.isCompleted) {
    textSpan.style.textDecoration = "line-through";
    textSpan.style.opacity = "0.6";
  }

  const checkBtn = document.createElement("button");
  checkBtn.textContent = item.isCompleted
    ? "check_box"
    : "check_box_outline_blank";
  checkBtn.classList.add("btn-aksi", "material-symbols-outlined");

  checkBtn.addEventListener("click", () => {
    item.isCompleted = !item.isCompleted;
    saveToLocalStorage();
    renderLists();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("btn-aksi", "material-symbols-outlined");
  deleteBtn.addEventListener("click", () => {
    deleteItem(item.id);
  });

  const containerMoreInfo = document.createElement("div");
  containerMoreInfo.classList.add("container-more-info");

  const conDate = document.createElement("div");
  conDate.classList.add("jsuis");
  const dateP1 = document.createElement("p");
  const dateP2 = document.createElement("p");
  containerMoreInfo.append(conDate);
  conDate.appendChild(dateP1);
  conDate.appendChild(dateP2);
  dateP1.textContent = "Deadline :";
  dateP2.textContent = `${!item.date ? "No Deadline" : item.date}`;

  containerMoreInfo.style.display = "none";

  const uniqueId = `btn-more-${categoryName}-${item.id}`;

  const btnMoreInfo = document.createElement("input");
  btnMoreInfo.setAttribute("type", "checkbox");
  btnMoreInfo.classList.add("btn-more-info");
  btnMoreInfo.setAttribute("id", uniqueId);

  const labelMoreIfo = document.createElement("label");
  labelMoreIfo.classList.add("label-more-info");
  labelMoreIfo.setAttribute("for", uniqueId);

  const iconMoreInfo = document.createElement("i");
  iconMoreInfo.classList.add("material-symbols-outlined");
  iconMoreInfo.textContent = "arrow_drop_down";

  labelMoreIfo.appendChild(iconMoreInfo);
  btnMoreInfo.style.display = "none";

  btnMoreInfo.addEventListener("change", function () {
    if (this.checked) {
      containerMoreInfo.style.display = "block";
      iconMoreInfo.textContent = "arrow_drop_up";
    } else {
      containerMoreInfo.style.display = "none";
      iconMoreInfo.textContent = "arrow_drop_down";
    }
  });

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  containerMoreInfo.appendChild(btnEdit);
  const iconEdit = document.createElement("i");
  iconEdit.classList.add("material-symbols-outlined");
  const teksEdit = document.createElement("p");
  teksEdit.textContent = "Edit";
  iconEdit.textContent = "edit";

  btnEdit.append(iconEdit, teksEdit);

  btnEdit.addEventListener("click", () => {
    currentEditId = item.id;
    conFormEdit.style.display = "flex";
    taskEdit.value = item.content;
    dateEdit.value = item.date || "";
  });

  div.append(
    textSpan,
    checkBtn,
    deleteBtn,
    labelMoreIfo,
    btnMoreInfo,
    containerMoreInfo,
  );

  return div;
};

const deleteItem = (id) => {
  allList = allList.filter((item) => item.id !== id);
  workList = workList.filter((item) => item.id !== id);
  studyList = studyList.filter((item) => item.id !== id);
  gamingList = gamingList.filter((item) => item.id !== id);
  foodList = foodList.filter((item) => item.id !== id);

  saveToLocalStorage();
  renderLists();
};

const updateItem = (id, newContent, newDate) => {
  const updateArray = (arr) => {
    return arr.map((item) => {
      if (item.id === id) {
        return { ...item, content: newContent, date: newDate };
      }
      return item;
    });
  };

  allList = updateArray(allList);
  workList = updateArray(workList);
  studyList = updateArray(studyList);
  gamingList = updateArray(gamingList);
  foodList = updateArray(foodList);

  saveToLocalStorage();
  renderLists();
};

if (formEdit) {
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentEditId) {
      updateItem(currentEditId, taskEdit.value, dateEdit.value);
      conFormEdit.style.display = "none";
      formEdit.reset();
      currentEditId = null;
    }
  });
}

if (btnCloseEdit) {
  btnCloseEdit.addEventListener("click", () => {
    conFormEdit.style.display = "none";
    formEdit.reset();
    currentEditId = null;
  });
}

const receiveDataFromForm = (dataList) => {
  const newItem = {
    ...dataList,
    id: dataList.id || Date.now().toString(),
    isCompleted: dataList.isCompleted || false,
  };

  allList.push(newItem);

  switch (newItem.categoryId) {
    case 0:
      break;
    case 1:
      workList.push(newItem);
      break;
    case 2:
      studyList.push(newItem);
      break;
    case 3:
      gamingList.push(newItem);
      break;
    case 4:
      foodList.push(newItem);
      break;
  }

  saveToLocalStorage();
  renderLists();
};

loadFromLocalStorage();
renderLists();

const todoFormApp = new FormHandler(receiveDataFromForm);
