function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(setWizzyCustomPlaceHolder);
function setWizzyCustomPlaceHolder() {
  // Wizzy Animated Placeholder function declare:-
  let desktop, mobile_1, mobile_2;
  if (document.documentElement.clientWidth >= 768) {
    desktop = document.querySelector(".wizzy-search-input");
  }
  if (document.documentElement.clientWidth <= 800) {
    mobile_2 = $(".wizzy-search-input")[1];
  }
  const phrases = ["Rakhi Gifts","Earrings", "Necklaces", "Bajubandh", "Bridal", "Bracelet"];
  let index = 0;
  let typingTimer;
  const typePhrase = function (placeholderText) {
    const phrase = phrases[index];
    const len = phrase.length;
    let i = 0;
    typingTimer = setInterval(function () {
      if (i === len) {
        clearInterval(typingTimer);
        setTimeout(function () {
          erasePhrase(placeholderText);
        }, 1000); // Wait for 1 second before erasing
      } else {
        const currentText = placeholderText.getAttribute("placeholder");
        placeholderText["placeholder"] = currentText + phrase.charAt(i);
        i++;
      }
    }, 100); // Change the speed of typing by changing this value
  };
  const erasePhrase = function (placeholderText) {
    const currentText = placeholderText.getAttribute("placeholder");
    const len = currentText.length;
    let i = len - 1;
    typingTimer = setInterval(function () {
      if (i === len - phrases[index].length - 1) {
        clearInterval(typingTimer);
        index++;
        if (index === phrases.length) {
          index = 0;
        }
        setTimeout(function () {
          typePhrase(placeholderText);
        }, 1000); // Wait for 1 second before typing the next phrase
      } else {
        const newText = currentText.slice(0, i);
        placeholderText.setAttribute("placeholder", newText);
        i--;
      }
    }, 50); // Change the speed of erasing by changing this value
  };
  if (document.documentElement.clientWidth <= 800) {
    if (mobile_2) {
      typePhrase(mobile_2);
    }
  } else {
    if (desktop) {
      typePhrase(desktop);
    }
  }
}
