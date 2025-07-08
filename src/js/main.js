let btnYes = document.getElementById("btn-yes");
let btnNo = document.getElementById("btn-no");
let buttons = document.getElementById("buttons");

let settingsContainer = document.getElementById("settings-container");
let mainContainer = document.getElementById("container");
let oldMainContainer = mainContainer.innerHTML;

let typeFunction = {
    "grow": growBtnYes,
    "shrink": shrinkBtnNo,
    "grow-shrink": () => {shrinkBtnNo(); growBtnYes();},
    "move": moveBtnNo
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("type-action", "grow");
});

btnNo.addEventListener("click", () => {
    let typeAction = localStorage.getItem("type-action");

    typeFunction[typeAction]();
});

btnYes.addEventListener("click", () => {
    location.replace("/pages/happy.html");
});

// Function to re attach the event listeners
function reattachEventListeners() {
  btnYes = document.getElementById("btn-yes");
  btnNo = document.getElementById("btn-no");

  btnNo.addEventListener("click", () => {
    let typeAction = localStorage.getItem("type-action");
    typeFunction[typeAction]();
  });

  btnYes.addEventListener("click", () => {
    location.replace("/pages/happy.html");
  });
};

// Type action functions
function growBtnYes() {
    btnYes = document.getElementById("btn-yes");

    let stylesBtnYes = getComputedStyle(btnYes);

    btnYes.style.fontSize = (parseFloat(stylesBtnYes.fontSize) * 1.2) + "px";
    btnYes.style.width = (parseFloat(stylesBtnYes.width) * 1.2) + "px";
    btnYes.style.height = (parseFloat(stylesBtnYes.height) * 1.2) + "px";

    buttons = document.getElementById("buttons");

    let stylesButtons = getComputedStyle(buttons);
    let stylesBtnNo = getComputedStyle(btnNo);

    if(parseFloat(stylesBtnYes.width) * 1.2 > parseFloat(stylesButtons.width) - parseFloat(stylesBtnNo.width)) {
        buttons.style.width = (parseFloat(stylesBtnYes.width) * 1.1 + parseFloat(stylesBtnNo.width)) + "px";
    };
};

function shrinkBtnNo() {
    btnNo = document.getElementById("btn-no");
    let stylesBtnNo = getComputedStyle(btnNo);

    btnNo.style.fontSize = (parseFloat(stylesBtnNo.fontSize)/1.2) + "px";
    btnNo.style.width = (parseFloat(stylesBtnNo.width)/1.2) + "px";
    btnNo.style.height = (parseFloat(stylesBtnNo.height)/1.2) + "px";
};

function moveBtnNo() {
    let randomX, randomY;

    btnNo = document.getElementById("btn-no");

    if(btnNo.style.position != "absolute") {
        document.getElementById("buttons").removeChild(btnNo);
        document.body.appendChild(btnNo);
    }

    btnNo.style.position = "absolute";

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    randomX = getRandomRange(0, windowWidth - btnNo.offsetWidth);
    randomY = getRandomRange(0, windowHeight - btnNo.offsetHeight);

    btnNo.style.left = randomX + "px";
    btnNo.style.top = randomY + "px";
};

function getRandomRange(min, max) {
    return Math.random() * (max - min);
}

// Setting's div
let settingsDiv = document.getElementById("settings");

settingsDiv.addEventListener("click", () => {
    document.getElementById("btn-no").remove();
    
    settingsContainer.style.display = "block";
    mainContainer.style.display = "none";

    let radiosInput = document.querySelectorAll("form input[type='radio']");
    let typeAction = localStorage.getItem("type-action");

    radiosInput.forEach((radio) => {
        if(radio.checked) radio.checked = false;

        if(typeAction == radio.value) {
            radio.checked = true;
        };
    });
});

// Settings's form
let settingsForm = document.getElementById("settings-form");

settingsForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    let data = Object.fromEntries(formData);

    localStorage.setItem("type-action", data["type-action"]);

    mainContainer.innerHTML = oldMainContainer
    reattachEventListeners();

    settingsContainer.style.display = "none";
    mainContainer.style.display = "block";
});