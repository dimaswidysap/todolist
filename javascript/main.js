import { containerContent } from "./nav.js";
import { FormHandler } from "./form-input.js";

const conList = document.querySelectorAll(".container-lists");

let allList = [];
let workList = [];
let studyList = [];
let gamingList = [];
let foodList = [];

// --- TAMBAHAN: Fungsi Load dari Local Storage ---
const loadFromLocalStorage = () => {
  allList = JSON.parse(localStorage.getItem("allList")) || [];
  workList = JSON.parse(localStorage.getItem("workList")) || [];
  studyList = JSON.parse(localStorage.getItem("studyList")) || [];
  gamingList = JSON.parse(localStorage.getItem("gamingList")) || [];
  foodList = JSON.parse(localStorage.getItem("foodList")) || [];
};

// --- TAMBAHAN: Fungsi Save ke Local Storage ---
const saveToLocalStorage = () => {
  localStorage.setItem("allList", JSON.stringify(allList));
  localStorage.setItem("workList", JSON.stringify(workList));
  localStorage.setItem("studyList", JSON.stringify(studyList));
  localStorage.setItem("gamingList", JSON.stringify(gamingList));
  localStorage.setItem("foodList", JSON.stringify(foodList));
};

// 1. Fungsi untuk merender ulang semua list ke dalam container DOM
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
      // --- PERBAIKAN: Kirimkan categoryName saat membuat elemen ---
      const itemElement = createTodoElement(item, categoryName);
      container.appendChild(itemElement);
    });
  });
};

// 2. Fungsi untuk membuat elemen HTML (List Item)
// --- PERBAIKAN: Tambahkan parameter categoryName ---
const createTodoElement = (item, categoryName = "default") => {
  console.log(item);

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

  // --- PERBAIKAN: ID Unik sekarang menggabungkan ID Item dan Nama Kategori ---
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

// 3. Fungsi untuk menghapus item dari semua array berdasarkan ID
const deleteItem = (id) => {
  allList = allList.filter((item) => item.id !== id);
  workList = workList.filter((item) => item.id !== id);
  studyList = studyList.filter((item) => item.id !== id);
  gamingList = gamingList.filter((item) => item.id !== id);
  foodList = foodList.filter((item) => item.id !== id);

  saveToLocalStorage(); // TAMBAHAN: Simpan perubahan ke Local Storage
  renderLists(); // Render ulang UI setelah data dihapus
};

// 4. Modifikasi fungsi penerima data dari form
const receiveDataFromForm = (dataList) => {
  // Tambahkan ID unik dan status isCompleted bawaan jika belum ada dari form
  const newItem = {
    ...dataList,
    id: dataList.id || Date.now().toString(),
    isCompleted: dataList.isCompleted || false,
  };

  // Selalu simpan semua catatan ke dalam allList
  allList.push(newItem);

  // Cek categoryId (index tombol) dan distribusikan
  switch (newItem.categoryId) {
    case 0:
      console.log("Kategori Umum (All), masuk ke index 0.");
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
    default:
      console.log(`Index ${newItem.categoryId} tidak dikenali.`);
      break;
  }

  saveToLocalStorage(); // TAMBAHAN: Simpan data baru ke Local Storage
  renderLists();
};

// --- TAMBAHAN: Eksekusi Load & Render saat file JavaScript pertama kali dijalankan ---
loadFromLocalStorage();
renderLists();

const todoFormApp = new FormHandler(receiveDataFromForm);
