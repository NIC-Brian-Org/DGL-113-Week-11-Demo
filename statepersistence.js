"use strict";
/**
 * when the page is loaded, check if backcolor cookie exists.
 * If yes, it will use the color to set the page's backgound-color. 
 * Otherwise, it will ask for the color for the backcolor cookie
 * and set the page's background color accordingly.
 */
window.addEventListener("load", statepersistence);
function statepersistence() {
  let name = "backcolor";
  let cookie = getCookie(name);
  if (cookie) {
    document.body.style.backgroundColor = decodeURIComponent(cookie);
  } else {
    let ans = prompt(
      `The cookie named ${name} doesn't exist. Do you want to create it?`
    );
    // if the 1st lettre is "y" in the response, create a new cookie backcolor
    ans = ans.trim().toLowerCase()[0];
    if (ans == "y") {
      let value = encodeURIComponent(prompt(`please enter the value for the cookie ${name}`));
      if (value) {
        document.body.style.backgroundColor = value;
        createCookie( name, value );
      }
    }
  }
}

