
// alle dateinamen
const imageSources = [
  "001.webp",
  "002.webp",
  "003.webp",
  "004.webp",
  "005.webp",
  "006.webp",
  "007.webp",
  "008.webp",
  "009.webp",
  "010.webp",
  "011.webp",
  "012.webp",
  "013.webp",
  "014.webp",
];

// alle titel der bilder
const imageTitle = [
  "Der Weg",
  "Der Fr&uuml;hling",
  "Der Fr&uuml;hling &shy;(2)",
  "Kirschbl&uuml;ten",
  "Sonnen&shy;untergang",
  "Schilthorn",
  "Ein Tropfen",
  "Marko Blatt",
  "Rotkehlchen",
  "Feuerwerk",
  "Wald&shy;h&uuml;tte",
  "Zytglogge",
  "Makro Rose",
  "Sonnen&shy;untergang (2)",
];

// globale index variable
let globalIndex = 0;

// elemente definieren
let gallery = document.getElementById("gallery");
let preview = document.getElementById("image_preview");
let dialog = document.getElementById("dialog_section");

// event listeners für das klicken zum schliessen
dialog.addEventListener("click", () => closeDialog());
preview.addEventListener('click', (e) => {
    if (e.target.closest('.inner-dialog')) e.stopPropagation();
});

// wird im body onload ausgeführt
function init() {
  renderColumns();
  dialog.style.display = "none";
}

// die columns generieren
function renderColumns() {
    // zuerst alles löschen
    gallery.innerHTML = "";

    for (let i = 0; i < imageSources.length; i++) {
    gallery.innerHTML += columnHtml(i);
    }
}

// das html um jeden column zu erzeugen, index wird übergeben 
// für die korrekten bilder und funktionen zu verknüpfen
function columnHtml(index) {
  let htmlText = `
    <div class="column" onclick="openDialog(${index})" aria-label="Bild ${index + 1} oeffnen" aria-haspopup="dialog" aria-controls="image_preview">
        <img src="./assets/img/gallery/${imageSources[index]}" alt="Ein Bild mit dem Titel: ${imageTitle[index]}">
    </div>
    `;

  return htmlText;
}

function dialogHtml(index) {
  return `
  <!-- Dialog for image preview -->
    <div class="inner-dialog">
        <header id="dialog_header">
            <h2 id="dialog_title">${imageTitle[index]}</h2>
            <a onclick="closeDialog()" role="button" aria-label="Dialog schliessen" href="#" class="close-button" >
                <span class="bar bar1"></span>
                <span class="bar bar2"></span>
            </a>
        </header>

        <section id="dialog_content">
            <img id="preview" src="./assets/img/gallery/${imageSources[index]}" alt="Ein Bild mit dem Titel: ${imageTitle[index]}" />
        </section>

        <footer id="dialog_navigation">
            <span id="previous" class="dialog-btn" onclick="previous()"><img src="./assets/img/arrow-left.svg"></span>
            <span aria-label="Bild ${globalIndex + 1} von 14">${globalIndex + 1} / 14</span>
            <span id="next" class="dialog-btn" onclick="next()"><img src="./assets/img/arrow-right.svg"></span>
        </footer>

    </div>
    `;
}

function openDialog(index) {
  globalIndex = index;

  preview.innerHTML = dialogHtml(index);
  preview.showModal();
  preview.classList.add("opened");
  body.classList.add("overflow-hidden");
  dialog.style.display = "block";
}

function closeDialog() {
  dialog.style.display = "none";
  preview.classList.remove("opened");
  body.classList.remove("overflow-hidden");
  preview.close();
}

function previous() {
  if (globalIndex <= 0) {
    globalIndex = imageSources.length - 1;
  } else {
    globalIndex--;
  }
  preview.close();
  preview.innerHTML = dialogHtml(globalIndex);
  preview.showModal();
  preview.classList.add("opened");
}

function next() {
  if (globalIndex >= imageSources.length - 1) {
    globalIndex = 0;
  } else {
    globalIndex++;
  }
  preview.close();
  preview.innerHTML = dialogHtml(globalIndex);
  preview.showModal();
  preview.classList.add("opened");
}
