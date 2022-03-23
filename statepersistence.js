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
    document.body.style.backgroundColor = cookie;
  } else {
    let ans = prompt(
      `The cookie named ${name} doesn't exist. Do you want to create it?`
    );
    // if the 1st lettre is "y" in the response, create a new cookie backcolor
    ans = ans.trim().toLowerCase()[0];
    if (ans == "y") {
      let value = prompt(`please enter the value for the cookie ${name}`);
      if (value) {
        document.cookie = `${name}=${value}`;
      }
    }
  }
}

/**
 * This function is the same function as in retrievecookie.js file. 
 * It will retrieve and return the named cookie, if found.
 * Otherwise, it will return null.
 * */
function getCookie(name) {
  let nameEquals = name + "=";
  let cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim(); //remove any padding leading and trailing spaces
    if (cookie.indexOf(nameEquals) == 0) {
      return unescape(cookie.substring(nameEquals.length, cookie.length));
    }
  } //end of for loop
  return null;
}
