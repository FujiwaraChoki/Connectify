const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messagesList = document.getElementById("messages");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit("message", message);
  messageInput.value = "";
});

socket.on("message", (message) => {
  const messageElement = document.createElement("li");
  messageElement.textContent = message;
  messagesList.appendChild(messageElement);
});
