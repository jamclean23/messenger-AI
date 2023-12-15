/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for index page

// ====== IMPORTS ======



// ====== FUNCTIONS ======

function main() {
  if (performance.getEntries()[0].type === "back_forward") {
    location.reload();
  }
  addEventsListeners();
}
function addEventsListeners() {
  addNewChatBtnListener();
  addChatLinkListeners();
}
function addChatLinkListeners() {
  const chatLinks = document.querySelectorAll('.chat.active');
  chatLinks.forEach(chatLink => {
    chatLink.addEventListener('click', chatLinkClickHandler);
  });
}
function chatLinkClickHandler(event) {
  window.location.href = `/chat/${event.target.getAttribute('data-room-id')}`;
}
function addNewChatBtnListener() {
  const newChatBtn = document.querySelector('.newChatBtn');
  newChatBtn.addEventListener('click', newChatButtonListener);
  function newChatButtonListener() {
    window.location.href = '/chat/start_chat';
  }
}

// ====== MAIN ======

main();
/******/ })()
;
//# sourceMappingURL=index.js.map