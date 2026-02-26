import { displayLists } from "./module.mjs";

const containerList = document.querySelector(".container-list");
const form = document.getElementById("form");
const inputList = document.getElementById("input-list");
const btnAdd = document.getElementById("btn-add");
const btnCategory = document.getElementById("new-category");
const tes = document.querySelector(".ahaojsoa");

tes.addEventListener("dblclick", function (event) {
  alert("Tombol diklik dua kali!");
  console.log("Detail event:", event);
});

btnCategory.addEventListener("click", () => {
  const category = prompt("masukan nama kategori");
});

btnCategory.addEventListener("dblclick", () => {
  console.log("Elemen di-double click!");
});

btnAdd.addEventListener("click", (event) => {
  event.preventDefault();

  const inputValue = inputList.value.trim();

  if (!inputValue) {
    alert("catatan tidak boleh kosong");
    return;
  }

  let dataBases = JSON.parse(localStorage.getItem("lists")) || [];

  const listUnion = dataBases.some(
    (content) => content.toLowerCase() === inputValue.toLowerCase(),
  );

  if (listUnion) {
    alert("catatan tersebut sudah ada");
    form.reset();
    return;
  }

  dataBases.push(inputValue);

  localStorage.setItem("lists", JSON.stringify(dataBases));

  displayLists(dataBases);

  form.reset();
});

displayLists(JSON.parse(localStorage.getItem("lists")) || []);
