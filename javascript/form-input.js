export class FormHandler {
  constructor(onSubmitCallback) {
    this.showButtons = document.querySelectorAll(".show-form");
    this.hiddenButton = document.getElementById("form-close");
    this.formContainer = document.querySelector(".container-form");
    this.formSubmit = document.getElementById("todoForm");
    this.taskInput = document.getElementById("taskInput");
    this.dateInput = document.getElementById("date-list");

    this.onSubmitCallback = onSubmitCallback;

    // Properti baru untuk melacak tombol index mana yang sedang aktif
    this.activeCategoryIndex = null;

    this.initEventListeners();
  }

  initEventListeners() {
    // Simpan index saat tombol diklik
    this.showButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.formContainer.style.display = "flex";
        this.activeCategoryIndex = index; // <--- Simpan index ke state class
      });
    });

    this.hiddenButton.addEventListener("click", () => {
      this.formContainer.style.display = "none";
      this.activeCategoryIndex = null; // Reset saat form ditutup
    });

    this.formSubmit.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const taskValue = this.taskInput.value.trim();
    let dateValue = this.dateInput.value;

    if (!taskValue) {
      alert("Catatan jangan kosong!");
      return;
    }

    if (!dateValue) {
      dateValue = "No deadline";
    }

    console.log(dateValue);

    // Masukkan index kategori ke dalam objek data yang akan dikirim
    const dataList = {
      id: Math.random().toString(36).slice(2, 9), // Praktik baik: berikan ID unik untuk kemudahan hapus/edit nanti
      content: taskValue,
      date: dateValue,
      categoryId: this.activeCategoryIndex, // <--- Bawa data index ke main.js
    };

    if (this.onSubmitCallback) {
      this.onSubmitCallback(dataList);
    }

    this.formSubmit.reset();
    this.formContainer.style.display = "none";
    this.activeCategoryIndex = null; // Reset setelah submit
  }
}
