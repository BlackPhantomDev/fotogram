
// every filename
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

// every title for the images
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

// global index variable is used for the preview
let globalIndex = 0;

// define elements
let gallery = document.getElementById("gallery"); // gallery section
let dialog = document.getElementById("image_preview"); // dialog element
let dialogSection = document.getElementById("dialog_section"); // dialog section

// event listeners closing click
dialogSection.addEventListener("click", () => closeDialog());
dialog.addEventListener('click', (e) => {
    if (e.target.closest('.inner-dialog')) e.stopPropagation();
});

// initialization in body onload
function init() {
  renderColumns();
  dialogSection.style.display = "none";
}

// generate columns
function renderColumns() {
    // zuerst alles löschen
    gallery.innerHTML = "";
    gallery.innerHTML += "<h1>Wilkommen in meiner Galerie!</h1>";

    for (let i = 0; i < imageSources.length; i++) {
      gallery.innerHTML += columnHtml(i);
    }
}

// the HTML for each column,
// index is passed to link the correct images and functions
function columnHtml(index) {

    let htmlText = `
    <button class="column"
        type="button"
        aria-label="Bild ${index} oeffnen"
        aria-haspopup="dialog"
        aria-controls="image_preview"
        onclick="openDialog(${index})">
      <img src="./assets/img/gallery/${imageSources[index]}" 
           alt="Ein Bild mit dem Titel: ${imageTitle[index]}">
    </button>
    `;
 

  return htmlText;
}

// function returns the innerHTML of the Dialog
// index is passed for the image with title and counter
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
            <span id="previous" class="dialog-btn" onclick="previous()" tabindex="1"><img src="./assets/img/arrow-left.svg"></span>
            <span aria-label="Bild ${globalIndex + 1} von 14">${globalIndex + 1} / 14</span>
            <span id="next" class="dialog-btn" onclick="next()" tabindex="1"><img src="./assets/img/arrow-right.svg"></span>
        </footer>

    </div>
    `;
}

function openDialog(index) {
  // change the global index to the passed index
  globalIndex = index;

  // clear first
  dialogSection.innerHTML = "";
  // set the innerHTML of the dialog 
  dialog.innerHTML = dialogHtml(index);
  // and show it
  dialog.showModal();

  // add new classes for backdrop 
  dialog.classList.add("opened");
  // and no scrolling
  body.classList.add("overflow-hidden");

  // set display style for the whole dialog section
  dialogSection.style.display = "block";
}

function closeDialog() {
  // set display back to none of the dialog section
  dialogSection.style.display = "none";

  // remove classes who setted by openDialog
  dialog.classList.remove("opened");
  body.classList.remove("overflow-hidden");
  
  // close the Dialog
  dialog.close();
}

// function to show the previous image
function previous() {

  // if we are at the first image, wrap around to the last one
  if (globalIndex <= 0) {
    globalIndex = imageSources.length - 1;
  } else {
    // otherwise just decrement the index
    globalIndex--;
  }
  
  // close the dialog, inject the new markup and reopen it
  dialog.close();
  dialog.innerHTML = dialogHtml(globalIndex);
  dialog.showModal();
  dialog.classList.add("opened");
}

// function to show the next image
function next() {

  // if we are at the last image, wrap around to the first one
  if (globalIndex >= imageSources.length - 1) {
    globalIndex = 0;
  } else {
    // otherwise just increment the index
    globalIndex++;
  }

  // close the dialog, inject the new markup and reopen it
  dialog.close();
  dialog.innerHTML = dialogHtml(globalIndex);
  dialog.showModal();
  dialog.classList.add("opened");
}