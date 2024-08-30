(function readBackComments() {
  "use strict";

  if (!"speedSynthesis" in window) {
    return;
  }

  var commentForm = document.forms["commentform"];

  if (!commentForm) {
    return;
  }

  var readBackParagraph = document.createElement("p");
  var readBackButton = document.createElement("button");
  var submitWrap = commentForm.getElementsByClassName("form-submit");

  readBackParagraph.className += "read-back-button";

  readBackButton.innerHTML = "Read back comment";
  readBackButton.onclick = function (e) {
    e.preventDefault();

    var commentText = commentForm.querySelector("textarea#comment");
    var commentMessage = new SpeechSynthesisUtterance(
      "You did not type in a comment."
    );

    if (commentText && commentText.value !== "") {
      var commentMessage = new SpeechSynthesisUtterance(commentText.value);
    }

    window.speechSynthesis.speak(commentMessage);
  };

  readBackParagraph.appendChild(readBackButton);

  commentForm.insertBefore(readBackParagraph, submitWrap[0]);
})();
