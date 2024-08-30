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
    app.createVoiceList();
    app.addButtonToDOM();
  };

  app.createButton = () => {
    app.els.readBackButton = document.createElement("button");
    app.els.readBackButton.className += "read-back-button";

    app.els.readBackButton.innerHTML = readbacki18n.button_text;
    app.els.readBackButton.setAttribute("type", "button");
  };

  app.getVoiceList = () => {
    return new Promise(function (resolve, reject) {
      let synth = window.speechSynthesis;
      let id;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    });
  };

  app.createVoiceList = () => {
    app.getVoiceList().then((voices) => {
      app.availableVoices = voices;
      app.els.voiceSelect = document.createElement("select");
      for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        option.value = i;
        app.els.voiceSelect.appendChild(option);
      }
      app.els.commentForm.insertBefore(
        app.els.voiceSelect,
        app.els.commentForm.querySelector(".read-back-button")
      );
    });
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

      commentMessage.voice = app.availableVoices[app.els.voiceSelect.value];

      window.speechSynthesis.speak(commentMessage);
    };
  };

  app.addButtonToDOM = () => {
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
