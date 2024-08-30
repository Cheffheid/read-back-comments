/* global readbacki18n */
window.readBackComments = {};

function initializeReadBackComments(app) {
  "use strict";

  app.els = {
    commentForm: null,
    readBackButton: null,
  };

  app.init = () => {
    if (!"speedSynthesis" in window) {
      return;
    }

    app.els.commentForm = document.forms["commentform"];

    if (!app.els.commentForm) {
      return;
    }

    app.createButton();
    app.addEventListeners();
    app.addButtonToCommentForm();
  };

  app.createButton = () => {
    app.els.readBackButton = document.createElement("button");
    app.els.readBackButton.className += "read-back-button";

    app.els.readBackButton.innerHTML = readbacki18n.button_text;
    app.els.readBackButton.setAttribute("type", "button");
  };

  app.addEventListeners = () => {
    app.els.readBackButton.onclick = function () {
      const commentText = app.els.commentForm.querySelector("textarea#comment");
      let commentMessage = new SpeechSynthesisUtterance(
        readbacki18n.no_comment
      );

      if (commentText && commentText.value !== "") {
        commentMessage = new SpeechSynthesisUtterance(commentText.value);
      }

      window.speechSynthesis.speak(commentMessage);
    };
  };

  app.addButtonToCommentForm = () => {
    app.els.commentForm.insertBefore(
      app.els.readBackButton,
      app.els.commentForm.querySelector(".form-submit")
    );
  };

  app.init();
}

document.addEventListener("DOMContentLoaded", () => {
  initializeReadBackComments(window.readBackComments);
});
