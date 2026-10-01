// MENGAMBIL ELEMEN HTML
const inputTugas = document.getElementById("inputTugas");

const tombolTambah = document.getElementById("tombolTambah");

const daftarTugas = document.getElementById("daftarTugas");

const totalTugas = document.getElementById("totalTugas");

const tugasSelesai = document.getElementById("tugasSelesai");

const tugasBelumSelesai =
    document.getElementById("tugasBelumSelesai");


// FUNGSI MEMPERBARUI STATISTIK

function perbaruiStatistik() {

    // Mengambil semua tugas
    const semuaTugas =
        daftarTugas.querySelectorAll(".tugas-item");

    // Mengambil tugas yang memiliki class completed
    const tugasYangSelesai =
        daftarTugas.querySelectorAll(
            ".tugas-item.completed"
        );

    // Menghitung jumlah
    const jumlahTotal = semuaTugas.length;

    const jumlahSelesai =
        tugasYangSelesai.length;

    const jumlahBelumSelesai =
        jumlahTotal - jumlahSelesai;


    // Menampilkan hasil
    totalTugas.textContent = jumlahTotal;

    tugasSelesai.textContent = jumlahSelesai;

    tugasBelumSelesai.textContent =
        jumlahBelumSelesai;
}

// PESAN JIKA TUGAS KOSONG

function periksaDaftarKosong() {

    if (daftarTugas.children.length === 0) {

        const pesan =
            document.createElement("li");

        pesan.className = "tugas-kosong";

        pesan.textContent =
            "Belum ada tugas. Tambahkan tugas pertamamu ✨";

        daftarTugas.appendChild(pesan);

    } else {

        const pesan =
            document.querySelector(".tugas-kosong");

        if (pesan) {
            pesan.remove();
        }
    }
}


// FUNGSI MENAMBAHKAN TUGAS

function tambahTugas() {

    // Mengambil isi input
    const teks =
        inputTugas.value.trim();


    // VALIDASI INPUT


    if (teks === "") {

        alert(
            "Silakan masukkan tugas terlebih dahulu!"
        );

        inputTugas.focus();

        return;
    }


    // Menghapus pesan "belum ada tugas"
    const pesanKosong =
        document.querySelector(".tugas-kosong");

    if (pesanKosong) {
        pesanKosong.remove();
    }


    // MEMBUAT TUGAS


    const tugas =
        document.createElement("li");

    tugas.className = "tugas-item";



    // MEMBUAT CHECKBOX

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
        "checkbox-tugas";

    // MEMBUAT TEKS

    const teksTugas =
        document.createElement("span");

    teksTugas.className =
        "teks-tugas";

    teksTugas.textContent = teks;


    // MEMBUAT TOMBOL HAPUS
  
    const tombolHapus =
        document.createElement("button");

    tombolHapus.className =
        "tombol-hapus";

    tombolHapus.textContent = "×";


    // CHECKBOX SELESAI
  
    checkbox.addEventListener(
        "change",
        function () {

            if (checkbox.checked) {

                // Menambahkan class completed
                tugas.classList.add(
                    "completed"
                );

            } else {

                // Menghapus class completed
                tugas.classList.remove(
                    "completed"
                );
            }

            // Memperbarui statistik
            perbaruiStatistik();
        }
    );

    // TOMBOL HAPUS

    tombolHapus.addEventListener(
        "click",
        function () {

            // Menghapus tugas
            tugas.remove();

            // Memperbarui statistik
            perbaruiStatistik();

            // Memeriksa apakah daftar kosong
            periksaDaftarKosong();
        }
    );

    // MEMASUKKAN ELEMEN

    tugas.appendChild(checkbox);
    tugas.appendChild(teksTugas);
    tugas.appendChild(tombolHapus);
    daftarTugas.appendChild(tugas);

    // MEMBERSIHKAN INPUT
   

    inputTugas.value = "";
    inputTugas.focus();

    // Memperbarui statistik
    perbaruiStatistik();
}


// ==============================
// TOMBOL TAMBAH
// ==============================

tombolTambah.addEventListener(
    "click",
    tambahTugas
);

// TOMBOL ENTER


inputTugas.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Enter") {
            tambahTugas();
        }
    }
);

// KONDISI AWAL

periksaDaftarKosong();
perbaruiStatistik();