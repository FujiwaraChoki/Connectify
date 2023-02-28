const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesList = document.getElementById("messages");
const usernameform = document.getElementById("username-form");
const usernameinput = document.getElementById("username");

const showUsernameForm = () => {
  usernameform.style.display = "block";
  messageForm.style.display = "none";
};

const showChat = () => {
  usernameform.style.display = "none";
  messageForm.style.display = "block";
  const justToTry = document.querySelector("#justToTry");
  justToTry.style.display = "none";
  // This should hide the username form but it doesn't
};

const getUsername = () => {
  return localStorage.getItem("username");
};

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message === "") {
    // Create bootstrap alert
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-danger");
    alert.innerHTML = "Please enter a message";
    messageForm.appendChild(alert);
    return;
  }
  socket.emit("chat message", message); // use "chat message" event name here
  messageInput.value = "";
});

socket.on("chat message", (message) => {
  const li = document.createElement("li");
  li.classList.add("message");
  li.innerHTML = `<b>${getUsername()}:</b> ${message}`;
  messagesList.appendChild(li);
});

const setRandomBackground = () => {
  const body = document.querySelector("body");

  // create an image element
  const img = new Image();

  // set its source to a random image URL
  img.src = `https://source.unsplash.com/random/?water,ocean,beach,sky,clouds,landscape,tree,forest,river,waterfall`;

  // apply a CSS blur filter to the body element
  body.style.backgroundImage = `url(${img.src})`;
  body.style.backgroundSize = "cover";
  body.style.backdropFilter = "blur(5px)";
};

usernameform.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameinput.value;
  localStorage.setItem("username", username);
  showChat();
});

const usernameDisplay = document.getElementById("username-display");
usernameDisplay.innerHTML = getUsername();

setRandomBackground();

if (getUsername()) {
  showChat();
} else {
  showUsernameForm();
}
