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
  // Kosongkan semua container terlebih dahulu agar tidak ada duplikasi saat render ulang
  conList.forEach((container) => {
    if (container) container.innerHTML = "";
  });

  // Peta array ke index container masing-masing
  const listMappings = [
    { array: allList, containerIndex: 0 },
    { array: workList, containerIndex: 1 },
    { array: studyList, containerIndex: 2 },
    { array: gamingList, containerIndex: 3 },
    { array: foodList, containerIndex: 4 },
  ];

  // Render setiap item di array ke container yang sesuai
  listMappings.forEach(({ array, containerIndex }) => {
    const container = conList[containerIndex];
    if (!container) return;

    array.forEach((item) => {
      const itemElement = createTodoElement(item);
      container.appendChild(itemElement);
    });
  });
};

// 2. Fungsi untuk membuat elemen HTML (List Item)
const createTodoElement = (item) => {
  const div = document.createElement("li");
  div.classList.add("todo-item"); // Bisa ditambahkan styling di CSS

  // Teks tugas (Sesuaikan "item.title" dengan key yang kamu gunakan di form)
  const textSpan = document.createElement("span");
  textSpan.textContent = item.content || "Tugas Tanpa Judul";

  // Jika statusnya checked/completed, beri coretan
  if (item.isCompleted) {
    textSpan.style.textDecoration = "line-through";
    textSpan.style.opacity = "0.6";
  }

  // Tombol Check/Uncheck
  const checkBtn = document.createElement("button");
  checkBtn.textContent = item.isCompleted ? "Batal Check" : "Check";
  checkBtn.addEventListener("click", () => {
    item.isCompleted = !item.isCompleted; // Toggle status
    saveToLocalStorage(); // TAMBAHAN: Simpan perubahan ke Local Storage
    renderLists(); // Render ulang UI
  });

  // Tombol Hapus
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.addEventListener("click", () => {
    deleteItem(item.id);
  });

  div.append(textSpan, checkBtn, deleteBtn);
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
