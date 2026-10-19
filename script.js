
const recipientInput = document.getElementById("recipient");
const errorMessage = document.getElementById("errorMessage");

const home = document.getElementById("home");
const letterScreen = document.getElementById("letterScreen");
const letterStage = document.getElementById("letterStage");

const birthdayCard = document.getElementById("birthdayCard");
const cardName = document.getElementById("cardName");
const cardMessage = document.getElementById("cardMessage");
const cardActions = document.getElementById("cardActions");

const tapLabel = document.getElementById("tapLabel");
const floatingEffects = document.getElementById("floatingEffects");

const createBtn = document.getElementById("createBtn");
const backBtn = document.getElementById("backBtn");
const newBtn = document.getElementById("newBtn");
const copyBtn = document.getElementById("copyBtn");

let selectedDesign = "navy";
let recipientName = "";
let isOpened = false;

const designColors = {
  navy: {
    envelope: "#293950",
    flap: "#354965"
  },
  ivory: {
    envelope: "#cbbb9d",
    flap: "#e8ddc9"
  },
  wine: {
    envelope: "#713b49",
    flap: "#8d4b5b"
  }
};

// PILIH DESAIN SURAT
document.querySelectorAll(".design").forEach(button => {
  button.addEventListener("click", () => {
    selectedDesign = button.dataset.design;

    document.querySelectorAll(".design").forEach(item => {
      const active = item === button;

      item.classList.toggle("selected", active);
      item.setAttribute("aria-pressed", String(active));
    });

    errorMessage.textContent = "";
  });
});

// TEMPLATE UCAPAN
function generateBirthdayMessage(name) {
  return `Untuk ${name} yang istimewa,

Happy Birthday, Sayang! ♡

Hari ini, dunia terasa sedikit lebih indah karena hari ini adalah hari ketika seseorang seistimewa kamu dilahirkan. Semoga di usia yang ke 17 ini, kamu selalu menemukan kebahagiaan dalam hal-hal sederhana, keberanian untuk mengejar semua impian, dan ketenangan di setiap langkah yang kamu pilih.

Sayang, terima kasih sudah hadir sebagai dirimu sendiri, dengan segala keunikan, kebaikan,tingkah laku yang lucu walaupun kadang nyebelin dan hal-hal kecil yang membuatmu begitu berarti. Aku berharap kamu selalu dikelilingi oleh orang-orang yang menyayangimu dengan tulus, yang menghargai kehadiranmu, dan yang membuatmu merasa bahwa kamu tidak harus menjadi siapa-siapa selain dirimu sendiri untuk bisa dicintai.

Jika suatu saat langkahmu terasa berat dan dunia tidak berjalan sesuai harapan apa yang kamu mau, semoga kamu tetap punya alasan untuk bertahan dan tersenyum. Ingatlah bahwa tidak apa-apa untuk beristirahat, tidak apa-apa untuk merasa lelah, dan tidak apa-apa jika beberapa hal membutuhkan waktu lebih lama untuk menjadi indah. Kamu tetap berharga, bahkan di hari-hari ketika kamu merasa belum melakukan apa-apa.

Sayang, semoga tahun ini dipenuhi dengan kejutan-kejutan manis, doa-doa yang perlahan menjadi nyata, tawa yang datang tanpa alasan, serta kenangan indah bersama orang-orang yang kamu cintai dan kamu sayangi. Semoga segala hal baik yang selama ini kamu berikan kepada dunia kembali kepadamu dalam bentuk yang jauh lebih indah.
semoga kamu selalu sehat terus panjang umur selalu mendapatkan kebahagiaan dari orang orang terdekatmu terus semoga sikap kamu juga ga berubah selalu bertingkah lucu manja karena aku suka itu aku suka hal apapun yang di dalamnya ada kamu ,semoga kamu ditahun ini dijauhkan dari kesedihan ya
Happy Birthday sayang Love you.

Maafin aku ya kalau aku masih suka bikin kamu marah badmood sedih dan nangis tapi dibalik itu semua kan demi kebaikan kamu juga.

May your new chapter be filled with genuine happiness, peaceful days, beautiful surprises, and a love that makes your heart feel safe. You deserve all the little things that make life wonderful.

Once again, happy birthday, Ashya. May the world always give you reasons to smile, and may life be gentle with your heart, today and always. ♡ 

Maaf ya kalau kata katanya panjang terus maaf juga kalau tampilan suratnya kurang menarik ,tapi aku bikin ini karena pengen beda aja dari yang lain yang udah pernah ngasih ucapan selamat ualng tahun dari orang lain.

semoga kamu suka ya maaf kalau kurang romantis.`;
}

// MEMBUAT SURAT
function createLetter() {
  recipientName = recipientInput.value.trim();

  if (!recipientName) {
    errorMessage.textContent =
      "Nama penerima belum diisi. Silakan masukkan nama terlebih dahulu.";

    recipientInput.focus();
    return;
  }

  if (recipientName.length > 60) {
    errorMessage.textContent = "Nama maksimal 60 karakter.";
    return;
  }

  errorMessage.textContent = "";

  const colors = designColors[selectedDesign];

  letterStage.style.setProperty(
    "--envelope-color",
    colors.envelope
  );

  letterStage.style.setProperty(
    "--flap-color",
    colors.flap
  );

  cardName.textContent = recipientName;
  cardMessage.textContent = generateBirthdayMessage(recipientName);

  // Reset animasi dan kartu
  isOpened = false;

  letterStage.classList.remove("open");
  letterStage.setAttribute("aria-expanded", "false");

  birthdayCard.hidden = true;
  cardActions.hidden = true;

  tapLabel.hidden = false;
  tapLabel.textContent = "TAP TO OPEN ✦";

  // Tampilkan halaman surat
  home.hidden = true;
  letterScreen.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// MEMBUKA AMPLOP
function openLetter() {
  if (isOpened) return;

  isOpened = true;

  letterStage.classList.add("open");
  letterStage.setAttribute("aria-expanded", "true");

  tapLabel.textContent = "YOUR LETTER IS OPENING...";

  // Setelah animasi amplop, tampilkan kartu ucapan
  window.setTimeout(() => {
    birthdayCard.hidden = false;
    cardActions.hidden = false;
    tapLabel.hidden = true;

    createFloatingEffects();

    birthdayCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 850);
}

// KLIK AMPLOP ATAU TEKAN ENTER
letterStage.addEventListener("click", openLetter);

letterStage.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLetter();
  }
});

// KEMBALI KE HALAMAN UTAMA
function goBack() {
  letterScreen.hidden = true;
  home.hidden = false;

  isOpened = false;

  letterStage.classList.remove("open");
  letterStage.setAttribute("aria-expanded", "false");

  birthdayCard.hidden = true;
  cardActions.hidden = true;
  tapLabel.hidden = false;

  errorMessage.textContent = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// EFEK BINTANG DAN HATI
function createFloatingEffects() {
  floatingEffects.replaceChildren();

  const symbols = ["✦", "♡", "✧", "♥", "⋆"];
  const total = 22;

  for (let i = 0; i < total; i++) {
    const item = document.createElement("span");

    item.className = "floating-item";
    item.textContent = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDelay = `${Math.random() * 1.8}s`;
    item.style.animationDuration = `${2.8 + Math.random() * 2}s`;
    item.style.fontSize = `${12 + Math.random() * 14}px`;

    floatingEffects.appendChild(item);
  }

  // Bersihkan elemen dekorasi setelah animasi selesai
  window.setTimeout(() => {
    floatingEffects.replaceChildren();
  }, 6500);
}

// SALIN UCAPAN
async function copyMessage() {
  const fullMessage =
    `Happy Birthday, ${recipientName}!\n\n` +
    `${cardMessage.textContent}\n\n` +
    "With all my love. ♡";

  try {
    await navigator.clipboard.writeText(fullMessage);
    showCopyFeedback("Ucapan berhasil disalin!");
  } catch (error) {
    // Alternatif jika clipboard tidak tersedia
    const textarea = document.createElement("textarea");

    textarea.value = fullMessage;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();

    showCopyFeedback(
      copied
        ? "Ucapan berhasil disalin!"
        : "Gagal menyalin. Silakan salin teks secara manual."
    );
  }
}

// PESAN STATUS SALIN
function showCopyFeedback(message) {
  copyBtn.textContent = message;

  window.setTimeout(() => {
    copyBtn.textContent = "♡ Salin Ucapan";
  }, 2200);
}

// TOMBOL
createBtn.addEventListener("click", createLetter);
backBtn.addEventListener("click", goBack);
newBtn.addEventListener("click", goBack);
copyBtn.addEventListener("click", copyMessage);

// ENTER PADA INPUT UNTUK MEMBUAT SURAT
recipientInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    createLetter();
  }
});
