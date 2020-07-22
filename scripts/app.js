const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const buttons = document.querySelector(".chat-rooms");
const goTop = document.querySelector(".goTop");
const goPresent = document.querySelector(".goPresent");

// Initial stuff
const username = localStorage.username ? localStorage.username : "anonymous";
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);
chatroom.getChats((data) => chatUI.render(data));

// Update Name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMsg.innerText = `You changed your name to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

// Update Chatroom
buttons.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    let room = e.target.getAttribute("id");
    chatroom.updateRoom(room);
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// Add message
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message);
  newChatForm.reset();
});

goTop.addEventListener("click", () => {
  scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
goPresent.addEventListener("click", () => {
  scrollTo({ top: 1000000, left: 0, behavior: "smooth" });
});
