let allList = [];
let workList = [];
let studyList = [];
let gamingList = [];
let foodList = [];

import { containerContent } from "./nav.js";
import { FormHandler } from "./form-input.js";

const receiveDataFromForm = (dataList) => {
  // Selalu simpan semua catatan ke dalam allList
  allList.push(dataList);

  // Cek categoryId (index tombol) dan distribusikan
  switch (dataList.categoryId) {
    case 0:
      console.log("Kategori Umum (All), tidak masuk array spesifik.");
      break;
    case 1:
      workList.push(dataList);
      console.log("Berhasil masuk ke Work:", workList);
      break;
    case 2: // Perbaikan: Study sekarang di index 2
      studyList.push(dataList);
      console.log("Berhasil masuk ke Study:", studyList);
      break;
    case 3: // Tambahan: Gaming di index 3
      gamingList.push(dataList);
      console.log("Berhasil masuk ke Gaming:", gamingList);
      break;
    case 4:
      foodList.push(dataList);
      console.log("Berhasil masuk ke Food:", foodList);
      break;
    default:
      console.log(`Index ${dataList.categoryId} tidak dikenali.`);
      break;
  }

  console.log("Total semua catatan (allList):", allList);
};

const todoFormApp = new FormHandler(receiveDataFromForm);
